import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../interfaces/pagination';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BitacoraEntregas, updateBitacoraEntregas } from '../models/bitacora-entregas';

@Injectable()
export class BitacoraEntregasService {
    url:string = environment.apiEndPoint;
    constructor(private httpClient: HttpClient) { }

    getBitacora():Observable<Pagination<BitacoraEntregas>>{
        return this.httpClient.get<Pagination<BitacoraEntregas>>(`${this.url}/bitacora-entregas`);
    }

    getBitacoraByEmployeeId(id?:number,page:number= 1, limit:number=10):Observable<Pagination<BitacoraEntregas[]>>{
        let queryParams:string = `page=${page}&limit=${limit}`;
        return this.httpClient.get<Pagination<BitacoraEntregas[]>>(`${this.url}/bitacora-entregas/employee/${id}?/${queryParams}`);
    }

    getBitacoraByEmployeeIdAndDateRange(id?:number):Observable<BitacoraEntregas[]>{
        return this.httpClient.get<BitacoraEntregas[]>(`${this.url}/bitacora-entregas/employee-and-date/${id}?anio=12&mes=12`);
    }

    createMovimiento(bitacora:Partial<BitacoraEntregas>) :Observable<BitacoraEntregas> {
        return this.httpClient.post<BitacoraEntregas>(`${this.url}/bitacora-entregas`,bitacora);
    }

    updateMovimiento(id:number, updateBitacora:updateBitacoraEntregas) :Observable<BitacoraEntregas> {
        return this.httpClient.patch<BitacoraEntregas>(`${this.url}/bitacora-entregas/${id}`,updateBitacora);
    }
}