import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { subscribeOn } from 'rxjs';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { NewProductComponent } from '../../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog, private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getProducts()
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

  getProducts(){
    this.productService.getProducts()
    .subscribe((data:any)=> {
      console.log("respuesta de productos", data)
      this.proccesProductResponse(data)
    }, (error: any) => {
      console.log("error en productos", error)
    })
    
  }
  

  proccesProductResponse(resp: any) {
    const dateProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;
  
      listCProduct.forEach((element: ProductElement) => {
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });
  
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent  , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto Agregado", "Exitosa");
        this.productService.getProducts();
      } else if (result == 2){
        this.openSnackBar("Producto NO guardado", "Fallida");
      }
      
    });
  }

  openSnackBar(massage: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(massage, action, {
      duration: 2000
    })

  }

  edit(id: number, name: string, price: number, account: number, category: any){
    const dialogRef = this.dialog.open(NewProductComponent  , {
      width: '450px',
      data: {id: id, name: name, price: price, account: account, category: category}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto editado", "Exitosa");
        this.productService.getProducts();
      } else if (result == 2){
        this.openSnackBar("Producto NO editado", "Error");
      }
      
    });
  }

}



export interface ProductElement {
  id: number
  name: string
  price: number
  account: number
  category: any
  picture: any
 
}


