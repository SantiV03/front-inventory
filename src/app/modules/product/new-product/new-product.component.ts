import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductElement } from '../product/product/product.component';
import { ProductService } from '../../shared/services/product.service';

export interface Category{
  description: string
  id: number
  name: string
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup
  estadoFormulario: string = ""
  categories: Category[]=[]
  selectedFiles: any;
  nameImg: String =""

  constructor(private fb: FormBuilder, private categoryservices: CategoryService, 
    private productService: ProductService, 
    private dialogRef: MatDialogRef<NewProductComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any)  {

      this.estadoFormulario = "Agregar"
      this.productForm = this.fb.group( {
        name: ['', Validators.required],
        price: ['', Validators.required],
        account: ['', Validators.required],
        category: ['', Validators.required],
        picture: ['', Validators.required]
      })

      if (data != null){
        this.updateForm(data)
        this.estadoFormulario = "Actualizar"
      }

    }

  ngOnInit(): void {
    this.getCategories()
  }

  onSave(){
    console.log("picture: " + this.selectedFiles)
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFiles

    }
    
    const uploadImageData = new FormData()
    uploadImageData.append('picture', data.picture, data.picture.name)
    uploadImageData.append('name', data.name)
    uploadImageData.append('price', data.price)
    uploadImageData.append('account', data.account)
    uploadImageData.append('categoryId', data.category)

    if (this.data != null){
      //actualizar producto
      this.productService.updateProduct(uploadImageData, this.data.id)
                .subscribe((data: any)=>{
                  this.dialogRef.close(1)
                }, (error:any) => {  
                  this.dialogRef.close(2)
                })
    } else{
          this.productService.saveProduct(uploadImageData)
    .subscribe((data: any)=>{
      console.log("saveProduct 1")
      this.dialogRef.close(1)
    }, (error:any) => {
      console.log("saveProduct 2")
      this.dialogRef.close(2)
    })
    }
 
  }



  onCancel(){
    this.dialogRef.close(3)
   
  }
  
  getCategories(){
    this.categoryservices.getCategories()
    .subscribe((data:any)=>{
      this.categories = data.categoryResponse.category
  }, (error: any) =>{
    console.log("error al consular categorias")
  })
  }

  onFileChanged(event: any){

    this.selectedFiles = event.target.files[0];
    console.log("onFileChanged: " + this.selectedFiles + " filename: " + this.selectedFiles.name );

    if (this.selectedFiles) {
        this.nameImg = this.selectedFiles.name;

  }

  }
  updateForm(data: any){

    this.productForm = this.fb.group( {
      name: [data.name , Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: ['', Validators.required]
    })
  }

}
