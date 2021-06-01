import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-close-dialog',
  templateUrl: './header-close-dialog.component.html',
  styleUrls: ['./header-close-dialog.component.scss']
})
export class HeaderCloseDialogComponent {
  @Input() title!:string;
}
