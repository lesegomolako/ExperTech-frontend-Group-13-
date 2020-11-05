import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuditTrail } from 'src/app/API Services/for Booking/client';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';


@Component({
  selector: 'app-client-audit',
  templateUrl: './client-audit.component.html',
  styleUrls: ['./client-audit.component.css']
})
export class ClientAuditComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatTable) table: MatTable<AuditTrail>;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['auditid', 'client', 'olddata', 'newdata', 'tablesaffected', 'transactiontype', 'date'];
  
  searchKey: string;
  SaleData: any;

  constructor(private router: Router, private api: ExperTexhService) { }

  AuditList: AuditTrail[];
  dataSource;

  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.dataSource = new MatTableDataSource(this.AuditList)
      this.api.getClientAudit().subscribe(res => {
        console.log(res)
        this.AuditList = res;
        this.dataSource.data = this.AuditList;
        
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }



  }

  ngAfterViewInit() {
    //this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
