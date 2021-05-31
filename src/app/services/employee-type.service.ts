import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeType } from '../models/employee-type';

@Injectable()
export class EmployeeTypeService {

    url:string = environment.apiEndPoint;

    constructor(private httpClient: HttpClient) { }
    
    getAllTypes():Observable<EmployeeType[]>{
        return this.httpClient.get<EmployeeType[]>(`${this.url}/employee-type`);
    }
}