"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_module_1 = require("./product/product.module");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var http_client_1 = require("nativescript-angular/http-client");
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
require("nativescript-localstorage");
var app_routing_module_1 = require("./app-routing.module");
// import { routingComponents } from "./login/login.routing";
var app_component_1 = require("./app.component");
var index_1 = require("./services/index");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var angular_1 = require("nativescript-drop-down/angular");
// import {DialogContent} from "./product/model.component";
var common_1 = require("@angular/common");
// import {KYCTransactionDialog} from "./kyc-details/model.component";
// import {CRSDialogContent} from "./crs/model.component";
var index_2 = require("./helpers/index");
var angular_2 = require("nativescript-ui-sidedrawer/angular");
require("./bundle-config");
var enums_1 = require("ui/enums");
var platform_1 = require("platform");
var custom_error_handler_1 = require("./shared/custom-error-handler");
var app = require("tns-core-modules/application");
var kyc_details_module_1 = require("./kyc-details/kyc-details.module");
var custom_preloading_1 = require("./shared/custom-preloading");
// import { RouteReuseStrategy } from "@angular/router";
// import { CustomRouteReuseStrategy } from "./custom-router-strategy";
var fs = require("file-system");
var AppModule = /** @class */ (function () {
    function AppModule() {
        if (platform_1.device.deviceType === enums_1.DeviceType.Tablet) {
            var cssFileName = fs.path.join(fs.knownFolders.currentApp().path, "app.tablet.css");
            fs.File.fromPath(cssFileName).readText().then(function (result) {
                app.addCss(result);
            });
        }
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                // NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_2.NativeScriptUISideDrawerModule,
                app_routing_module_1.AppRoutingModule,
                kyc_details_module_1.KYCModule,
                product_module_1.ProductModule,
                angular_1.DropDownModule
            ],
            declarations: [app_component_1.AppComponent],
            providers: [
                index_1.UserService,
                nativescript_modal_datetimepicker_1.ModalDatetimepicker,
                index_1.UserService,
                index_1.DataService,
                index_1.CustomerinfoService,
                index_1.loaderService,
                index_1.toastService,
                common_1.DatePipe,
                custom_preloading_1.CustomPreloading,
                {
                    provide: core_1.ErrorHandler,
                    useClass: custom_error_handler_1.CustomErrorHandler,
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: index_2.JwtInterceptor,
                    multi: true
                }
            ],
            // entryComponents: [CRSDialogContent, DialogContent, KYCTransactionDialog],
            entryComponents: [],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
// {
//     provide: RouteReuseStrategy,
//     useClass: CustomRouteReuseStrategy
// },
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBdUQ7QUFDdkQsc0NBQXVFO0FBQ3ZFLDZDQUF1RDtBQUN2RCxnRkFBNEU7QUFDNUUsZ0VBQThFO0FBQzlFLHdFQUF3RTtBQUN4RSxxQ0FBbUM7QUFDbkMsMkRBQXNEO0FBQ3RELDZEQUE2RDtBQUM3RCxpREFBNkM7QUFDN0MsMENBQTRHO0FBQzVHLHVGQUFzRTtBQUN0RSwwREFBOEQ7QUFDOUQsMkRBQTJEO0FBQzNELDBDQUF5QztBQUN6QyxzRUFBc0U7QUFDdEUsMERBQTBEO0FBQzFELHlDQUErQztBQUMvQyw4REFBa0Y7QUFDbEYsMkJBQXlCO0FBQ3pCLGtDQUFvQztBQUNwQyxxQ0FBZ0M7QUFDaEMsc0VBQWlFO0FBQ2pFLGtEQUFvRDtBQUNwRCx1RUFBMkQ7QUFDM0QsZ0VBQTREO0FBQzVELHdEQUF3RDtBQUN4RCx1RUFBdUU7QUFFdkUsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBNENsQztJQUNJO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQU0sQ0FBQyxVQUFVLEtBQUssa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDcEYsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBYztnQkFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBUlEsU0FBUztRQTFDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwyQkFBMkI7Z0JBQzNCLDBDQUE0QjtnQkFDNUIsd0NBQThCO2dCQUM5QixxQ0FBZ0I7Z0JBQ2hCLDhCQUFTO2dCQUNULDhCQUFhO2dCQUNiLHdCQUFjO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsbUJBQVc7Z0JBQ1gsdURBQW1CO2dCQUNuQixtQkFBVztnQkFDWCxtQkFBVztnQkFDWCwyQkFBbUI7Z0JBQ25CLHFCQUFhO2dCQUNiLG9CQUFZO2dCQUNaLGlCQUFRO2dCQUNSLG9DQUFnQjtnQkFDaEI7b0JBQ0ksT0FBTyxFQUFFLG1CQUFZO29CQUNyQixRQUFRLEVBQUUseUNBQWtCO2lCQUMvQjtnQkFDRDtvQkFDSSxPQUFPLEVBQUUsd0JBQWlCO29CQUMxQixRQUFRLEVBQUUsc0JBQWM7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7WUFDRCw0RUFBNEU7WUFDNUUsZUFBZSxFQUFFLEVBQUU7WUFDbkIsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7O09BRVcsU0FBUyxDQVNyQjtJQUFELGdCQUFDO0NBQUEsQUFURCxJQVNDO0FBVFksOEJBQVM7QUFZdEIsSUFBSTtBQUNKLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvZHVjdE1vZHVsZX0gZnJvbSAnLi9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlJztcbmltcG9ydCB7TmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIEVycm9ySGFuZGxlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TmF0aXZlU2NyaXB0TW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0IHtBcHBSb3V0aW5nTW9kdWxlfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbi8vIGltcG9ydCB7IHJvdXRpbmdDb21wb25lbnRzIH0gZnJvbSBcIi4vbG9naW4vbG9naW4ucm91dGluZ1wiO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7VXNlclNlcnZpY2UsIERhdGFTZXJ2aWNlLCBDdXN0b21lcmluZm9TZXJ2aWNlLCBsb2FkZXJTZXJ2aWNlLCB0b2FzdFNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHtNb2RhbERhdGV0aW1lcGlja2VyfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XG5pbXBvcnQge0Ryb3BEb3duTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XG4vLyBpbXBvcnQge0RpYWxvZ0NvbnRlbnR9IGZyb20gXCIuL3Byb2R1Y3QvbW9kZWwuY29tcG9uZW50XCI7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuLy8gaW1wb3J0IHtLWUNUcmFuc2FjdGlvbkRpYWxvZ30gZnJvbSBcIi4va3ljLWRldGFpbHMvbW9kZWwuY29tcG9uZW50XCI7XG4vLyBpbXBvcnQge0NSU0RpYWxvZ0NvbnRlbnR9IGZyb20gXCIuL2Nycy9tb2RlbC5jb21wb25lbnRcIjtcbmltcG9ydCB7Snd0SW50ZXJjZXB0b3J9IGZyb20gJy4vaGVscGVycy9pbmRleCc7XG5pbXBvcnQge05hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCBcIi4vYnVuZGxlLWNvbmZpZ1wiO1xuaW1wb3J0IHtEZXZpY2VUeXBlfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCB7ZGV2aWNlfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7Q3VzdG9tRXJyb3JIYW5kbGVyfSBmcm9tICcuL3NoYXJlZC9jdXN0b20tZXJyb3ItaGFuZGxlcic7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5pbXBvcnQge0tZQ01vZHVsZX0gZnJvbSBcIi4va3ljLWRldGFpbHMva3ljLWRldGFpbHMubW9kdWxlXCI7XG5pbXBvcnQge0N1c3RvbVByZWxvYWRpbmd9IGZyb20gXCIuL3NoYXJlZC9jdXN0b20tcHJlbG9hZGluZ1wiO1xuLy8gaW1wb3J0IHsgUm91dGVSZXVzZVN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgQ3VzdG9tUm91dGVSZXVzZVN0cmF0ZWd5IH0gZnJvbSBcIi4vY3VzdG9tLXJvdXRlci1zdHJhdGVneVwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmaWxlLXN5c3RlbVwiKTtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgLy8gTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgS1lDTW9kdWxlLFxuICAgICAgICBQcm9kdWN0TW9kdWxlLFxuICAgICAgICBEcm9wRG93bk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVXNlclNlcnZpY2UsXG4gICAgICAgIE1vZGFsRGF0ZXRpbWVwaWNrZXIsXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxuICAgICAgICBEYXRhU2VydmljZSxcbiAgICAgICAgQ3VzdG9tZXJpbmZvU2VydmljZSxcbiAgICAgICAgbG9hZGVyU2VydmljZSxcbiAgICAgICAgdG9hc3RTZXJ2aWNlLFxuICAgICAgICBEYXRlUGlwZSxcbiAgICAgICAgQ3VzdG9tUHJlbG9hZGluZyxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogRXJyb3JIYW5kbGVyLFxuICAgICAgICAgICAgdXNlQ2xhc3M6IEN1c3RvbUVycm9ySGFuZGxlcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgICAgICB1c2VDbGFzczogSnd0SW50ZXJjZXB0b3IsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICAvLyBlbnRyeUNvbXBvbmVudHM6IFtDUlNEaWFsb2dDb250ZW50LCBEaWFsb2dDb250ZW50LCBLWUNUcmFuc2FjdGlvbkRpYWxvZ10sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKGRldmljZS5kZXZpY2VUeXBlID09PSBEZXZpY2VUeXBlLlRhYmxldCkge1xuICAgICAgICAgICAgbGV0IGNzc0ZpbGVOYW1lID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aCwgXCJhcHAudGFibGV0LmNzc1wiKTtcbiAgICAgICAgICAgIGZzLkZpbGUuZnJvbVBhdGgoY3NzRmlsZU5hbWUpLnJlYWRUZXh0KCkudGhlbigocmVzdWx0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBhcHAuYWRkQ3NzKHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyB7XG4vLyAgICAgcHJvdmlkZTogUm91dGVSZXVzZVN0cmF0ZWd5LFxuLy8gICAgIHVzZUNsYXNzOiBDdXN0b21Sb3V0ZVJldXNlU3RyYXRlZ3lcbi8vIH0sXG4iXX0=