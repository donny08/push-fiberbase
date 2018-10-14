"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var custom_preloading_1 = require("./shared/custom-preloading");
var routes = [
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes, { preloadingStrategy: custom_preloading_1.CustomPreloading })],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUN2RSxnRUFBOEQ7QUFFOUQsSUFBTSxNQUFNLEdBQVc7SUFDbkI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU07S0FDMUM7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsWUFBWSxFQUFFLGtDQUFrQztLQUNuRDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGFBQWE7UUFDbkIsWUFBWSxFQUFFLG9EQUFvRDtLQUNyRTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsWUFBWSxFQUFFLDREQUE0RDtLQUM3RTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixZQUFZLEVBQUUscUVBQXFFO0tBQ3RGO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixZQUFZLEVBQUUsNERBQTREO0tBQzdFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFlBQVksRUFBRSxrRUFBa0U7S0FDbkY7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFlBQVksRUFBRSxpREFBaUQ7S0FDbEU7SUFDRDtRQUNJLElBQUksRUFBRSxlQUFlO1FBQ3JCLFlBQVksRUFBRSx5REFBeUQ7S0FDMUU7SUFDRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSw4Q0FBOEM7S0FDL0Q7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsWUFBWSxFQUFFLHdDQUF3QztLQUN6RDtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsWUFBWSxFQUFFLHdDQUF3QztLQUN6RDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGNBQWM7UUFDcEIsWUFBWSxFQUFFLHFEQUFxRDtLQUN0RTtJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixZQUFZLEVBQUUsa0VBQWtFO0tBQ25GO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsTUFBTTtRQUNaLFlBQVksRUFBRSxpQ0FBaUM7S0FDbEQ7SUFDRDtRQUNJLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsWUFBWSxFQUFFLHlEQUF5RDtRQUN2RSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0tBQzFCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLFlBQVksRUFBRSxpRkFBaUY7S0FDbEc7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFlBQVksRUFBRSw0Q0FBNEM7S0FDN0Q7SUFDRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLFlBQVksRUFBRSx5REFBeUQ7UUFDdkUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtLQUMxQjtJQUNELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0RBQWdELEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQy9HLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsMkNBQTJDLEVBQUU7SUFDL0UsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxpREFBaUQsRUFBRTtJQUN2RixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLDJDQUEyQyxFQUFFO0lBQy9FLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLHlEQUF5RCxFQUFFO0lBQzFGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsK0RBQStELEVBQUU7SUFDcEcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxrRUFBa0UsRUFBRTtJQUN0RztRQUNJLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLEVBQUU7S0FDakI7Q0FDSixDQUFDO0FBTUY7SUFBQTtJQUNBLENBQUM7SUFEWSxnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLGtCQUFrQixFQUFFLG9DQUFnQixFQUFFLENBQUMsQ0FBQztZQUM3RixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMsIFByZWxvYWRBbGxNb2R1bGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ3VzdG9tUHJlbG9hZGluZyB9IGZyb20gXCIuL3NoYXJlZC9jdXN0b20tcHJlbG9hZGluZ1wiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJsb2dpblwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL2xvZ2luL2xvZ2luLm1vZHVsZSNMb2dpbk1vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJwcm9kdWN0dHlwZVwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL3Byb2R1Y3R0eXBlL3Byb2R1Y3R0eXBlLm1vZHVsZSNQcm9kdWN0dHlwZU1vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJkb2N1bWVudGV4dHJhXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vZG9jdW1lbnQtZXh0cmEvZG9jdW1lbnQtZXh0cmEubW9kdWxlI0RvY3VtZW50RXh0cmFNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwicHJvZHVjdHNlbGVjdGlvblwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL3Byb2R1Y3Qtc2VsZWN0aW9uL3Byb2R1Y3Qtc2VsZWN0aW9uLm1vZHVsZSNQcm9kdWN0U2VsZWN0aW9uTW9kdWxlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcInByb2R1Y3Rjb25maWdcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiAnLi9wcm9kdWN0LWNvbmZpZy9wcm9kdWN0LWNvbmZpZy5tb2R1bGUjUHJvZHVjdENvbmZpZ01vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJyZWNvdmVyeV9hY2NvdW50XCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vcmVjb3ZlcnlfYWNjb3VudC9yZWNvdmVyeV9hY2NvdW50Lm1vZHVsZSNSZWNvdmVyeUFjY291bnRNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwibGlhYmxpdGllc1wiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL2xpYWJsaXRpZXMvbGlhYmxpdGllcy5tb2R1bGUjTGlhYmxpdGllc01vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJvZmZlcl9kZXRhaWxzXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vb2ZmZXJfZGV0YWlscy9vZmZlcl9kZXRhaWxzLm1vZHVsZSNPZmZlckRldGFpbHNNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiZGFzaGJvYXJkXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUjRGFzaGJvYXJkTW9kdWxlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcInNlZ21lbnRcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiAnLi9zZWdtZW50L3NlZ21lbnQubW9kdWxlI1NlZ21lbnRNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiYWRkX2Nhc2FcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiAnLi9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlI1Byb2R1Y3RNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiY3VzdG9tZXItb3RwXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vY3VzdG9tZXItb3RwL2N1c3RvbWVyLW90cC5tb2R1bGUjQ3VzdG9tZXJPVE1vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJjdXN0b21lcmFkZHJlc3NcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiAnLi9jdXN0b21lci1hZGRyZXNzL2N1c3RvbWVyLWFkZHJlc3MubW9kdWxlI0N1c3RvbWVyQWRkcmVzc01vZHVsZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJsZWFkXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vbGVhZHMvbGVhZHMubW9kdWxlI0xlYWRNb2R1bGUnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwicGVyc29uYWxkZXRhaWxzXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogJy4vcGVyc29uYWxkZXRhaWxzL3BlcnNvbmFsZGV0YWlscy5tb2R1bGUjUGVyc29uYWxNb2R1bGUnLFxuICAgICAgICBkYXRhOiB7IHByZWxvYWQ6IHRydWUgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcInBlcnNvbmFsZGV0YWlscy1leHRyYVwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL3BlcnNvbmFsZGV0YWlscy1leHRyYS9wZXJzb25hbGRldGFpbHMtZXh0cmEubW9kdWxlI1BlcnNvbmFsRGV0YWlsc0V4dHJhTW9kdWxlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImt5Y2RldGFpbHNcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiAnLi9reWMtZGV0YWlscy9reWMtZGV0YWlscy5tb2R1bGUjS1lDTW9kdWxlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImN1c3RvbWVydHlwZVwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46ICcuL2N1c3RvbWVyLXR5cGUvY3VzdG9tZXItdHlwZS5tb2R1bGUjQ3VzdG9tZXJUeXBlTW9kdWxlJyxcbiAgICAgICAgZGF0YTogeyBwcmVsb2FkOiB0cnVlIH1cbiAgICB9LFxuICAgIHsgcGF0aDogXCJhcHAtc3RhdHVzXCIsIGxvYWRDaGlsZHJlbjogJy4vYXBwLXN0YXR1cy9hcHAtc3RhdHVzLm1vZHVsZSNBcHBTdGF0dXNNb2R1bGUnLCBkYXRhOiB7IHByZWxvYWQ6IHRydWUgfSB9LFxuICAgIHsgcGF0aDogXCJyZWFkZWlkYVwiLCBsb2FkQ2hpbGRyZW46ICcuL3JlYWRlaWRhL3JlYWRlaWRhLm1vZHVsZSNSZWFkZWlkYU1vZHVsZScgfSxcbiAgICB7IHBhdGg6IFwiZWlkYXJlc3VsdFwiLCBsb2FkQ2hpbGRyZW46ICcuL2VpZGFyZXN1bHQvZWlkYXJlc3VsdC5tb2R1bGUjRUlEQVJlc3VsdE1vZHVsZScgfSxcbiAgICB7IHBhdGg6IFwibGVhZGRhdGFcIiwgbG9hZENoaWxkcmVuOiAnLi9sZWFkZGF0YS9sZWFkZGF0YS5tb2R1bGUjTGVhZERhdGFNb2R1bGUnIH0sXG4gICAgeyBwYXRoOiBcImRza1wiLCBsb2FkQ2hpbGRyZW46ICcuL2Rzay9kc2subW9kdWxlI0RTS01vZHVsZScgfSxcbiAgICB7IHBhdGg6IFwiY3JzXCIsIGxvYWRDaGlsZHJlbjogJy4vY3JzL2Nycy5tb2R1bGUjQ1JTTW9kdWxlJyB9LFxuICAgIHsgcGF0aDogXCJmYXRjYVwiLCBsb2FkQ2hpbGRyZW46ICcuL2ZhdGNhLWRldGFpbHMvZmF0Y2EtZGV0YWlscy5tb2R1bGUjRmF0Y2FEZXRhaWxzTW9kdWxlJyB9LFxuICAgIHsgcGF0aDogXCJkb2N1bWVudHNcIiwgbG9hZENoaWxkcmVuOiAnLi9kb2N1bWVudC11cGxvYWQvZG9jdW1lbnQtdXBsb2FkLm1vZHVsZSNEb2N1bWVudFVwbG9hZE1vZHVsZScgfSxcbiAgICB7IHBhdGg6IFwiYWNjLWluZm9cIiwgbG9hZENoaWxkcmVuOiAnLi9hY2NvdW50LWNyZWF0aW9uL2FjY291bnQtY3JlYXRpb24ubW9kdWxlI0FjY291bnRDcmVhdGlvbk1vZHVsZScgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICcqKicsXG4gICAgICAgIHJlZGlyZWN0VG86IFwiXCJcbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMsIHsgcHJlbG9hZGluZ1N0cmF0ZWd5OiBDdXN0b21QcmVsb2FkaW5nIH0pXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcbn1cbiJdfQ==