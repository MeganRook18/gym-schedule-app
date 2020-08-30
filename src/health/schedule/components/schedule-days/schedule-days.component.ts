import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "schedule-days",
  styleUrls: ["schedule-days.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="days">
      <button
        type="button"
        class="day"
        *ngFor="let day of days; index as i"
        (click)="selectDay(i)"
      >
        <span [class.active]="i === selected">{{ day }}</span>
      </button>
    </div>
  `,
})
export class ScheduleDaysComponent {
  @Input() selected: number;
  @Output() select = new EventEmitter<number>();

  public days = ["M", "T", "W", "T", "F", "S", "S"];

  selectDay(index: number) {
    this.select.emit(index);
  }
}
