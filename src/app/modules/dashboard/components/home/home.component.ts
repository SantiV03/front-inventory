import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductElement } from 'src/app/modules/product/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  chartBar: any
  chartdoughnutBar: any

  constructor(private productService: ProductService,) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((data: any) => {
        console.log("respuesta de productos", data);
        this.processProductResponse(data);
      }, (error: any) => {
        console.log("error en productos", error);
      });
  }

  processProductResponse(resp: any): void {
    
    const nameProduct: String [] = []
    const account: number [] = []


    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        nameProduct.push(element.name)
        account.push(element.account)
      });

      //GRAFICO
      this.chartdoughnutBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels: nameProduct,
        datasets: [
          {label: 'Productos', data: account}
        ]
      }
      });

      //GRAFICO doughnut
      this.chartBar = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [
            {label: 'Productos', data: account}
          ]
        }
        });      

    }
  }

}
