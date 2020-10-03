import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {ReportsService, Criteria} from '../../API Services/for Reports/reports.service';
import {mergeMap, groupBy, map, reduce} from 'rxjs/operators';
import { of} from 'rxjs';
import { stringify } from 'querystring';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {autoTable} from 'jspdf-autotable';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.css']
})
export class BookingReportComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ReportForm: FormGroup;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  displayed = true;
  generated = true;

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {     
      this.ReportForm = new FormGroup({
        start: new FormControl('', Validators.required),
        end: new FormControl('',Validators.required),
        criteria: new FormControl('', Validators.required)
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  title = 'hw4-frontend';

  chart=[];
  bookings: Object;

  constructor(private service: ReportsService, private router: Router,
    private api: ExperTexhService ){}

  DownloadPDF()
  {
    this.Criteria = ({
      StartDate: this.range.value.start,
      EndDate: this.range.value.end
    })

    // this.service.GetSaleReportingData(this.Criteria).subscribe(res => {
    //   var doc = new jsPDF();

    //   var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    //   var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    //   let length = res['Category'].length;
    //   let titles = res['Category'].map(z => z.Name);
    //   let totals = res['Category'].map(z => z.Total);

    //   let finalY = 120;
    //   var newCanvas = <HTMLCanvasElement>document.querySelector('#canvas');

    //   var newCanvasImg = newCanvas.toDataURL("image/png", 1.0 );

    //   doc.setFontSize(35)

    //   doc.text("Sale Report", (pageWidth/2) - 30, 15)
    //   doc.addImage(newCanvasImg, 'PNG', 25,25,160,100);
    //   doc.setFontSize(14)
    //   for (let i=0; i<length; i++)
    //   {
    //     doc.text("Product Category: "+titles[i], (pageWidth/2)*15, finalY + 23)
    //     doc.autoTable({startY: finalY + 25, html: '#testing' + i, useCss:true, head: [
    //       ['Product Name', "Total Products Sold", "Total Price (R)"]]})
    //       finalY = doc.autoTable.previous.finalY
    //   }

    //   doc.save('table.pdf');
    // });
  }
 
  Criteria: Criteria;
  
convetToPDF()
{
  var data = document.getElementById('sale');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  var today = this.maxDate.toLocaleDateString()
  var name = "Sales Report-" + today;
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save(name); // Generated PDF
  });
}

  random_rgba(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  }


  SubmitRequest(){
    var tTitle = "Product Sales per category";
  
    this.Criteria = ({
      StartDate: this.range.value.start,
      EndDate: this.range.value.end
    })

    //console.log(this.Criteria)

    this.service.GetBookingReportingData(this.Criteria).subscribe(response => {

      let keys = response['Bookings'].map(d=> d.Name);
      let values = response['Bookings'].map(d=> d.Total);

      this.bookings = response['Bookings'];
      
     

      this.chart = new Chart('canvas',{
        type:'pie',
        data:{
          labels: keys,
          datasets: [
            {
              data: values,
              fill: false,
              backgroundColor: [
                "#39ff14",
                "#04d9ff",
                "#ff5721",
                "#fe019a",
                "#bc13f3",
                "#ff073a",
                "#cfff04",
                "#ff0055",
                "#48929B",
                "#003171",
                "#FFDDCA",
                "#D9B611",
                "#ff5555",

              ]
            }
          ]
        },
        options: {   
          
          title: {display: true, text:tTitle},
        }
      })
    })
  }



}
