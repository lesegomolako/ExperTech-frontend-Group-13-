import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './Service/services/services.component';
import { ServiceTypeComponent } from './Service/service-type/service-type.component';
import { TServicesComponent } from './Service/tservices/tservices.component';
import { ServiceOptionsComponent } from './Service/service-options/service-options.component';
import { ServicePackagesComponent } from './Service/service-packages/service-packages.component';
import { EditSTComponent } from './Service/edit-st/edit-st.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { EditServiceComponent } from './Service/edit-service/edit-service.component';
import { EditSOComponent } from './Service/edit-so/edit-so.component';
import { EditSPComponent } from './Service/edit-sp/edit-sp.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductComponent } from './Product/product/product.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { DeleteServiceTypeComponent } from './Service/delete-service-type/delete-service-type.component';
import { DeleteSOComponent } from './Service/delete-so/delete-so.component';
import { DeleteServiceComponent } from './Service/delete-service/delete-service.component';
import { LoginComponent } from './User/login/login.component';
import { ForgotComponent } from './User/forgot/forgot.component';
import { AdminRegisterComponent } from './Staff/admin-register/admin-register.component';
import { EmployeeRegisterComponent } from './Staff/employee-register/employee-register.component';
import { SetupComponent } from './Staff/setup/setup.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { AdminComponent } from './User/admin/admin.component';
import { AvailableComponent } from './User/available/available.component';
import { ClientComponent } from './User/client/client.component';

import { EmployeeComponent } from './Staff/employee/employee.component';
import { EmployeeSTComponent } from './User/employee-st/employee-st.component';
import { PaymentComponent } from './User/payment/payment.component';
import { PickupComponent } from './User/pickup/pickup.component';

import { SpackageComponent } from './User/spackage/spackage.component';
import { SalesReportComponent } from './Reporting/sales-report/sales-report.component';
import { ValidateComponent } from './components/TextBoxValidator/validate/validate.component';
import { EditComponent } from './Client/edit/edit.component';
import { BrowseComponent } from './product/browse/browse.component';
import { RequestbComponent } from './Booking/requestb/requestb.component';
import { BasketComponent } from './Client/basket/basket.component';
import { MakebookingComponent } from './Booking/makebooking/makebooking.component';
import { ViewbookingComponent } from './Client/viewbooking/viewbooking.component';
import { ServicepComponent } from './Client/servicep/servicep.component';
import { BookingConfirmComponent } from './Booking/confirm/confirm.component';
import { ClientprofileComponent } from './Client/clientprofile/clientprofile.component';
import { BellComponent } from './Client/bell/bell.component';
import { FinancialReportComponent } from './Reporting/financial-report/financial-report.component';
import { AllBookingsComponent} from './Reporting/all-bookings/all-bookings.component'
import { BookingReportComponent } from './Reporting/booking-report/booking-report.component';
import { SupplierReportComponent } from './Reporting/supplier-report/supplier-report.component';
import { ViewdetailComponent } from './Supplier/sale/viewdetail/viewdetail.component';
import { SaleComponent } from './Supplier/sale/sale.component';
import { AddstockComponent } from './Supplier/stock/addstock/addstock.component';
import { EditstockComponent } from './Supplier/stock/editstock/editstock.component';
import { StocktakeComponent } from './Supplier/stock/stocktake/stocktake.component';
import { WriteoffComponent } from './Supplier/stock/writeoff/writeoff.component';
import { StockComponent } from './Supplier/stock/stock.component';
import { AddsupplierComponent } from './Supplier/supplier/addsupplier/addsupplier.component';
import { orderform } from './Supplier/supplier/placeorder/orderform/orderform.component';
import { EditsupplierComponent } from './Supplier/supplier/editsupplier/editsupplier.component';
import { PlaceorderComponent } from './Supplier/supplier/placeorder/placeorder.component';
import { SupplierComponent } from './Supplier/supplier/supplier.component';
import { ViewServicesComponent } from './Service/view-services/view-services.component';
import { ScheduleComponent } from './Booking/schedule/schedule.component';
import { AdviseComponent } from './Booking/advise/advise.component';
import { EmployeehomeComponent } from './User/employeehome/employeehome.component';
import { ReportsComponent } from './User/reports/reports.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { GetBookingsComponent } from './Staff/get-bookings/get-bookings.component';
import {ChangePasswordComponent} from './User/change-password/change-password.component'

import { StaffComponent } from './Staff/staff/staff.component';
import { SaleinvoiceComponent } from './Supplier/sale/saleinvoice/saleinvoice.component';
import { SalePaymentComponent } from './User/sale-payment/sale-payment.component';
import { CompanySettingsComponent } from './User/company-settings/company-settings.component';
import { AdminAuditComponent } from './AuditTrails/admin-audit/admin-audit.component';
import { ClientAuditComponent } from './AuditTrails/client-audit/client-audit.component';
import { EmployeeAuditComponent } from './AuditTrails/employee-audit/employee-audit.component';
import { AuditTrailComponent } from './AuditTrails/audit-trail/audit-trail.component';

import { StockCategoryComponent } from './Supplier/stock-category/stock-category.component';
//import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [

  {path: '', redirectTo: '/home',pathMatch: 'full'},
  {path: "advise", component: AdviseComponent},

  {path:'audits', component: AuditTrailComponent,
   children: [
      {path:'', redirectTo: 'AdminAudit',pathMatch: 'full' },
      {path:'AdminAudit', component: AdminAuditComponent},
      {path:'ClientAudit', component: ClientAuditComponent},
      {path:'EmployeeAudit', component: EmployeeAuditComponent}]
   },

  {path:'services', component: ServicesComponent,
   children: [
      {path:'', redirectTo: 'ServiceTypes',pathMatch: 'full' },
      {path:'ServiceTypes', component: ServiceTypeComponent},
      {path:'Services', component: TServicesComponent},
      {path:'ServiceOptions', component: ServiceOptionsComponent},
      {path:'ServicePackages', component: ServicePackagesComponent},
      {path:'EditServiceType', component: EditSTComponent},
      {path:'EditService', component: EditServiceComponent},
      {path:'EditServiceOption', component: EditSOComponent},
      {path:'CreateServicePackage', component: EditSPComponent},
      {path:'DeleteServiceType', component: DeleteServiceTypeComponent},
      {path:'DeleteServiceOption', component: DeleteSOComponent},
      {path:'DeleteService', component: DeleteServiceComponent},  
   ]
  },
  {path:'home', component: ClientMenuComponent},
  {path:'EditProduct', component: EditProductComponent},
  {path:'AdminProduct', component: ProductComponent},
  {path:'DeleteProduct', component: DeleteProductComponent},
  {path:'login', component: LoginComponent},
  {path:'forgot', component: ForgotComponent},
  {path:'reset', component: ResetPasswordComponent},
  {path:'adminregister', component: AdminRegisterComponent},
  {path:'employeeregister', component: EmployeeRegisterComponent},
  {path:'setup', component: SetupComponent},
  {path:'admin', component: AdminComponent},
  {path:'available', component: AvailableComponent},
  {path:'client', component: ClientComponent},
  
  {path:'employee', component: EmployeeComponent},
  {path:'employeeST', component: EmployeeSTComponent},
  {path:'payment', component: PaymentComponent},
  {path:'pickup', component: PickupComponent},

  {path: 'spackage', component: SpackageComponent},
  {path: 'ViewServices', component: ViewServicesComponent},
  {path: 'salereport', component: SalesReportComponent},
  {path: 'financialreport', component: FinancialReportComponent},
  {path: 'allbookingsreport', component: AllBookingsComponent},
  {path: 'bookingreport', component: BookingReportComponent},
  {path: 'supplierreport', component: SupplierReportComponent},
  {path: 'saleinvoice', component: SaleinvoiceComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'viewdetail', component: ViewdetailComponent},
  {path: 'addstock', component: AddstockComponent},
  {path: 'editstock', component: EditstockComponent},
  {path: 'stocktake', component: StocktakeComponent},
  {path: 'writeoff', component: WriteoffComponent},
  {path: 'stock', component: StockComponent},
  {path: 'addsupplier', component: AddsupplierComponent},
  {path: 'editsupplier', component: EditsupplierComponent},
  {path: 'orderform', component: orderform},
  {path: 'placeorder', component: PlaceorderComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'employeehome', component: EmployeehomeComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'clientregister', component: ValidateComponent},
  {path: 'edit', component: EditComponent },
  {path: 'browse', component: BrowseComponent },
  {path: 'request', component: RequestbComponent },
  {path: 'basket', component: BasketComponent },
  {path: 'Booking', component: MakebookingComponent },
  {path: 'ViewBooking', component: ViewbookingComponent },
  {path: 'ServicePackage', component: ServicepComponent },
  {path: 'confirmbooking', component: BookingConfirmComponent }, 
  {path: 'Profile', component: ClientprofileComponent },
  {path: 'Notification', component: BellComponent },
  {path: 'reports', component: ReportsComponent},
  {path: '403Forbidden', component: ForbiddenPageComponent},
  {path: 'getbookings', component: GetBookingsComponent},
  {path: 'staff', component: StaffComponent },
  {path: 'changepassword', component: ChangePasswordComponent},
  {path: 'salepayment', component: SalePaymentComponent},
  {path: 'settings', component: CompanySettingsComponent},
  {path: 'stockcategory', component: StockCategoryComponent},
  
  {path: '**', redirectTo: '/404Page'},
  {path: '404Page', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
