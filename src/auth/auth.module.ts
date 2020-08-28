import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AngularFireModule, FirebaseAppConfig } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", loadChildren: "./login/login.module#LoginModule" },
      {
        path: "register",
        loadChildren: "./register/register.module#RegisterModule",
      },
    ],
  },
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAF-2gCjbyAcDktYfewhYyJAWiRs0hPwCI",
  authDomain: "fitness-app-81479.firebaseapp.com",
  databaseURL: "https://fitness-app-81479.firebaseio.com",
  projectId: "fitness-app-81479",
  storageBucket: "fitness-app-81479.appspot.com",
  messagingSenderId: "571496528562",
  // appId: "1:571496528562:web:870f74cd99f5110687e7ab"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
})
export class AuthModule {}
