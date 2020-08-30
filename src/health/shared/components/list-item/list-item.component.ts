import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "list-item",
  styleUrls: ["list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span *ngIf="item?.ingredients; else showWorkout">
            {{ item.ingredients | join }}
          </span>
        </p>
        <ng-template #showWorkout>
          <span>{{ item | workout }}</span>
        </ng-template>
      </a>

      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item?</p>
        <button class="confirm" type="button" (click)="removeItem()">
          Yes
        </button>
        <button class="cancel" type="button" (click)="toggle()">No</button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="/img/remove.svg" />
      </button>
    </div>
  `,
})
export class ListItemComponent {
  @Input() item: any;
  @Output() removed = new EventEmitter<any>();

  public toggled = false;

  constructor() {}

  getRoute(item: any) {
    return [`../${item.ingredients ? "meals" : "workouts"}`, item.$key];
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.removed.emit(this.item);
  }
}
