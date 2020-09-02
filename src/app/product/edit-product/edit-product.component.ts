import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { NgForm, FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductData } from 'src/app/API Services/for Product/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  
  constructor(private http: HttpClient, private router: Router,
     public service: ProductService,
     private fb: FormBuilder
    ) { }

    ProductForm: FormGroup;
    ProdFormData = this.service.ProductForm;
    categoryList: [];
    SupplierList: [];
    title: string;
  
    UploadFile: File = null;
    imageURL: string = null;

    onFileChanged(event)
    {
      this.UploadFile= event.target.files[0]

      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageURL = event.target.result;
      }
      reader.readAsDataURL(this.UploadFile);
    }

  ngOnInit(): void {
    this.http.get<[]>("https://localhost:44380/api/Products/getSuppliers")
    .subscribe(res => {
      this.SupplierList = res;
    })

    this.http.get<[]>("https://localhost:44380/api/Products/getCategories")
    .subscribe( res => {
      this.categoryList = res;
    })

    this.CreateForm();
    this.CheckForm();

   
  }

  CheckForm()
  {
    if(this.service.ProductForm == null)
    {
      this.title = "Add Product";
      this.resetForm();
    }
    else
    {
      this.title = "Edit Product";
      this.setProduct();
      this.imageURL = this.ProdFormData.Photos[0].Photo;
    }
  }

  CreateForm()
  {
    this.ProductForm = this.fb.group({
      name: ['',[ Validators.required, Validators.maxLength(50)]],
      description:  ['', [Validators.required, Validators.maxLength(150)]],
      quantity:  ['', [Validators.required, Validators.min(1)]],
      price:  ['', [Validators.required, Validators.min(1)]],
      supplierid: ['', Validators.required],
      categoryid:  ['', Validators.required],
      productid: new FormControl(),
      photos:  this.fb.array([this.fb.group({photo :['', Validators.required]})])
    })
  }

  onSubmit(): void
  {
    
    if(this.ProductForm.value.productid == null)
    {
      this.mapValues();
      this.AddProduct();   
    }
    else
    {
      if(this.ProductForm.value == this.ProdFormData)
        confirm("Information has not been changed. Would you like to re-enter details?");
      else
      {
        this.mapValues();
        this.EditProduct();
      }
    }
  }

  setProduct()
  {
    this.ProductForm.setValue({
      name: this.ProdFormData.Name,
      description: this.ProdFormData.Description,
      quantity: this.ProdFormData.QuantityOnHand,
      price: this.ProdFormData.Price,
      supplierid: this.ProdFormData.SupplierID,
      categoryid: this.ProdFormData.CategoryID
    })
  }

  mapValues()
  {
    this.ProdFormData = 
    {
      Name: this.ProductForm.value.name,
      Description: this.ProductForm.value.description,
      Price : this.ProductForm.value.price,
      QuantityOnHand :this.ProductForm.value.quantity,
      SupplierID : this.ProductForm.value.supplierid,
      CategoryID : this.ProductForm.value.categoryid,
      Category: null,
      Supplier: null,
      ProductID: this.ProductForm.value.productid,
      Photos: [{PhotoID: null, Photo: this.imageURL}]
    }
  }
 
  AddProduct()
  {
    //this.ProdFormData.Photos[0].Photo = this.imageURL;
    
    this.service.AddProduct(this.ProdFormData,this.UploadFile)
    .subscribe(res => 
      {
        if(res == "success")
        {
          alert("Successfully saved")
          this.router.navigateByUrl("AdminProduct")
        }
        else if(res == "duplicate")
      {
        if (confirm("Product already exists. Would you like to update instead?"))
        {
          this.service.ProductForm = this.ProdFormData;
          window.location.reload();
        }
        else
        {
          this.router.navigateByUrl("AdminProduct")
        }
      }
      else
      {
        return res
      }
      })
  }

  EditProduct()
  {
    
    this.service.UpdateProduct(this.ProdFormData).subscribe(res =>
      {
        if(res == "success")
        {
          alert("Successfully updated");
          this.router.navigateByUrl("AdminProduct")
        }
    })
  }



  Cancel()
{
  window.history.back();
}

  resetForm(form?: NgForm)
{
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