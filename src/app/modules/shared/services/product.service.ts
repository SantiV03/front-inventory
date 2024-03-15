import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts(){

    const endpoint =  `${base_url}/products`;
    return this.http.get(endpoint);
    
  }

  /**
   * Guardar producto
   */
  
  saveProduct(body: any){
    const endpoint =  `${base_url}/products`;
    return this.http.post(endpoint, body);

  }


  /**
   * Actualizar producto
   */

  updateProduct (body:any, id:any){
    const endpoint =  `${base_url}/products/${id}`
    return this.http.put(endpoint, body)
  }

  /**
   * Eliminar producto
   */

  deleteProduct(id:any){
    const endpoint =  `${base_url}/products/${id}`
    return this.http.delete(endpoint)
  }

  /**
   * buscar producto por nombre
   */
  getProductByName(name:any){
    const endpoint =  `${base_url}/products/filter/${name}`
    return this.http.get(endpoint)
  }
  }



  




