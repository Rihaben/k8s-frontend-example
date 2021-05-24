import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@k8s/environment';

export const translateNotFoundMessage = 'translation-not-found';

export class MissingTranslationImpl implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams): string {
		const key = params.key;
		return `${translateNotFoundMessage}[${key}]`;
	}
}

export function translatePartialLoader(http: HttpClient): TranslateLoader {
	return new TranslateHttpLoader(http, 'i18n/', `.json?buildTimestamp=${environment.BUILD_TIMESTAMP ?? ''}`);
}

export function missingTranslationHandler(): MissingTranslationHandler {
	return new MissingTranslationImpl();
}
