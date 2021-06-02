import { EmployeeRol } from "./employee-rol";
import { EmployeeType } from "./employee-type";

export interface Employee {
    id?:number;
    nombre: string;
    apellidos:string;
    fechaNacimiento:Date;
    telefono:string;
    email:string;
    curp:string;
    rfc:string;
    idEmployeeRol:number;
    idEmployeeType:number;
    employeeRol:EmployeeRol;
    employeeType:EmployeeType;
}