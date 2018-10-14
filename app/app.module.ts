import {ProductModule} from './product/product.module';
import {NgModule, NO_ERRORS_SCHEMA, ErrorHandler} from "@angular/core";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
import 'nativescript-localstorage';
import {AppRoutingModule} from "./app-routing.module";
// import { routingComponents } from "./login/login.routing";
import {AppComponent} from "./app.component";
import {UserService, DataService, CustomerinfoService, loaderService, toastService} from './services/index';
import {ModalDatetimepicker} from "nativescript-modal-datetimepicker";
import {DropDownModule} from "nativescript-drop-down/angular";
// import {DialogContent} from "./product/model.component";
import {DatePipe} from '@angular/common';
// import {KYCTransactionDialog} from "./kyc-details/model.component";
// import {CRSDialogContent} from "./crs/model.component";
import {JwtInterceptor} from './helpers/index';
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import "./bundle-config";
import {DeviceType} from "ui/enums";
import {device} from "platform";
import {CustomErrorHandler} from './shared/custom-error-handler';
import * as app from 'tns-core-modules/application';
import {KYCModule} from "./kyc-details/kyc-details.module";
import {CustomPreloading} from "./shared/custom-preloading";
// import { RouteReuseStrategy } from "@angular/router";
// import { CustomRouteReuseStrategy } from "./custom-router-strategy";

const fs = require("file-system");

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        // NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        KYCModule,
        ProductModule,
        DropDownModule
    ],
    declarations: [AppComponent],
    providers: [
        UserService,
        ModalDatetimepicker,
        UserService,
        DataService,
        CustomerinfoService,
        loaderService,
        toastService,
        DatePipe,
        CustomPreloading,
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    // entryComponents: [CRSDialogContent, DialogContent, KYCTransactionDialog],
    entryComponents: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule {
    constructor() {
        if (device.deviceType === DeviceType.Tablet) {
            let cssFileName = fs.path.join(fs.knownFolders.currentApp().path, "app.tablet.css");
            fs.File.fromPath(cssFileName).readText().then((result: string) => {
                app.addCss(result);
            });
        }
    }
}


// {
//     provide: RouteReuseStrategy,
//     useClass: CustomRouteReuseStrategy
// },
