import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { User } from "src/auth/shared/services/auth/auth.service";

@Component({
  selector: "app-header",
  styleUrls: ["header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/img/logo.svg" />

        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `,
})
export class HeaderComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
  }
}
