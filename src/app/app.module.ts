import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from '@k8s/app-routing.module';
import { AppComponent } from '@k8s/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@k8s/environment';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { missingTranslationHandler, translatePartialLoader } from '@k8s/config/translation.config';
import { ApplicationConfig } from '@k8s/config/application.config';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: translatePartialLoader,
				deps: [HttpClient]
			},
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useFactory: missingTranslationHandler
			}
		})
	],
	providers: [
		Title,
		DatePipe,
		{
			provide: LOCALE_ID,
			useValue: 'en'
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(applicationConfig: ApplicationConfig, translateService: TranslateService) {
		applicationConfig.setEndPointPrefix(environment.BASE_API_URL);
		registerLocaleData(locale);
		translateService.setDefaultLang('en');
		translateService.use('en');
	}
}
