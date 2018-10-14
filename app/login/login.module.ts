import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginRouting } from './login.routing';
import { LoginComponent } from './login.component';
// import { DialogContent } from "../product/model.component";
// import { KYCTransactionDialog } from "../kyc-details/model.component";
// import { CRSDialogContent } from "../crs/model.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
  imports: [
    CommonModule,
    loginRouting,
    NativeScriptFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
