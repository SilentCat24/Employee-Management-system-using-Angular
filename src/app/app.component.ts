import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeDetailsService } from './employee-details.service';
// import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('tempButton') buttontemp:any;
  @ViewChild('fileInput')fileInput:any;
  title = 'emplolyeeDetails';
  @ViewChild('addEmployeeButton') addEmployeeButton: any;

  employeeForm:FormGroup;
  employees:Employee[];
  employeeToDisplay:Employee[];

  educationOptions=[
    '10th pass',
    'diploma', 
    'graduate',
    'post graduate',
    'phd'
  ]

constructor(private fb:FormBuilder,private employeeService:EmployeeDetailsService){
  this.employeeForm=fb.group({});
  this.employees=[];
  this.employeeToDisplay=this.employees;

}

ngOnInit(): void {
 this.employeeForm=this.fb.group({
firstname:this.fb.control(''),
lastname:this.fb.control(''),
birthday:this.fb.control(''),
gender:this.fb.control(''),
education:this.fb.control('default'),
company:this.fb.control(''),
jobExperience:this.fb.control(''),
salary:this.fb.control(''),
 }); 

 this.employeeService.getEmployees().subscribe((res)=>{
  // console.log(res)
  for(let emp of res){
    this.employees.unshift(emp);
  }
  this.employeeToDisplay=this.employees;
 })



 
}


ngAfterViewInit(): void {
  // this.buttontemp.nativeElement.click();
}

addEmployee(){

  let employee:Employee={
    // id:uuidv4(),
    firstName:this.FirstName.value,
    lastName:this.LastName.value,
    birthDate:this.BirthDay.value,
    gender:this.Gender.value,
    education:this.educationOptions[parseInt(this.Education.value)],
    jobExperience:this.JobExperience.value,
    company:this.Company.value,
    salary:this.Salary.value,
    profile:this.fileInput.nativeElement.files[0]?.name,
  }
  this.employeeService.PostEmployees(employee).subscribe((res)=>{
    this.employees.unshift(res);
    this.clearForm();
  })

  console.log(this.employees)
}

removeEmployee(event: any) {
  this.employees.forEach((val, index) => {
    if (val.id === parseInt(event)) {
      this.employeeService.DeleteEmployee(event).subscribe((res) => {
        this.employees.splice(index, 1);
      });
    }
  });
}



editEmployee(event: any) {
  this.employees.forEach((val, ind) => {
    if (val.id === event) {
      this.setForm(val);
    }
  });
  this.removeEmployee(event);
  this.addEmployeeButton.nativeElement.click();
}


setForm(emp: Employee) {
  this.FirstName.setValue(emp.firstName);
  this.LastName.setValue(emp.lastName);
  this.BirthDay.setValue(emp.birthDate);
  this.Gender.setValue(emp.gender);

  let educationIndex = 0;
  this.educationOptions.forEach((val, index) => {
    if (val === emp.education) educationIndex = index;
  });
  this.Education.setValue(educationIndex);

  this.Company.setValue(emp.company);
  this.JobExperience.setValue(emp.jobExperience);
  this.Salary.setValue(emp.salary);
  this.fileInput.nativeElement.value = '';
}

clearForm(){
  this.FirstName.setValue(' ');
  this.LastName.setValue('');
  this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value = '';
}


searchEmployees(event: any) {
  let filteredEmployees: Employee[] = [];

  if (event === '') {
    this.employeeToDisplay = this.employees;
  } else {
    filteredEmployees = this.employees.filter((val, index) => {
      let targetKey = val.firstName.toLowerCase() + '' + val.lastName.toLowerCase();
      let searchKey = event.toLowerCase();
      return targetKey.includes(searchKey);
    });
    this.employeeToDisplay = filteredEmployees;
  }
}

public get FirstName(): FormControl {
  return this.employeeForm.get('firstname') as FormControl;
}
public get LastName(): FormControl {
  return this.employeeForm.get('lastname') as FormControl;
}
public get BirthDay(): FormControl {
  return this.employeeForm.get('birthday') as FormControl;
}
public get Gender(): FormControl {
  return this.employeeForm.get('gender') as FormControl;
}
public get Education(): FormControl {
  return this.employeeForm.get('education') as FormControl;
}
public get Company(): FormControl {
  return this.employeeForm.get('company') as FormControl;
}
public get JobExperience(): FormControl {
  return this.employeeForm.get('jobExperience') as FormControl;
}
public get Salary(): FormControl {
  return this.employeeForm.get('salary') as FormControl;
}

}
