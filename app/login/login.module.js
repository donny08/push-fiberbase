"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var login_routing_1 = require("./login.routing");
var login_component_1 = require("./login.component");
// import { DialogContent } from "../product/model.component";
// import { KYCTransactionDialog } from "../kyc-details/model.component";
// import { CRSDialogContent } from "../crs/model.component";
var forms_1 = require("nativescript-angular/forms");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                login_routing_1.loginRouting,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [login_component_1.LoginComponent]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLDBDQUErQztBQUMvQyxpREFBK0M7QUFDL0MscURBQW1EO0FBQ25ELDhEQUE4RDtBQUM5RCx5RUFBeUU7QUFDekUsNkRBQTZEO0FBQzdELG9EQUFxRTtBQVVyRTtJQUFBO0lBQ0EsQ0FBQztJQURZLFdBQVc7UUFSdkIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHFCQUFZO2dCQUNaLDRCQUFZO2dCQUNaLCtCQUF1QjthQUN4QjtZQUNELFlBQVksRUFBRSxDQUFDLGdDQUFjLENBQUM7U0FDL0IsQ0FBQztPQUNXLFdBQVcsQ0FDdkI7SUFBRCxrQkFBQztDQUFBLEFBREQsSUFDQztBQURZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBsb2dpblJvdXRpbmcgfSBmcm9tICcuL2xvZ2luLnJvdXRpbmcnO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2xvZ2luLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBEaWFsb2dDb250ZW50IH0gZnJvbSBcIi4uL3Byb2R1Y3QvbW9kZWwuY29tcG9uZW50XCI7XG4vLyBpbXBvcnQgeyBLWUNUcmFuc2FjdGlvbkRpYWxvZyB9IGZyb20gXCIuLi9reWMtZGV0YWlscy9tb2RlbC5jb21wb25lbnRcIjtcbi8vIGltcG9ydCB7IENSU0RpYWxvZ0NvbnRlbnQgfSBmcm9tIFwiLi4vY3JzL21vZGVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBsb2dpblJvdXRpbmcsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTG9naW5Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHtcbn1cbiJdfQ==