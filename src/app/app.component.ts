import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import { Observable } from 'rxjs';
import { Employee, User, Booking} from './API Services/for Booking/client';
import {map} from 'rxjs/operators';
import { ExperTexhService } from './API Services/for Booking/exper-texh.service';
import { ReportingService } from './API Services/for User/reporting.service';
import { UserData } from './Staff/setup/setup.component';
import { HttpClient } from '@angular/common/http';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SocialMedia } from './User/company-settings/company-settings.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ProfileData<MetaType=any>
{
  Name: string;
  Surname: string;
  Email:string;
  ContactNo?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Screens';
  showBadges = true;
  RoleID = null;
  User: Observable<ProfileData<User>>
  
  toggleSidebar()
  {
    document.getElementById("sidebar").classList.toggle('active');
  }

  constructor(private router: Router, private http: HttpClient, private snack: MatSnackBar,
    private rService: ReportingService, public api: ExperTexhService)
    { 
      router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })}

  
   bookingList: Booking[];
  ngOnInit()
  {
    
    if (this.api.SessionID != null)
    {
      this.RoleID = this.api.RoleID;
    }

    this.api.getBadgeCount();
    this.api.getNotifications();
    
    //this.api.getProfile().subscribe(res => {console.log(res)});
    this.User = this.api.getProfile()
     .pipe(map((res: User) => {
      switch (res.RoleID) {
        case 1:
            return {Name: res.Clients[0].Name, Surname: res.Clients[0].Surname, Email:res.Clients[0].Email };       
        case 2:
          return {Name: res.Admins[0].Name, Surname: res.Admins[0].Surname, Email:res.Admins[0].Email };
        case 3:
          return {Name: res.Employees[0].Name, Surname: res.Employees[0].Surname, Email:res.Employees[0].Email };
      }
    }))

    
  }

  goHome()
  {
    if(!this.RoleID || this.RoleID == "1")
    {
      this.router.navigate(["home"])
    }
    else
    {
      this.router.navigate(["employeehome"])
    }
  }

  login()
  {
    var sessionID = sessionStorage.getItem('accessToken')
    if (sessionID)
    {
      this.router.navigateByUrl('/ClientProfile')
    }
    else
    {
      this.router.navigateByUrl('/login')
    }
  }

  logout()
  {
    this.api.logout().subscribe(res =>
      {
        if(res == "success")
        {
        sessionStorage.clear();

        this.RoleID = null;

        this.snack.open("Successfully logged out", "OK", {duration: 3000})
    
        this.router.navigateByUrl('/home')
        .then(() => {
          window.location.reload();
        });
        }
    
      })
    
  }

  showOverlay = false;

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
  
}

@Component({
  selector: 'loading-dialog',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="text-center"> 
      <svg id="load" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="247.5 235 147 172" width="50" height="50"><defs><path d="M248.5 236L391.5 236L391.5 404L248.5 404L248.5 236Z" id="a4ghdeFf3"></path><clipPath id="clipc19v0Zrmb"><use xlink:href="#a4ghdeFf3" opacity="1"></use></clipPath></defs><g><g><g clip-path="url(#clipc19v0Zrmb)" opacity="1"><image xlink:href="data:image/png;base64,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" x="0" y="0" width="143" height="168" transform="matrix(1 0 0 1 248.5 236)"></image></g></g></g></svg>
      <br />
      Processing...
    </div>     
   `,
})
export class LoadingDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoadingDialog>, private router: Router) { }

  
  ngOnInit() 
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50px';
  }
}
