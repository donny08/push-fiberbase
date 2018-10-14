"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var appversion = require("nativescript-appversion");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
require("nativescript-localstorage");
var CryptoJS = require("crypto-js");
var user_model_1 = require("../services/user.model");
var index_1 = require("../services/index");
var nativescript_mixpanel_1 = require("nativescript-mixpanel");
var dialogs = require("ui/dialogs");
var router_2 = require("nativescript-angular/router");
var messaging_1 = require("nativescript-plugin-firebase/messaging");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(dataService, page, routerExtensions, userService, router, toast) {
        this.dataService = dataService;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.router = router;
        this.toast = toast;
        this.isLoggingIn = true;
        this.otpFlag = false;
        this.userDet = {};
        this.personal_det = {};
        this.page.actionBarHidden = true;
        this.user = new user_model_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userDet = JSON.parse(localStorage.getItem('userObj'));
        appversion.getVersionName().then(function (v) {
            console.log("Your app's version is: " + v);
            _this.appVersion = v;
        });
        console.log("Notifications enabled? " + messaging_1.messaging.areNotificationsEnabled());
        /*  messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: (token: string): void => {
                    console.log("Firebase plugin received a push token: " + token);
                    if (token) {
                        localStorage.setItem('firebaseToken', token);
                    }
                },
    
                onMessageReceivedCallback: (message: Message) => {
                    console.log("Push message received: " + JSON.stringify(message));
                },
    
                // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
                showNotifications: true,
    
                // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
                showNotificationsWhenInForeground: true
            }).then(() => console.log("Registered for push"));
    
            messaging.getCurrentPushToken().then(function(token){
                console.log(`Current push token: ${token}`)
                if (token) {
                    localStorage.setItem('firebaseToken', token);
                }
            });*/
        if (this.userDet != null) {
            this.router.navigate(["/dashboard"]);
        }
    };
    LoginComponent.prototype.toggleForm = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.scroll_bottom = function () {
        var _this = this;
        setTimeout(function () {
            var offset = _this.ScrollLogin.nativeElement.scrollableHeight;
            // console.log(offset)
            _this.ScrollLogin.nativeElement.scrollToVerticalOffset(offset, false);
        }, 100);
    };
    LoginComponent.prototype.resendOTP = function (args) {
        console.log("Resend OTP", this.user);
    };
    LoginComponent.prototype.submit = function () {
        if (!this.user.email || !this.user.password) {
            this.toast.show("Please provide both username and password.");
            return;
        }
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            //this.register();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.submitted = true;
        this.key = CryptoJS.enc.Utf8.parse('8080808080808080');
        this.iv = CryptoJS.enc.Utf8.parse('8080808080808080');
        this.encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.user.password), this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var x = this.encryptedpassword.toString();
        x = x.replace("+", "))");
        x = x.replace("/", "((((");
        this.userService.userLogin(this.user.email, x, this.appVersion)
            .subscribe(function (data) {
            _this.submitted = false;
            if (data.success == "true") {
                _this.otpFlag = true;
                _this.userDet = data;
                _this.empid = data.empid;
                nativescript_mixpanel_1.MixpanelHelper.track("Login Page", { "status": "logged in", "username": _this.user.email.toLowerCase() });
            }
            else {
                _this.dataService.handleErrorRes(data.message);
                _this.user.password = '';
                nativescript_mixpanel_1.MixpanelHelper.track("Login Page", { "status": "login failed", "username": _this.user.email.toLowerCase(), "message": data.message });
            }
        }, function (error) {
            _this.dataService.handleErrorRes(error);
        });
    };
    LoginComponent.prototype.autoVerifyOTP = function (otp) {
        if (otp.length == 6) {
            this.verifyOTP(otp);
        }
    };
    LoginComponent.prototype.verifyOTP = function (otp) {
        var _this = this;
        if (!otp || otp.length < 6) {
            this.toast.show("Please Enter a Valid OTP");
            return;
        }
        this.submitted = true;
        this.userService.userOTPVerify(this.user.email, this.empid, otp)
            .subscribe(function (data) {
            if (data == false) {
                nativescript_mixpanel_1.MixpanelHelper.track("OTP Page", { "status": "failed", "message": "Role empty" });
                dialogs.alert({
                    title: "",
                    message: data.message || "Please Enter Valid OTP",
                    okButtonText: "OK"
                }).then(function () {
                    console.log("Dialog closed!");
                    // this.otpFlag = false;
                    _this.user.otp = "";
                    _this.router.navigate(["/login"]);
                    return false;
                });
                // this.toast.show("Role is not assigned");
            }
            else if (data.success == "true") {
                nativescript_mixpanel_1.MixpanelHelper.track("OTP Page", { "status": "success", "username": _this.user.email });
                _this.routerExtensions.navigate(["/dashboard"], {
                    clearHistory: true
                });
                // this.router.navigate(["/dashboard"]);
            }
            else {
                nativescript_mixpanel_1.MixpanelHelper.track("OTP Page", { "status": "failed", "message": data.message, "username": _this.user.email });
                _this.dataService.handleErrorRes(data.message);
            }
        }, function (error) {
            _this.dataService.handleErrorRes(error);
        });
    };
    LoginComponent.prototype.focusPassword = function () {
        this.password.nativeElement.focus();
    };
    __decorate([
        core_1.ViewChild("password"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "password", void 0);
    __decorate([
        core_1.ViewChild("confirmPassword"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "confirmPassword", void 0);
    __decorate([
        core_1.ViewChild("ScrollLogin"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "ScrollLogin", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [index_1.DataService, page_1.Page, router_2.RouterExtensions, index_1.UserService, router_1.Router, index_1.toastService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLG9EQUFzRDtBQUN0RCwwQ0FBeUM7QUFDekMsaURBQWdEO0FBQ2hELHFDQUFtQztBQUNuQyxvQ0FBc0M7QUFDdEMscURBQThDO0FBQzlDLDJDQUEyRTtBQUMzRSwrREFBdUQ7QUFHdkQsb0NBQXNDO0FBQ3RDLHNEQUErRDtBQUUvRCxvRUFBNEU7QUFTNUU7SUFtQkksd0JBQW9CLFdBQXdCLEVBQVUsSUFBVSxFQUFVLGdCQUFrQyxFQUFVLFdBQXdCLEVBQVUsTUFBYyxFQUFVLEtBQW1CO1FBQS9LLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBZm5NLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBS25CLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQVFuQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQXVDQztRQXJDRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTNELFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTO1lBQ3ZDLE9BQU8sQ0FBQyxH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LGlCQUFpQixDQUFDO2tDQUFrQixpQkFBVTsyREFBQztJQUNoQztRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBYyxpQkFBVTt1REFBQztJQWpCekMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDdkMsQ0FBQzt5Q0FxQm1DLG1CQUFXLEVBQWdCLFdBQUksRUFBNEIseUJBQWdCLEVBQXVCLG1CQUFXLEVBQWtCLGVBQU0sRUFBaUIsb0JBQVk7T0FuQjFMLGNBQWMsQ0EyTDFCO0lBQUQscUJBQUM7Q0FBQSxBQTNMRCxJQTJMQztBQTNMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwdmVyc2lvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0ICogYXMgQ3J5cHRvSlMgZnJvbSAnY3J5cHRvLWpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlLCBEYXRhU2VydmljZSwgdG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHsgTWl4cGFuZWxIZWxwZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1peHBhbmVsXCI7XG5pbXBvcnQgeyBEZXZpY2VUeXBlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IG1lc3NhZ2luZywgTWVzc2FnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21lc3NhZ2luZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJhcHAtbG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvL3B1YmxpYyBpc0J1c3kgPSBmYWxzZTtcbiAgICBzdWJtaXR0ZWQ6IGJvb2xlYW47XG4gICAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuICAgIHVzZXI6IFVzZXI7XG4gICAgZW1waWQ6IHN0cmluZztcbiAgICBrZXk6IHN0cmluZztcbiAgICBpdjogc3RyaW5nO1xuICAgIG90cEZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBlbmNyeXB0ZWRwYXNzd29yZDogYW55O1xuICAgIHVzZXJEZXQ6IGFueSA9IHt9O1xuICAgIHBlcnNvbmFsX2RldDogYW55ID0ge307XG4gICAgYXBwVmVyc2lvbjogYW55O1xuXG4gICAgQFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJjb25maXJtUGFzc3dvcmRcIikgY29uZmlybVBhc3N3b3JkOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJTY3JvbGxMb2dpblwiKSBTY3JvbGxMb2dpbjogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdG9hc3Q6IHRvYXN0U2VydmljZSkge1xuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnVzZXJEZXQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyT2JqJykpO1xuXG4gICAgICAgIGFwcHZlcnNpb24uZ2V0VmVyc2lvbk5hbWUoKS50aGVuKCh2OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91ciBhcHAncyB2ZXJzaW9uIGlzOiBcIiArIHYpO1xuICAgICAgICAgICAgdGhpcy5hcHBWZXJzaW9uID0gdjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBOb3RpZmljYXRpb25zIGVuYWJsZWQ/ICR7bWVzc2FnaW5nLmFyZU5vdGlmaWNhdGlvbnNFbmFibGVkKCl9YCk7XG5cbiAgICAvKiAgbWVzc2FnaW5nLnJlZ2lzdGVyRm9yUHVzaE5vdGlmaWNhdGlvbnMoe1xuICAgICAgICAgICAgb25QdXNoVG9rZW5SZWNlaXZlZENhbGxiYWNrOiAodG9rZW46IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgcGx1Z2luIHJlY2VpdmVkIGEgcHVzaCB0b2tlbjogXCIgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaXJlYmFzZVRva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2s6IChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQdXNoIG1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gV2hldGhlciB5b3Ugd2FudCB0aGlzIHBsdWdpbiB0byBhdXRvbWF0aWNhbGx5IGRpc3BsYXkgdGhlIG5vdGlmaWNhdGlvbnMgb3IganVzdCBub3RpZnkgdGhlIGNhbGxiYWNrLiBDdXJyZW50bHkgdXNlZCBvbiBpT1Mgb25seS4gRGVmYXVsdCB0cnVlLlxuICAgICAgICAgICAgc2hvd05vdGlmaWNhdGlvbnM6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIFdoZXRoZXIgeW91IHdhbnQgdGhpcyBwbHVnaW4gdG8gYWx3YXlzIGhhbmRsZSB0aGUgbm90aWZpY2F0aW9ucyB3aGVuIHRoZSBhcHAgaXMgaW4gZm9yZWdyb3VuZC4gQ3VycmVudGx5IHVzZWQgb24gaU9TIG9ubHkuIERlZmF1bHQgZmFsc2UuXG4gICAgICAgICAgICBzaG93Tm90aWZpY2F0aW9uc1doZW5JbkZvcmVncm91bmQ6IHRydWVcbiAgICAgICAgfSkudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgZm9yIHB1c2hcIikpO1xuXG4gICAgICAgIG1lc3NhZ2luZy5nZXRDdXJyZW50UHVzaFRva2VuKCkudGhlbihmdW5jdGlvbih0b2tlbil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBwdXNoIHRva2VuOiAke3Rva2VufWApXG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmlyZWJhc2VUb2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ki9cblxuICAgICAgICBpZiAodGhpcy51c2VyRGV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kYXNoYm9hcmRcIl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRm9ybSgpIHtcbiAgICAgICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIH1cblxuICAgIHNjcm9sbF9ib3R0b20oKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5TY3JvbGxMb2dpbi5uYXRpdmVFbGVtZW50LnNjcm9sbGFibGVIZWlnaHQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvZmZzZXQpXG4gICAgICAgICAgICB0aGlzLlNjcm9sbExvZ2luLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChvZmZzZXQsIGZhbHNlKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIHJlc2VuZE9UUChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNlbmQgT1RQXCIsdGhpcy51c2VyKTtcbiAgICB9XG5cbiAgICBzdWJtaXQoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuZW1haWwgfHwgIXRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgICAgICAgdGhpcy50b2FzdC5zaG93KFwiUGxlYXNlIHByb3ZpZGUgYm90aCB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMb2dnaW5nSW4pIHtcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG5cbiAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKCc4MDgwODA4MDgwODA4MDgwJyk7XG4gICAgICAgIHRoaXMuaXYgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSgnODA4MDgwODA4MDgwODA4MCcpO1xuICAgICAgICB0aGlzLmVuY3J5cHRlZHBhc3N3b3JkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodGhpcy51c2VyLnBhc3N3b3JkKSwgdGhpcy5rZXksIHtcbiAgICAgICAgICAgIGtleVNpemU6IDEyOCAvIDhcbiAgICAgICAgICAgICwgaXY6IHRoaXMuaXZcbiAgICAgICAgICAgICwgbW9kZTogQ3J5cHRvSlMubW9kZS5DQkNcbiAgICAgICAgICAgICwgcGFkZGluZzogQ3J5cHRvSlMucGFkLlBrY3M3XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgeCA9IHRoaXMuZW5jcnlwdGVkcGFzc3dvcmQudG9TdHJpbmcoKTtcbiAgICAgICAgeCA9IHgucmVwbGFjZShcIitcIiwgXCIpKVwiKTtcbiAgICAgICAgeCA9IHgucmVwbGFjZShcIi9cIiwgXCIoKCgoXCIpXG5cbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyTG9naW4odGhpcy51c2VyLmVtYWlsLCB4LCB0aGlzLmFwcFZlcnNpb24pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3RwRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJEZXQgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXBpZCA9IGRhdGEuZW1waWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBNaXhwYW5lbEhlbHBlci50cmFjayhcIkxvZ2luIFBhZ2VcIiwgeyBcInN0YXR1c1wiOiBcImxvZ2dlZCBpblwiLCBcInVzZXJuYW1lXCI6IHRoaXMudXNlci5lbWFpbC50b0xvd2VyQ2FzZSgpIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yUmVzKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIE1peHBhbmVsSGVscGVyLnRyYWNrKFwiTG9naW4gUGFnZVwiLCB7IFwic3RhdHVzXCI6IFwibG9naW4gZmFpbGVkXCIsIFwidXNlcm5hbWVcIjogdGhpcy51c2VyLmVtYWlsLnRvTG93ZXJDYXNlKCksIFwibWVzc2FnZVwiOiBkYXRhLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yUmVzKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhdXRvVmVyaWZ5T1RQKG90cCkge1xuXG4gICAgICAgIGlmIChvdHAubGVuZ3RoID09IDYpIHtcblxuICAgICAgICAgICAgdGhpcy52ZXJpZnlPVFAob3RwKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmVyaWZ5T1RQKG90cCkge1xuXG4gICAgICAgIGlmICghb3RwIHx8IG90cC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0LnNob3coXCJQbGVhc2UgRW50ZXIgYSBWYWxpZCBPVFBcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXJPVFBWZXJpZnkodGhpcy51c2VyLmVtYWlsLCB0aGlzLmVtcGlkLCBvdHApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTWl4cGFuZWxIZWxwZXIudHJhY2soXCJPVFAgUGFnZVwiLCB7IFwic3RhdHVzXCI6IFwiZmFpbGVkXCIsIFwibWVzc2FnZVwiOiBcIlJvbGUgZW1wdHlcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSB8fCBcIlBsZWFzZSBFbnRlciBWYWxpZCBPVFBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm90cEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIub3RwID0gXCJcIjsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudG9hc3Quc2hvdyhcIlJvbGUgaXMgbm90IGFzc2lnbmVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdWNjZXNzID09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNaXhwYW5lbEhlbHBlci50cmFjayhcIk9UUCBQYWdlXCIsIHsgXCJzdGF0dXNcIjogXCJzdWNjZXNzXCIsIFwidXNlcm5hbWVcIjogdGhpcy51c2VyLmVtYWlsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9kYXNoYm9hcmRcIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Rhc2hib2FyZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNaXhwYW5lbEhlbHBlci50cmFjayhcIk9UUCBQYWdlXCIsIHsgXCJzdGF0dXNcIjogXCJmYWlsZWRcIiwgXCJtZXNzYWdlXCI6IGRhdGEubWVzc2FnZSwgXCJ1c2VybmFtZVwiOiB0aGlzLnVzZXIuZW1haWwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmhhbmRsZUVycm9yUmVzKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5oYW5kbGVFcnJvclJlcyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9jdXNQYXNzd29yZCgpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG59XG4iXX0=