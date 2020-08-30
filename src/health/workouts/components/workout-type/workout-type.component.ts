import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: "workout-type",
  styleUrls: ["workout-type.component.scss"],
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="workout-type">
      <div
        class="workout-type__pane"
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)"
      >
        <img src="/img/{{ selector }}.svg" />
        <p>{{ selector }}</p>
      </div>
    </div>
  `,
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  public selectors = ["strength", "endurance"];
  public value: string;

  private onTouch: Function;
  private onModalChange: Function;

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: Function): void {
    this.onModalChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  setSelected(value: string): void {
    this.value = value;
    this.onModalChange(value);
    this.onTouch();
  }
}
