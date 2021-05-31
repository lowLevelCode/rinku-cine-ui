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

export interface EmployeeRol {
    id:number;
    nombre:string;
}

export interface EmployeeType {
    id:number;
    nombre:string;
}