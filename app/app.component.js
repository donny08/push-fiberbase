"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform = require("tns-core-modules/platform");
var app = require("tns-core-modules/application");
var router_1 = require("@angular/router");
var elementRegistryModule = require("nativescript-angular/element-registry");
elementRegistryModule.registerElement("FilterableListpicker", function () { return require("nativescript-filterable-listpicker").FilterableListpicker; });
elementRegistryModule.registerElement("Gradient", function () { return require("nativescript-gradient").Gradient; });
var dialogs = require("ui/dialogs");
var Connectivity = require("tns-core-modules/connectivity");
var index_1 = require("./services/index");
var dialogs_1 = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");
//require("nativescript-plugin-firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, zone, dataService) {
        var _this = this;
        this.router = router;
        this.zone = zone;
        this.dataService = dataService;
        this.exitFromApp = false;
        this.goToDashboard = false;
        this.stopBackButton = false;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                console.log("current url", event);
                // if (event.url == "/lead/customertype" || event.url.match(/leaddata/g)) {
                if (event.url == "/customertype" || event.url.match(/leaddata/g)) {
                    console.log("localstorage clear");
                    _this.dataService.afterAccountCreate();
                }
                if (event.url == "/productconfig") {
                    _this.stopBackButton = true;
                }
                else {
                    _this.stopBackButton = false;
                }
                // if (event.url == "/kycdetails/documents") {
                if (event.url == "/documents") {
                    _this.goToDashboard = true;
                }
                else {
                    _this.goToDashboard = false;
                }
                if (event.url == "/dashboard" || event.url == "/" || event.url == "/login") {
                    console.log("APP exit");
                    _this.exitFromApp = true;
                }
                else {
                    _this.exitFromApp = false;
                }
            }
        });
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, function (args) {
                if (_this.exitFromApp) {
                    args.cancel = true;
                    var options = {
                        title: "",
                        message: "Are you sure you want to close the app?",
                        okButtonText: "Yes",
                        cancelButtonText: "No",
                        neutralButtonText: "Cancel"
                    };
                    dialogs_1.confirm(options).then(function (result) {
                        if (result) {
                            android.os.Process.killProcess(android.os.Process.myPid());
                            // application.android.foregroundActivity.finish();
                        }
                    });
                }
                if (_this.stopBackButton) {
                    args.cancel = true;
                }
                if (_this.goToDashboard) {
                    args.cancel = true;
                    var options = {
                        title: "",
                        message: "Are you sure you want to go back to dashboard screen?",
                        okButtonText: "Yes",
                        cancelButtonText: "No",
                        neutralButtonText: "Cancel"
                    };
                    dialogs_1.confirm(options).then(function (result) {
                        if (result) {
                            console.log("localstorage clear");
                            _this.dataService.afterAccountCreate();
                            _this.router.navigate(["/dashboard"]);
                        }
                    });
                }
            });
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.android) {
            var packageManager = app.android.context.getPackageManager();
            this.appVersion = packageManager.getPackageInfo(app.android.context.getPackageName(), 0).versionName;
            var activity = app.android.startActivity;
            var window_1 = activity.getWindow();
            activity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        this.userDet = JSON.parse(localStorage.getItem('userObj'));
        if (this.userDet != null) {
            this.router.navigate(["dashboard"]);
            // this.routerExtensions.navigate(['dashboard'],liablities,offer_details,productselection,/kycdetails/product,producttype,crs,
            //kycdetails/crs,kycdetails/product,productconfig,personaldetails/personaldetails-extra,customer-otp,
            //personaldetails-extra,acc-info,product,documents,product,fatca,customeraddress,kycdetails{
            //     clearHistory: true
            // });
        }
        if (platform.isIOS && app.ios.window.safeAreaInsets) {
            var topSafeArea = app.ios.window.safeAreaInsets.top;
            var bottomSafeArea = app.ios.window.safeAreaInsets.bottom;
            if (topSafeArea > 0) {
                app.addCss(".navbar { padding-top: " + topSafeArea + "; }");
                app.addCss(".page { margin-top : -" + topSafeArea + ";  margin-bottom : -" + bottomSafeArea + "; }");
            }
        }
        this.connectionType = this.connectionMade(Connectivity.getConnectionType());
        Connectivity.startMonitoring(function (connectionType) {
            _this.zone.run(function () {
                _this.connectionType = _this.connectionMade(connectionType);
            });
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        firebase.init({
            iOSEmulatorFlush: true,
            onMessageReceivedCallback: function (message) {
                console.log("Title: " + message.title);
                console.log("Body: " + message.body);
                console.log("Value of 'foo': " + message.data.foo);
            },
            onPushTokenReceivedCallback: function (token) {
                console.log('token', token);
                if (token) {
                    localStorage.setItem('firebaseToken', token);
                }
            },
            getCurrentPushToken: function (token) {
                console.log('Current push token', token);
            }
        }).then(function (instance) {
            console.log("firebase.init done");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
    };
    AppComponent.prototype.connectionMade = function (connectionType) {
        switch (connectionType) {
            case Connectivity.connectionType.none:
                dialogs.alert({
                    title: "",
                    message: "No Internet Connection!",
                    okButtonText: "OK"
                }).then(function () {
                });
                return "No Connection!";
            case Connectivity.connectionType.wifi:
                return "Connected to WiFi!";
            case Connectivity.connectionType.mobile:
                return "Connected to Mobile Network!";
            default:
                return "Unknown";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, index_1.DataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsb0RBQXFEO0FBQ3JELGtEQUFvRDtBQUNwRCwwQ0FBd0Q7QUFDeEQsNkVBQStFO0FBRS9FLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsb0JBQW9CLEVBQWxFLENBQWtFLENBQUMsQ0FBQztBQUN4SSxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQUNuRyxvQ0FBc0M7QUFDdEMsNERBQThEO0FBQzlELDBDQUErQztBQUMvQyxzQ0FBcUM7QUFFckMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsMENBQTBDO0FBTzFDO0lBU0ksc0JBQW9CLE1BQWMsRUFBVSxJQUFZLEVBQVUsV0FBd0I7UUFBMUYsaUJBNEVDO1FBNUVtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSjFGLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBR25CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHNCQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEMsMkVBQTJFO2dCQUMzRSxFQUFFLENB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QUF5QjtvQkFDbEMsWUFBWSxFQUFFLElBQUk7aUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQzVCLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2dCQUNqQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ25DLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQztZQUMxQztnQkFDSSxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBektRLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FXOEIsZUFBTSxFQUFnQixhQUFNLEVBQXVCLG1CQUFXO09BVGpGLFlBQVksQ0EyS3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTNLRCxJQTJLQztBQTNLWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIlxuaW1wb3J0ICogYXMgYXBwIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmRlY2xhcmUgY29uc3QgYW5kcm9pZDogYW55O1xuZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkZpbHRlcmFibGVMaXN0cGlja2VyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmlsdGVyYWJsZS1saXN0cGlja2VyXCIpLkZpbHRlcmFibGVMaXN0cGlja2VyKTtcbmVsZW1lbnRSZWdpc3RyeU1vZHVsZS5yZWdpc3RlckVsZW1lbnQoXCJHcmFkaWVudFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdyYWRpZW50XCIpLkdyYWRpZW50KTtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIENvbm5lY3Rpdml0eSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQgeyBjb25maXJtIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IG1lc3NhZ2luZywgTWVzc2FnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21lc3NhZ2luZ1wiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbi8vcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICB1c2VyRGV0OiBhbnk7XG4gICAgYXBwVmVyc2lvbjogYW55O1xuICAgIHNjcmVlbkluZm9ybWF0aW9uOiBhbnk7XG4gICAgcHVibGljIGNvbm5lY3Rpb25UeXBlOiBzdHJpbmc7XG4gICAgZXhpdEZyb21BcHAgPSBmYWxzZTtcbiAgICBnb1RvRGFzaGJvYXJkID0gZmFsc2U7XG4gICAgc3RvcEJhY2tCdXR0b24gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnQgdXJsXCIsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZXZlbnQudXJsID09IFwiL2xlYWQvY3VzdG9tZXJ0eXBlXCIgfHwgZXZlbnQudXJsLm1hdGNoKC9sZWFkZGF0YS9nKSkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC51cmwgPT0gXCIvY3VzdG9tZXJ0eXBlXCIgfHwgZXZlbnQudXJsLm1hdGNoKC9sZWFkZGF0YS9nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvY2Fsc3RvcmFnZSBjbGVhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZnRlckFjY291bnRDcmVhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudXJsID09IFwiL3Byb2R1Y3Rjb25maWdcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCYWNrQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCYWNrQnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgKGV2ZW50LnVybCA9PSBcIi9reWNkZXRhaWxzL2RvY3VtZW50c1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVybCA9PSBcIi9kb2N1bWVudHNcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9EYXNoYm9hcmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub0Rhc2hib2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChldmVudC51cmwgPT0gXCIvZGFzaGJvYXJkXCIgfHwgZXZlbnQudXJsID09IFwiL1wiIHx8IGV2ZW50LnVybCA9PSBcIi9sb2dpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVBQIGV4aXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdEZyb21BcHAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdEZyb21BcHAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGl0RnJvbUFwcCkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbG9zZSB0aGUgYXBwP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtKG9wdGlvbnMpLnRoZW4oKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZHJvaWQub3MuUHJvY2Vzcy5raWxsUHJvY2VzcyhhbmRyb2lkLm9zLlByb2Nlc3MubXlQaWQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHkuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0b3BCYWNrQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nb1RvRGFzaGJvYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGdvIGJhY2sgdG8gZGFzaGJvYXJkIHNjcmVlbj9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybShvcHRpb25zKS50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvY2Fsc3RvcmFnZSBjbGVhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFmdGVyQWNjb3VudENyZWF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kYXNoYm9hcmRcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGxldCBwYWNrYWdlTWFuYWdlciA9IGFwcC5hbmRyb2lkLmNvbnRleHQuZ2V0UGFja2FnZU1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwVmVyc2lvbiA9IHBhY2thZ2VNYW5hZ2VyLmdldFBhY2thZ2VJbmZvKGFwcC5hbmRyb2lkLmNvbnRleHQuZ2V0UGFja2FnZU5hbWUoKSwgMCkudmVyc2lvbk5hbWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGl2aXR5ID0gYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eTtcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvdyA9IGFjdGl2aXR5LmdldFdpbmRvdygpO1xuICAgICAgICAgICAgYWN0aXZpdHkuc2V0UmVxdWVzdGVkT3JpZW50YXRpb24oYW5kcm9pZC5jb250ZW50LnBtLkFjdGl2aXR5SW5mby5TQ1JFRU5fT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlckRldCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJPYmonKSk7XG4gICAgICAgIGlmICh0aGlzLnVzZXJEZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiZGFzaGJvYXJkXCJdKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnZGFzaGJvYXJkJ10sbGlhYmxpdGllcyxvZmZlcl9kZXRhaWxzLHByb2R1Y3RzZWxlY3Rpb24sL2t5Y2RldGFpbHMvcHJvZHVjdCxwcm9kdWN0dHlwZSxjcnMsXG4gICAgICAgICAgICAvL2t5Y2RldGFpbHMvY3JzLGt5Y2RldGFpbHMvcHJvZHVjdCxwcm9kdWN0Y29uZmlnLHBlcnNvbmFsZGV0YWlscy9wZXJzb25hbGRldGFpbHMtZXh0cmEsY3VzdG9tZXItb3RwLFxuICAgICAgICAgICAgLy9wZXJzb25hbGRldGFpbHMtZXh0cmEsYWNjLWluZm8scHJvZHVjdCxkb2N1bWVudHMscHJvZHVjdCxmYXRjYSxjdXN0b21lcmFkZHJlc3Msa3ljZGV0YWlsc3tcbiAgICAgICAgICAgIC8vICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxhdGZvcm0uaXNJT1MgJiYgYXBwLmlvcy53aW5kb3cuc2FmZUFyZWFJbnNldHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcFNhZmVBcmVhOiBudW1iZXIgPSBhcHAuaW9zLndpbmRvdy5zYWZlQXJlYUluc2V0cy50b3A7XG4gICAgICAgICAgICBjb25zdCBib3R0b21TYWZlQXJlYTogbnVtYmVyID0gYXBwLmlvcy53aW5kb3cuc2FmZUFyZWFJbnNldHMuYm90dG9tO1xuICAgICAgICAgICAgaWYgKHRvcFNhZmVBcmVhID4gMCkge1xuICAgICAgICAgICAgICAgIGFwcC5hZGRDc3MoYC5uYXZiYXIgeyBwYWRkaW5nLXRvcDogJHt0b3BTYWZlQXJlYX07IH1gKTtcbiAgICAgICAgICAgICAgICBhcHAuYWRkQ3NzKGAucGFnZSB7IG1hcmdpbi10b3AgOiAtJHt0b3BTYWZlQXJlYX07ICBtYXJnaW4tYm90dG9tIDogLSR7Ym90dG9tU2FmZUFyZWF9OyB9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gdGhpcy5jb25uZWN0aW9uTWFkZShDb25uZWN0aXZpdHkuZ2V0Q29ubmVjdGlvblR5cGUoKSk7XG4gICAgICAgIENvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoY29ubmVjdGlvblR5cGUgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IHRoaXMuY29ubmVjdGlvbk1hZGUoY29ubmVjdGlvblR5cGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgZmlyZWJhc2UuaW5pdCh7XG4gICAgICAgICAgICBpT1NFbXVsYXRvckZsdXNoOiB0cnVlLFxuICAgICAgICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGl0bGU6ICR7bWVzc2FnZS50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQm9keTogJHttZXNzYWdlLmJvZHl9YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFZhbHVlIG9mICdmb28nOiAke21lc3NhZ2UuZGF0YS5mb299YCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25QdXNoVG9rZW5SZWNlaXZlZENhbGxiYWNrOiAodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaXJlYmFzZVRva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDdXJyZW50UHVzaFRva2VuOiAodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBwdXNoIHRva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgaW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBkb25lXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZmlyZWJhc2UuaW5pdCBlcnJvcjogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29ubmVjdGlvbk1hZGUoY29ubmVjdGlvblR5cGU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoY29ubmVjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5vIEludGVybmV0IENvbm5lY3Rpb24hXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTm8gQ29ubmVjdGlvbiFcIjtcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQ29ubmVjdGVkIHRvIFdpRmkhXCI7XG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQ29ubmVjdGVkIHRvIE1vYmlsZSBOZXR3b3JrIVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmtub3duXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=