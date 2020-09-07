import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process, Package} from '../../API Services/for User/process';

@Component({
  selector: 'app-spackage',
  templateUrl: './spackage.component.html',
  styleUrls: ['./spackage.component.sass']
})
export class SpackageComponent implements OnInit {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
  constructor(
    public dialog: MatDialog, 
    public service: ReportingService
  ) { }

  List: Observable<Package[]>
  ngOnInit(): void {
    this.loadList();
  }

  hide = true;
  previousForm() {
    window.history.back();
  }
  
  matcher = new ErrorStateMatcher();
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  loadList(){
    this.List = this.service.getPackage();
  }

}
