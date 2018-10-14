import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: "", component: LoginComponent }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
export const routingComponents = [
  LoginComponent
];