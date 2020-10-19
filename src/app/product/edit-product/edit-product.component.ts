import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductData } from 'src/app/API Services/for Product/product';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router,
    public service: ProductService, private api: ExperTexhService,
    private fb: FormBuilder
  ) { }

  ProductForm: FormGroup;
  ProdFormData;
  categoryList: [];
  SupplierList: [];
  title: string;

  UploadFile: File = null;
  imageURL: string = null;

  onFileChanged(event) {
    this.UploadFile = event.target.files[0]

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.UploadFile);
    this.imgChanged = true;
  }

  removeImage() {
    this.imageURL = null;
    this.imgChanged = false;
    this.UploadFile = null;
  }

  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.ProdFormData = JSON.parse(localStorage.getItem('prodEdit'));
      this.http.get<[]>("https://localhost:44380/api/Products/getSuppliers")
        .subscribe(res => {
          this.SupplierList = res;
        })

      this.http.get<[]>("https://localhost:44380/api/Products/getCategories")
        .subscribe(res => {
          this.categoryList = res;
        })

      this.CreateForm();
      this.CheckForm();


      this.ProductForm.valueChanges.subscribe(res => {
        this.logValidationErrors(this.ProductForm)
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  validationMessages =
    {
      'name': {
        'required': 'Name field is required',
        'maxlength': 'Name may not exceed 50 characters'
      },

      'description': {
        'required': 'description field is required',
        'maxlength': 'description may not exceed 150 characters'
      },
      'quantity': {
        'required': 'quantity field is required',
        'min': 'Quanitity has to be a minimum of 1'
      },
      'price': {
        'required': 'Price is required',
        'min': 'Price has to be a minimum of 1'
      },
      'supplierid': { 'required': 'A Supplier must be selected' },
      'categoryid': { 'required': 'A Product Category must be selected' },
      'photo': { 'required': 'A photo needs to be selected' }
    }

  formErrors =
    {
      'name': '',
      'description': '',
      'quantity': '',
      'price': '',
      'supplierid': '',
      'categoryid': '',
      'photo': ''

    }

  logValidationErrors(group: FormGroup = this.ProductForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key)
      if (abstractControl instanceof FormGroup) { this.logValidationErrors(abstractControl) }
      else {
        this.formErrors[key] = ''
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key]
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    })
  }

  validateAllFormFields(group: FormGroup = this.ProductForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key)
      if (abstractControl instanceof FormGroup) { this.logValidationErrors(abstractControl) }
      else {
        this.formErrors[key] = ''
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty) ||
          abstractControl.untouched) {
          const messages = this.validationMessages[key]
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    })
  }

  CheckForm() {
    if (this.service.ProductForm == null) {
      this.title = "Add Product";
      this.resetForm();
    }
    else {
      this.title = "Edit Product";
      this.setProduct();
    }
  }

  CreateForm() {
    this.ProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      supplierid: ['', Validators.required],
      categoryid: ['', Validators.required],
      productid: [null],
      photos: this.fb.array([this.fb.group({ photo: ['', Validators.required] })])
    })
  }



  onSubmit(): void {

    if (this.ProductForm.value.productid == null) {

      this.AddProduct();
    }
    else {
      if (this.ProductForm.value == this.ProdFormData)
        confirm("Information has not been changed. Would you like to re-enter details?");
      else {
        this.mapValues();
        this.EditProduct();
      }
    }
  }

  imgChanged = false;
  setProduct() {
    this.ProductForm.patchValue({
      name: this.ProdFormData.Name,
      description: this.ProdFormData.Description,
      quantity: this.ProdFormData.QuantityOnHand,
      price: this.ProdFormData.Price,
      supplierid: this.ProdFormData.SupplierID,
      categoryid: this.ProdFormData.CategoryID,
      productid: this.ProdFormData.ProductID,
    })

    this.ProductForm.setControl('photos', this.fb.array([this.fb.group(
      {
        photo: this.ProdFormData.Image
      })] ))

    
    this.imageURL = this.ProdFormData.Image;

  }

  mapValues() {
    this.ProdFormData =
    {
      Name: this.ProductForm.value.name,
      Description: this.ProductForm.value.description,
      Price: this.ProductForm.value.price,
      QuantityOnHand: this.ProductForm.value.quantity,
      SupplierID: this.ProductForm.value.supplierid,
      CategoryID: this.ProductForm.value.categoryid,
      Category: null,
      Supplier: null,
      ProductID: this.ProductForm.value.productid,
      Photos: [{ PhotoID: null, Photo: this.imageURL }]
    }
  }

  AddProduct() {
    //this.ProdFormData.Photos[0].Photo = this.imageURL;
    if (this.ProductForm.invalid) {
      this.validateAllFormFields(this.ProductForm)
      return;
    }
    this.mapValues();
    this.service.AddProduct(this.ProdFormData, this.UploadFile, this.api.SessionID)
      .subscribe((res: any) => {
        if (res == "success") {
          alert("Successfully saved")
          this.router.navigateByUrl("AdminProduct")

        }
        else if (res.Error == "duplicate") {
          if (confirm("Product already exists. Would you like to update instead?")) {
            this.service.ProductForm = this.ProdFormData;
            window.location.reload();
          }
          else {
            this.router.navigateByUrl("AdminProduct")
          }
        }
        else if (res.Error == "session") {
          alert(res.Message)

        }
      })
  }

  EditProduct() {

    // console.log(this.UploadFile)
    // console.log(this.imageURL)
    // console.log(this.ProdFormData)

    if (this.ProductForm.invalid) {
      alert("form is invalid")
      this.validateAllFormFields(this.ProductForm)
      return;
    }

    this.mapValues();
    this.service.UpdateProduct(this.ProdFormData, this.UploadFile, this.api.SessionID, this.imgChanged).subscribe(res =>
      {
        if(res == "success")
        {
          alert("Successfully updated");
          this.router.navigateByUrl("AdminProduct")
          localStorage.removeItem('prodEdit')
        }
    })
  }



  Cancel() {
    if(this.ProductForm.touched && this.ProductForm.dirty)
    {
      if(confirm("You've made unsaved changes. Are you sure you want to leave this page?"))
      window.history.back();
    }
    else
    {
      window.history.back();
    }
    
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();


    this.service.ProductForm =
    {
      ProductID: null,
      Name: null,
      Description: null,
      QuantityOnHand: null,
      Price: null,
      SupplierID: null,
      CategoryID: null,
      Category: null,
      Supplier: null,
      SelectedQuantity: null,
      Image: null,
      Photos:
        [
          {
            PhotoID: null,
            Photo: null,
          }
        ]
    }

  }
}
