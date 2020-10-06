import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/API Services/for Booking/client';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { ProfileData } from 'src/app/app.component';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.sass']
})
export class EmployeehomeComponent implements OnInit {

  constructor(private api: ExperTexhService, private router: Router) { }

  RoleID;
  User: Observable<ProfileData<User>>

  ngOnInit(): void {
    
    if(this.api.RoleID == "2" || this.api.RoleID == "3")
    {
      this.RoleID = this.api.RoleID;
      this.User = this.api.getProfile()
     .pipe(map((res: User) => {
      switch (res.RoleID) {  
        case 2:
          return {Name: res.Admins[0].Name, Surname: res.Admins[0].Surname, Email:res.Admins[0].Email, ContactNo: res.Admins[0].ContactNo };
        case 3:
          return {Name: res.Employees[0].Name, Surname: res.Employees[0].Surname, Email:res.Employees[0].Email, ContactNo: res.Employees[0].ContactNo };
      }
    }))
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

 
  

}
