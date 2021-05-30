import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EchoService {
    
    url: string = environment.apiEndPoint;
    constructor(private httpClient: HttpClient) { }
    
    getEcho(): Observable<unknown> {
        return this.httpClient.get(`${this.url}/echo`);
    }
}