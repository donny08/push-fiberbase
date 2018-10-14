import { Component, OnInit, NgZone, AfterViewInit } from "@angular/core";
import * as platform from "tns-core-modules/platform"
import * as app from 'tns-core-modules/application';
import { Router, NavigationEnd } from '@angular/router';
import * as elementRegistryModule from 'nativescript-angular/element-registry';
declare const android: any;
elementRegistryModule.registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);
elementRegistryModule.registerElement("Gradient", () => require("nativescript-gradient").Gradient);
import * as dialogs from "ui/dialogs";
import * as Connectivity from "tns-core-modules/connectivity";
import { DataService } from './services/index';
import { confirm } from "ui/dialogs";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";
const firebase = require("nativescript-plugin-firebase");
//require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent implements OnInit, AfterViewInit {
    userDet: any;
    appVersion: any;
    screenInformation: any;
    public connectionType: string;
    exitFromApp = false;
    goToDashboard = false;
    stopBackButton = false;

    constructor(private router: Router, private zone: NgZone, private dataService: DataService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log("current url", event);
                // if (event.url == "/lead/customertype" || event.url.match(/leaddata/g)) {
                if (event.url == "/customertype" || event.url.match(/leaddata/g)) {
                    console.log("localstorage clear");
                    this.dataService.afterAccountCreate();
                }

                if (event.url == "/productconfig") {
                    this.stopBackButton = true;
                } else {
                    this.stopBackButton = false;
                }

                // if (event.url == "/kycdetails/documents") {
                if (event.url == "/documents") {
                    this.goToDashboard = true;
                } else {
                    this.goToDashboard = false;
                }

                if (event.url == "/dashboard" || event.url == "/" || event.url == "/login") {
                    console.log("APP exit");
                    this.exitFromApp = true;
                } else {
                    this.exitFromApp = false;
                }
            }
        });

        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, (args: any) => {
                if (this.exitFromApp) {
                    args.cancel = true;
                    let options = {
                        title: "",
                        message: "Are you sure you want to close the app?",
                        okButtonText: "Yes",
                        cancelButtonText: "No",
                        neutralButtonText: "Cancel"
                    };

                    confirm(options).then((result: boolean) => {
                        if (result) {
                            android.os.Process.killProcess(android.os.Process.myPid());
                            // application.android.foregroundActivity.finish();
                        }
                    });
                }

                if (this.stopBackButton) {
                    args.cancel = true;
                }

                if (this.goToDashboard) {
                    args.cancel = true;
                    let options = {
                        title: "",
                        message: "Are you sure you want to go back to dashboard screen?",
                        okButtonText: "Yes",
                        cancelButtonText: "No",
                        neutralButtonText: "Cancel"
                    };

                    confirm(options).then((result: boolean) => {
                        if (result) {
                            console.log("localstorage clear");
                            this.dataService.afterAccountCreate();
                            this.router.navigate(["/dashboard"]);
                        }
                    });
                }
            });
        }
    }

    ngOnInit(): void {

        messaging.registerForPushNotifications({
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
        });
        
        if (app.android) {
            let packageManager = app.android.context.getPackageManager();
            this.appVersion = packageManager.getPackageInfo(app.android.context.getPackageName(), 0).versionName;

            const activity = app.android.startActivity;
            const window = activity.getWindow();
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
            const topSafeArea: number = app.ios.window.safeAreaInsets.top;
            const bottomSafeArea: number = app.ios.window.safeAreaInsets.bottom;
            if (topSafeArea > 0) {
                app.addCss(`.navbar { padding-top: ${topSafeArea}; }`);
                app.addCss(`.page { margin-top : -${topSafeArea};  margin-bottom : -${bottomSafeArea}; }`);
            }
        }

        this.connectionType = this.connectionMade(Connectivity.getConnectionType());
        Connectivity.startMonitoring(connectionType => {
            this.zone.run(() => {
                this.connectionType = this.connectionMade(connectionType);
            });
        });
    }

    ngAfterViewInit() {
        // firebase.init({
        //     iOSEmulatorFlush: true,
        //     onMessageReceivedCallback: (message: Message) => {
        //         console.log(`Title: ${message.title}`);
        //         console.log(`Body: ${message.body}`);
        //         console.log(`Value of 'foo': ${message.data.foo}`);
        //     },
        //     onPushTokenReceivedCallback: (token) => {
        //         console.log('token', token);
        //         if (token) {
        //             localStorage.setItem('firebaseToken', token);
        //         }
        //     },
        //     getCurrentPushToken: (token) => {
        //         console.log('Current push token', token);
        //     }
        // }).then(
        //     instance => {
        //         console.log("firebase.init done");
        //     },
        //     error => {
        //         console.log(`firebase.init error: ${error}`);
        //     }
        // );
    }

    public connectionMade(connectionType: number): string {
        switch (connectionType) {
            case Connectivity.connectionType.none:
                dialogs.alert({
                    title: "",
                    message: "No Internet Connection!",
                    okButtonText: "OK"
                }).then(() => {
                });
                return "No Connection!";
            case Connectivity.connectionType.wifi:
                return "Connected to WiFi!";
            case Connectivity.connectionType.mobile:
                return "Connected to Mobile Network!";
            default:
                return "Unknown";
        }
    }

}