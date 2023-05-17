import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() employee:Employee;
  @Output() onRemoveEmployee=new EventEmitter<number>();
  @Output() onEditEmployee=new EventEmitter<number>();

  constructor(){
    this.employee={
      firstName:'',
      lastName:'',
      birthDate:'',
      gender:'',
      education:'',
      company:'',
      jobExperience:0,
      salary:0,
      profile:'',

    }
  }
  
  ngOnInit(): void {
    console.log(this.employee);
  }


  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id)
  }

  deleteEmployeeClicked(){
    this.onRemoveEmployee.emit(this.employee.id);
  }

}
