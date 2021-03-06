import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SupplierData } from './sales';
import {Observable} from "rxjs";
import { SupplierOrderData } from './sales';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  formData: SupplierData;
  


  List: SupplierData[];
  
  
  constructor(private http: HttpClient) { }

  //url = "https://localhost:44380/api/"
  url = 'https://expertechs.azurewebsites.net/api/';


  getSupplierList(): Observable<SupplierData[]>
  {
    return this.http.get<SupplierData[]>(this.url + "Supplier/GetSupplierList")
  }

  getSupplierOrderList(): Observable<SupplierOrderData[]>
  {
    return this.http.get<SupplierOrderData[]>(this.url + "Supplier/GetSupplierOrderList")
  }

  DeleteSupplier(SupplierID, SessionID) {
    
    const params = new HttpParams().set("SupplierID", SupplierID).set("SessionID", SessionID)
    return this.http.delete(this.url + 'Supplier/DeleteSupplier', 
    {headers: { 'Content-Type': 'application/json'},
    params: params})
  }

  DeleteSupplierOrder(OrderID: any, SessionID) {
    const params = new HttpParams().set("OrderID", OrderID).set("SessionID", SessionID)
    return this.http.delete(this.url + 'Supplier/DeleteSupplierOrder', 
    {headers: { 'Content-Type': 'application/json'},
    params: params})
  }

  CreateOrder(formData: SupplierOrderData, SessionID)
  {  
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + 'Supplier/AddSupplierOrder',formData, {params})
  }

  AddSupplier(formData: SupplierData, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + "Supplier/AddSupplier", formData, {params});
  }

  ReceiveStock(StockItemLines, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + "Supplier/ReceiveStock", StockItemLines , {params})
  }

  EditSupplier(formData: SupplierData, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID )
    return this.http.put(this.url + "Supplier/UpdateSupplier", formData, {params});
  }

  RegenerateOrder(formData: SupplierOrderData, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID);
    return this.http.post(this.url + "Supplier/RegenerateOrder", formData, {params})
  }
}
