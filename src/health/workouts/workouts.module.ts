import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// containers
import { WorkoutsComponent } from "./containers/workouts/workouts.component";
import { WorkoutComponent } from "./containers/workout/workout.component";

// components
import { WorkoutFormComponent } from "./components/workout-form/workout-form.component";

// modules
import { SharedModule } from "../shared/shared.module";

export const ROUTES: Routes = [
  { path: "", component: WorkoutsComponent },
  { path: "new", component: WorkoutComponent },
  { path: ":id", component: WorkoutComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent],
})
export class WorkoutsModule {}
