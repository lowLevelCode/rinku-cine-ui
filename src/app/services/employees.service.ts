import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Pagination } from '../interfaces/pagination';

@Injectable()
export class EmployeesService {
    url:string = environment.apiEndPoint;
    constructor(private httpClient: HttpClient) { }
    
    getEmployees(): Observable<Pagination<Partial<Employee>[]>> {
        return this.httpClient.get<Pagination<Partial<Employee>[]>>(`${this.url}/employees`);
    }

    create(employee:Partial<Employee>): Observable<Partial<Employee>> {
        return this.httpClient.post<Partial<Employee>>(`${this.url}/employees`,employee);
    }
}