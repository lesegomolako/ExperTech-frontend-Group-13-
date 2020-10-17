import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { StockService } from '../../../../API Services/for Supplier/stock.service';
import { StockData } from '../../../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SupplierService } from '../../../../API Services/for Supplier/supplier.service';
import { Observable } from 'rxjs';
import { SupplierData } from '../../../../API Services/for Supplier/sales';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class orderform implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockData>;


  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['select','id', 'name', 'description' , 'price' , 'quantity'];
  // dialog: any;
  // searchKey: string;
  // StockData: any;

  constructor(
    public service: StockService, 
    private formBuilder: FormBuilder,
    private suppService: SupplierService,
    private http: HttpClient,
    private router: Router , private snack: MatSnackBar,
    private api:ExperTexhService ){}

  
  //dataSource = new MatTableDataSource(this.StockList)
  orderForm: FormGroup;
  Supp: SupplierData;

  StockList: StockData[];
  SupplierList : Observable<SupplierData[]>;
  Total = 0;
  Price = 0;

  countTotal(value)
  {
    let g = (<FormArray>this.orderForm.get('stockitemlines'))
    this.Total = 0;
  
    for(var j =0; j<g.length; j++)
    {
      let q = g.at(j)
      this.Total += (q.value.quantity )
    }
  }

  setPrice(price)
  {
    this.Price = price;
  }

  ngOnInit(): void 
  {
    if(this.api.RoleID == "2")
    {
      this.Supp = JSON.parse(localStorage.getItem('supplier'))
      
      this.service.getStockList().subscribe(res => 
        {   
          this.StockList = res
        })



        this.SupplierList = this.suppService.getSupplierList();
        
        this.orderForm = this.formBuilder.group({
          supplierid: ['', Validators.required],
          //description: ['', Validators.required],
        // price: [''],
          stockitemlines: this.formBuilder.array(
            [
              this.AddStockItems()
            ]
          )
        })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
     
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator= this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }

  AddForm()
  {
    (<FormArray>this.orderForm.get('stockitemlines')).push(this.AddStockItems());
  }

  DeleteForm(ItemID: any): void
  {
    (<FormArray>this.orderForm.get('stockitemlines')).removeAt(ItemID);
  }

  
  AddStockItems(): FormGroup
    {
      return this.formBuilder.group({
        quantity: ['', [Validators.required, Validators.min(0)]],
        itemid: ['', Validators.required]
      })
    }

   
AddOrder(form)
{
  if(this.orderForm.invalid)
  {
    alert("Enter all details")
    return;
  }
  
  this.suppService.CreateOrder(form.value, this.api.SessionID).subscribe(ref => 
  {
    if(ref == "success")
      {
        this.snack.open("Order successfuly made", "OK", {duration:3000})
        this.router.navigateByUrl("placeorder")
      }
  });    
}

}
