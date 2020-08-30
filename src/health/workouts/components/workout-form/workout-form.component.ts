import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
} from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

import { Workout } from "../../../shared/services/workout/workouts.service";

@Component({
  selector: "workout-form",
  styleUrls: ["workout-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              [placeholder]="placeholder"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Meal name is required</div>
          </label>
          <label>
            <h3>Type</h3>
            <workout-type formControlName="type"> </workout-type>
          </label>
        </div>

        <div class="workout-form__details">
          <div *ngIf="form.get('type').value === 'strength'">
            <div class="workout-form__fields" formGroupName="strength">
              <label>
                <h3>Reps</h3>
                <input type="number" formControlName="reps" />
              </label>

              <label>
                <h3>Sets</h3>
                <input type="number" formControlName="sets" />
              </label>

              <label>
                <h3>Weight <span>(kg)</span></h3>
                <input type="number" formControlName="weight" />
              </label>
            </div>
          </div>

          <div *ngIf="form.get('type').value === 'endurance'">
            <div class="workout-form__fields" formGroupName="endurance">
              <label>
                <h3>Distance <span>(km)</span></h3>
                <input type="number" formControlName="distance" />
              </label>

              <label>
                <h3>duration <span>(minutes)</span></h3>
                <input type="number" formControlName="duration" />
              </label>
            </div>
          </div>
        </div>

        <div class="workout-form__submit">
          <div>
            <button
              *ngIf="!exist"
              type="button"
              class="button"
              (click)="createWorkout()"
            >
              Create Workout
            </button>
            <button
              *ngIf="exist"
              type="button"
              class="button"
              (click)="updateWorkout()"
            >
              Update Workout
            </button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>

          <div class="workout-form__delete" *ngIf="exist">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">
                Yes
              </button>
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>

            <button
              class="button button--delete"
              type="button"
              (click)="toggle()"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class WorkoutFormComponent {
  @Input() workout: Workout;
  @Output() create = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();

  public toggled = false;
  public exist = false;

  public form = this.fb.group({
    name: ["", Validators.required],
    type: "strength",
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0,
    }),
  });

  constructor(private fb: FormBuilder) {}

  get placeholder() {
    return `e.g: ${
      this.form.get("type").value === "strength" ? "Benchpress" : "TreadMill"
    }`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      this.exist = true;

      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required() {
    return (
      this.form.get("name").hasError("required") &&
      this.form.get("name").touched
    );
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
