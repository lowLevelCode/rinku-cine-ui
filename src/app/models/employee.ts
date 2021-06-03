import { EmployeeRol } from "./employee-rol";
import { EmployeeType } from "./employee-type";

export interface Employee {
    id:number;
    nombre: string;
    apellidos:string;    
    telefono:string;
    email:string;
    curp:string;
    rfc:string;
    employeeRolId:number;
    employeeTypeId:number;
    
    employeeRol:EmployeeRol;
    employeeType:EmployeeType;
}