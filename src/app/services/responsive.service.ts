import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ResponsiveService {
    constructor(private readonly _breakpointObserver: BreakpointObserver) { }

    getMobileSizeState():Observable<BreakpointState>{
        return this._breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
    }
}