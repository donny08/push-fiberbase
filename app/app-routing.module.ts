import { NgModule } from "@angular/core";
import { Routes, PreloadAllModules } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CustomPreloading } from "./shared/custom-preloading";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/login", pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: "producttype",
        loadChildren: './producttype/producttype.module#ProducttypeModule'
    },
    {
        path: "documentextra",
        loadChildren: './document-extra/document-extra.module#DocumentExtraModule'
    },
    {
        path: "productselection",
        loadChildren: './product-selection/product-selection.module#ProductSelectionModule'
    },
    {
        path: "productconfig",
        loadChildren: './product-config/product-config.module#ProductConfigModule'
    },
    {
        path: "recovery_account",
        loadChildren: './recovery_account/recovery_account.module#RecoveryAccountModule'
    },
    {
        path: "liablities",
        loadChildren: './liablities/liablities.module#LiablitiesModule'
    },
    {
        path: "offer_details",
        loadChildren: './offer_details/offer_details.module#OfferDetailsModule'
    },
    {
        path: "dashboard",
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: "segment",
        loadChildren: './segment/segment.module#SegmentModule'
    },
    {
        path: "add_casa",
        loadChildren: './product/product.module#ProductModule'
    },
    {
        path: "customer-otp",
        loadChildren: './customer-otp/customer-otp.module#CustomerOTModule'
    },
    {
        path: "customeraddress",
        loadChildren: './customer-address/customer-address.module#CustomerAddressModule'
    },
    {
        path: "lead",
        loadChildren: './leads/leads.module#LeadModule'
    },
    {
        path: "personaldetails",
        loadChildren: './personaldetails/personaldetails.module#PersonalModule',
        data: { preload: true }
    },
    {
        path: "personaldetails-extra",
        loadChildren: './personaldetails-extra/personaldetails-extra.module#PersonalDetailsExtraModule'
    },
    {
        path: "kycdetails",
        loadChildren: './kyc-details/kyc-details.module#KYCModule'
    },
    {
        path: "customertype",
        loadChildren: './customer-type/customer-type.module#CustomerTypeModule',
        data: { preload: true }
    },
    { path: "app-status", loadChildren: './app-status/app-status.module#AppStatusModule', data: { preload: true } },
    { path: "readeida", loadChildren: './readeida/readeida.module#ReadeidaModule' },
    { path: "eidaresult", loadChildren: './eidaresult/eidaresult.module#EIDAResultModule' },
    { path: "leaddata", loadChildren: './leaddata/leaddata.module#LeadDataModule' },
    { path: "dsk", loadChildren: './dsk/dsk.module#DSKModule' },
    { path: "crs", loadChildren: './crs/crs.module#CRSModule' },
    { path: "fatca", loadChildren: './fatca-details/fatca-details.module#FatcaDetailsModule' },
    { path: "documents", loadChildren: './document-upload/document-upload.module#DocumentUploadModule' },
    { path: "acc-info", loadChildren: './account-creation/account-creation.module#AccountCreationModule' },
    {
        path: '**',
        redirectTo: ""
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { preloadingStrategy: CustomPreloading })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
