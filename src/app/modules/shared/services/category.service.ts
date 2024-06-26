import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = "http://springboot-app-419219.rj.r.appspot.com"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * get para las categorias
   * @returns 
   */

  getCategories(){

    const endpoint =  `${base_url}/categories`;
    return this.http.get(endpoint);
    
  }
  /**
   * buscar categorias por id
   */
  getCategoriesById(id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }
  
  /**
   * guardar categorias
   */

  saveCategory(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * actualizar categorias
   */
  updateCategories(body: any, id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }


  /**
   * actualizar categorias
   */
  deleteCategories(id: any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }


  /**
   * exportar excel
   */
  exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

}
