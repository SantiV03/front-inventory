import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarRef as MatSnackBarRef, LegacySimpleSnackBar as SimpleSnackBar } from '@angular/material/legacy-snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  

  constructor(private categoryService: CategoryService,
                 public dialog: MatDialog, private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe( (data:any) => {

      console.log("respuesta categories: ", data);
      this.processCategoriesResponse(data);

    }, (error: any) => {
      console.log("error: ", error);
    })
  }
  processCategoriesResponse(resp: any){
    console.log("processCategoriesResponse :" + resp)
    const dataCategory: CategoryElement[] = [];

    if(resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
        
      });
      console.log("processCategoriesResponse"+dataCategory.length);
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
      
    }
   
  }
  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent  , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.categoryService.getCategories();
      } else if (result == 2){
        this.openSnackBar("Caregoria NO guardada", "Fallida");
      }
      
    });
  }

  edit(id:number, name:string, description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent  , {
      width: '450px',
      data: {id: id, name: name, description: description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Actualizada", "Exitosa");
        this.categoryService.getCategories();
      } else if (result == 2){
        this.openSnackBar("Caregoria NO actualizada", "Fallida");
      }
      
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '300px',
      data: {id: id, module: "category"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Categoria Eliminada", "Exitosa");
        this.categoryService.getCategories();
      } else if (result == 2){
        this.openSnackBar("Caregoria NO eliminada", "Fallida");
      }
      
    });
  }


  buscar(termino: string): void {

    if (termino.length === 0) {
        console.log("respuesta categories: 0" );
        this.categoryService.getCategories()
      .subscribe( (data:any) => {

        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);

      }, (error: any) => {
        console.log("error: ", error);
      })

    } else {
      
        this.categoryService.getCategoriesById(termino)
        .subscribe(   (data: any) => {
          console.log("respuesta categories: ", data);
                this.processCategoriesResponse(data);
            },
            (error: any) => {
                console.log("Error al obtener las categorías por ID:", error);
            });
  }
  }
  buscarV2(termino: string): void {
    const terminoSinPorcentaje = termino.replace(/%20/g, '');

    if (terminoSinPorcentaje.length === 0) {
        console.log("respuesta categories: 0" );
        this.categoryService.getCategories()
            .subscribe({
                next: (data: any) => {
                    console.log("respuesta categories: ", data);
                    this.processCategoriesResponse(data);
                },
                error: (error: any) => {
                    console.log("error: ", error);
                }
            });
    } else {
        console.log("respuesta categories: != 0" );
        this.categoryService.getCategoriesById(terminoSinPorcentaje)
            .subscribe({
                next: (data: any) => {
                    console.log("respuesta categories: ", data);
                    this.processCategoriesResponse(data);
                },
                error: (error: any) => {
                    console.log("Error al obtener las categorías por ID:", error);
                }
            });
    }
}


  openSnackBar(massage: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(massage, action, {
      duration: 2000
    })

  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

}
export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
