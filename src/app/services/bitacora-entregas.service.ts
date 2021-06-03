import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../interfaces/pagination';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BitacoraEntregas } from '../models/bitacora-entregas';

@Injectable()
export class BitacoraEntregasService {
    url:string = environment.apiEndPoint;
    constructor(private httpClient: HttpClient) { }

    getBitacora():Observable<Pagination<BitacoraEntregas>>{
        return this.httpClient.get<Pagination<BitacoraEntregas>>(`${this.url}/bitacora-entregas`);
    }

    getBitacoraByEmployeeId(id?:number):Observable<Pagination<BitacoraEntregas[]>>{
        return this.httpClient.get<Pagination<BitacoraEntregas[]>>(`${this.url}/bitacora-entregas/employee/${id}`);
    }
}