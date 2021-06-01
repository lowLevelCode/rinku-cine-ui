import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-with-text',
  templateUrl: './avatar-with-text.component.html',
  styleUrls: ['./avatar-with-text.component.scss']
})
export class AvatarWithTextComponent {
  @Input() img!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
}
