import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";

import {
  Meal,
  MealsService,
} from "../../../shared/services/meals/meals.service";

@Component({
  selector: "meal",
  styleUrls: ["meal.component.scss"],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" />
          <span *ngIf="meal$ | async as meal; else title">
            {{ meal.name ? "Edit" : "Create" }} Meal
          </span>
          <ng-template #title> Loading ... </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)"
        ></meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" /> Fetching meal...
        </div>
      </ng-template>
    </div>
  `,
})
export class MealComponent implements OnInit, OnDestroy {
  public meal$: Observable<Meal>;
  private subscription: Subscription;

  constructor(
    private mealService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.mealService.meals$.subscribe();
    this.meal$ = this.route.params.switchMap((param) =>
      this.mealService.getMeal(param.id)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealService.addMeal(event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.removeMeal(key);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.updateMeal(key, event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(["meals"]);
  }
}
