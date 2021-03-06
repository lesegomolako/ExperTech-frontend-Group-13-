import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StockCategory, StockData } from '../../../API Services/for Supplier/sales';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ReportingService } from '../../API Services/for User/reporting.service';
//import {Process} from '../../API Services/for User/process';



@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  constructor(private service: StockService, private route: Router, private snack:MatSnackBar,
     private formBuilder: FormBuilder, private api: ExperTexhService) { }
  StockForm: FormGroup;
  stocks: StockData;
  //StockData= this.service.stocksData;

  
  Categories: StockCategory[];

  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.service.getStockCategory(this.api.SessionID).subscribe(res => {
        this.Categories = res;
      })
      this.StockForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', Validators.maxLength(150)],
        price: ['', [Validators.required, Validators.min(0)]],
        quantity: [0],
        categoryid: ['', Validators.required],
        size :['', [Validators.required, Validators.min(0)]],
        color: [null, Validators.maxLength(50)]
      })
      
    }
    else
    {
      this.route.navigate(["403Forbidden"])
    }
    
  }

  get f()
  {
    return this.StockForm.controls;
  }

  // onSubmit()
  // {
  //   console.log(this.StockData)
  //   this.StockData.Description = this.StockForm.value.description;
  //   this.StockData.Name = this.StockForm.value.name;
  //   this.StockData.Price = this.StockForm.value.price;
  //   this.StockData.QuantityInStock = this.StockForm.value.quantity;

  //   this.service.AddStockItems(this.StockData).subscribe(res =>{
  //     if (res == "success")
  //     {
  //       alert("boo")
  //     }
  //   })

  AddStock(stock)
  {
    if(this.StockForm.invalid)
    {
      alert("Fill in all the required fields");
      this.StockForm.markAllAsTouched();
      return;
    }
    this.service.AddStockItem(stock.value, this.api.SessionID)
    .subscribe(res => {
      if (res == "success")
      {
        this.snack.open("Successfully added stock item", "OK", {duration:3000})
        this.route.navigateByUrl("/stock")
      }
      else if(res == "duplicate")
      {
        alert("Stock item already exists")
        this.route.navigate(["stock"])
      }
      else
      {
        console.log(res)
      }
    }, error => {console.log(error); this})

  }

}
