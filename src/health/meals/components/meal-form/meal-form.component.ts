import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Meal } from "src/health/shared/services/meals/meals.service";

@Component({
  selector: "meal-form",
  styleUrls: ["meal-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">Meal name is required</div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="/img/add-white.svg" />
              Add Food
            </button>
          </div>

          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. eggs" />
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)"
              ></span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              *ngIf="!exist"
              type="button"
              class="button"
              (click)="createMeal()"
            >
              Create Meal
            </button>
            <button
              *ngIf="exist"
              type="button"
              class="button"
              (click)="updateMeal()"
            >
              Update Meal
            </button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>

          <div class="meal-form__delete" *ngIf="exist">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeMeal()">
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
export class MealFormComponent implements OnChanges {
  @Input() meal: Meal;
  @Output() create = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();

  public toggled = false;
  public exist = false;

  public form = this.fb.group({
    name: ["", Validators.required],
    ingredients: this.fb.array([""]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      this.exist = true;
      this.emptyIngredient();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredient() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get ingredients() {
    return this.form.get("ingredients") as FormArray;
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

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(""));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
