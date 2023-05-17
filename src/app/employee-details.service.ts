import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';



@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  baseUrl="http://localhost:3000/posts";

  constructor(private http:HttpClient) { }


  getEmployees(){
    return this.http.get<Employee[]>(this.baseUrl);
  }


  PostEmployees(employee:Employee){
   return this.http.post<Employee>(this.baseUrl,employee)
  }

  DeleteEmployee(id:string){
   return this.http.delete(this.baseUrl+'/'+id)
   }



}
