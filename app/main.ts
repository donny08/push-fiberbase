// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { enableProdMode } from '@angular/core';
import { AppModule } from "./app.module";
import { MixpanelHelper } from "nativescript-mixpanel";

enableProdMode();
MixpanelHelper.init("2134aa53f2956f26d08902497f87ab08");

platformNativeScriptDynamic().bootstrapModule(AppModule);
