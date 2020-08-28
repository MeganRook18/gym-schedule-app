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
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Meal name is required</div>
          </label>
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
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.meal && this.meal.name) {
    //   this.exist = true;
    //   this.emptyIngredient();
    //   const value = this.meal;
    //   this.form.patchValue(value);
    //   if (value.ingredients) {
    //     for (const item of value.ingredients) {
    //       this.ingredients.push(new FormControl(item));
    //     }
    //   }
    // }
  }

  // emptyIngredient() {
  //   while (this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }

  // get ingredients() {
  //   return this.form.get("ingredients") as FormArray;
  // }

  // get required() {
  //   return (
  //     this.form.get("name").hasError("required") &&
  //     this.form.get("name").touched
  //   );
  // }

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
