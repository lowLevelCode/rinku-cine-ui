import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeRol } from '../models/employee-rol';

@Injectable()
export class EmployeeRolService {

    url:string = environment.apiEndPoint;

    constructor(private httpClient: HttpClient) { }
    
    getAllRols():Observable<EmployeeRol[]>{
        return this.httpClient.get<EmployeeRol[]>(`${this.url}/employee-rol`);
    }
}