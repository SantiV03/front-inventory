import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryForm: FormGroup;  // Declaración de categoryForm fuera del constructor

  constructor(private fb: FormBuilder, private categoryservices: CategoryService, private dialogRef: MatDialogRef<CategoryComponent>)  { 
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {      
  }

  onSave(){
    let data = {
      name : this.categoryForm.get('name')?.value,
      description : this.categoryForm.get('description')?.value
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

}
