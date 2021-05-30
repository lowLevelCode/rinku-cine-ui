import { Component, OnInit } from '@angular/core';
import { EchoService } from 'src/app/services/echo.service';

@Component({
  selector: 'app-echo',
  templateUrl: './echo.component.html',
  styleUrls: ['./echo.component.scss']
})
export class EchoComponent implements OnInit {
  
  echoText!: string;
  constructor(private readonly _echoService:EchoService) { }

  ngOnInit(): void {
    this._echoService.getEcho().subscribe((data:any)=>{
      this.echoText = data.message;
    });
  }

}
