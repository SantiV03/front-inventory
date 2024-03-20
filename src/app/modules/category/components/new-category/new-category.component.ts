import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryForm: UntypedFormGroup;  
  estadoFormulario: string = "" ;

  constructor(private fb: UntypedFormBuilder, private categoryservices: CategoryService, 
    private dialogRef: MatDialogRef<CategoryComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any)  { 

      console.log(data);
      this.estadoFormulario = "Agregar" ;

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (data != null ){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar" ;
    }

  }

  ngOnInit(): void {      
  }

  onSave(){
    let data = {
      name : this.categoryForm.get('name')?.value,
      description : this.categoryForm.get('description')?.value
    }

    if (this.data != null){
      //actualizar registros
      this.categoryservices.updateCategories(data, this.data.id)
              .subscribe( (data: any) =>{
                this.dialogRef.close(1);
              }, (error:any) =>{  
                this.dialogRef.close(2);
              })
    } else {
      //crear registro
      this.categoryservices.saveCategory(data)
        .subscribe( (data : any) => {
       console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })


    }

    this.categoryservices.saveCategory(data)
    .subscribe( (data : any) => {
      console.log(data);
      this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    })

  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.categoryForm = this.fb.group({
      name: [data.name , Validators.required],
      description: [data.description , Validators.required]
    });
  }


}
