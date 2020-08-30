import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";

import {
  ScheduleItem,
  ScheduleList,
} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: "schedule-calendar",
  styleUrls: ["schedule-calendar.component.scss"],
  template: `
    <div class="calendar">
      <schedule-controls
        (move)="onChange($event)"
        [selected]="selectedDay"
      ></schedule-controls>

      <schedule-days (select)="selectDay($event)" [selected]="selectedDayIndex">
      </schedule-days>

      <schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)"
      >
      </schedule-section>
    </div>
  `,
})
export class ScheduleCalendarComponent implements OnChanges {
  public selectedDayIndex: number;
  public selectedDay: Date;
  public selectedWeek: Date;

  public sections = [
    { key: "morning", name: "Morning" },
    { key: "lunch", name: "Lunch" },
    { key: "evening", name: "Evening" },
    { key: "snacks", name: "Snack and Drinks" },
  ];

  @Input() set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input() items: ScheduleList;
  @Output() change = new EventEmitter<Date>();
  @Output() select = new EventEmitter<any>();

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
  }

  onChange(weekOffSet: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );

    startDate.setDate(startDate.getDate() + weekOffSet * 7);
    this.change.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
