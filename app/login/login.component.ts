import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import * as appversion from "nativescript-appversion";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import 'nativescript-localstorage';
import * as CryptoJS from 'crypto-js';
import { User } from '../services/user.model';
import { UserService, DataService, toastService } from '../services/index';
import { MixpanelHelper } from "nativescript-mixpanel";
import { DeviceType } from "ui/enums";
import { device } from "platform";
import * as dialogs from "ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    //public isBusy = false;
    submitted: boolean;
    isLoggingIn = true;
    user: User;
    empid: string;
    key: string;
    iv: string;
    otpFlag: boolean = false;
    encryptedpassword: any;
    userDet: any = {};
    personal_det: any = {};
    appVersion: any;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;
    @ViewChild("ScrollLogin") ScrollLogin: ElementRef;

    constructor(private dataService: DataService, private page: Page, private routerExtensions: RouterExtensions, private userService: UserService, private router: Router, private toast: toastService) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    ngOnInit(): void {

        this.userDet = JSON.parse(localStorage.getItem('userObj'));

        appversion.getVersionName().then((v: string) => {
            console.log("Your app's version is: " + v);
            this.appVersion = v;
        });
        console.log(`Notifications enabled? ${messaging.areNotificationsEnabled()}`);

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
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    scroll_bottom(){
        setTimeout(() => {
            let offset = this.ScrollLogin.nativeElement.scrollableHeight;
            // console.log(offset)
            this.ScrollLogin.nativeElement.scrollToVerticalOffset(offset, false);
          }, 100);
    }

    resendOTP(args: GestureEventData){
        console.log("Resend OTP",this.user);
    }

    submit() {

        if (!this.user.email || !this.user.password) {
            this.toast.show("Please provide both username and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            //this.register();
        }
    }

    login() {

        this.submitted = true;
        this.key = CryptoJS.enc.Utf8.parse('8080808080808080');
        this.iv = CryptoJS.enc.Utf8.parse('8080808080808080');
        this.encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.user.password), this.key, {
            keySize: 128 / 8
            , iv: this.iv
            , mode: CryptoJS.mode.CBC
            , padding: CryptoJS.pad.Pkcs7
        });
        let x = this.encryptedpassword.toString();
        x = x.replace("+", "))");
        x = x.replace("/", "((((")

        this.userService.userLogin(this.user.email, x, this.appVersion)
            .subscribe(
                data => {
                    this.submitted = false;

                    if (data.success == "true") {
                        this.otpFlag = true;
                        this.userDet = data;
                        this.empid = data.empid;
                        MixpanelHelper.track("Login Page", { "status": "logged in", "username": this.user.email.toLowerCase() });

                    } else {
                        this.dataService.handleErrorRes(data.message);
                        this.user.password = '';
                        MixpanelHelper.track("Login Page", { "status": "login failed", "username": this.user.email.toLowerCase(), "message": data.message });
                    }

                },
                error => {
                    this.dataService.handleErrorRes(error);
                });
    }

    autoVerifyOTP(otp) {

        if (otp.length == 6) {

            this.verifyOTP(otp);

        }
    }

    verifyOTP(otp) {

        if (!otp || otp.length < 6) {
            this.toast.show("Please Enter a Valid OTP");
            return;
        }
        this.submitted = true;
        this.userService.userOTPVerify(this.user.email, this.empid, otp)
            .subscribe(
                data => {
                    if (data == false) {
                        MixpanelHelper.track("OTP Page", { "status": "failed", "message": "Role empty" });
                        dialogs.alert({
                            title: "",
                            message: data.message || "Please Enter Valid OTP",
                            okButtonText: "OK"
                        }).then(() => {
                            console.log("Dialog closed!");
                            // this.otpFlag = false;
                            this.user.otp = ""; 
                            this.router.navigate(["/login"]);
                            return false;
                        });
                        // this.toast.show("Role is not assigned");

                    } else if (data.success == "true") {
                        MixpanelHelper.track("OTP Page", { "status": "success", "username": this.user.email });
                        this.routerExtensions.navigate(["/dashboard"], {
                            clearHistory: true
                        });
                        // this.router.navigate(["/dashboard"]);
                    } else {
                        MixpanelHelper.track("OTP Page", { "status": "failed", "message": data.message, "username": this.user.email });
                        this.dataService.handleErrorRes(data.message);
                    }
                },
                error => {
                    this.dataService.handleErrorRes(error);
                });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

}
