import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import {
  MealsService,
  Meal,
} from "../../../shared/services/meals/meals.service";
import { Store } from "store";

@Component({
  selector: "meals",
  styleUrls: ["meals.component.scss"],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1><img src="/img/food.svg" />Your Meals</h1>

        <a class="btn__add" [routerLink]="['../meals/new']">
          <img src="/img/add-white.svg" />
          New Meal
        </a>
      </div>

      <div *ngIf="meals$ | async as meals; else loading">
        <div class="message" *ngIf="!meals.length">
          <img src="/img/face.svg" />
          No meals, add a new meal to start
        </div>
        <list-item
          *ngFor="let meal of meals"
          [item]="meal"
          (removed)="removeMeal($event)"
        ></list-item>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" />
          Fetching meals ...
        </div>
      </ng-template>
    </div>
  `,
})
export class MealsComponent implements OnInit, OnDestroy {
  public meals$: Observable<Meal[]>;

  private subscription: Subscription;

  constructor(private mealsService: MealsService, private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>("meals");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.$key);
  }
}
