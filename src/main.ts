import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@k8s/app.module';
import { environment } from '@k8s/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule, { preserveWhitespaces: true })
	.then(() => console.log('Application Started !'))
	.catch((err) => console.error(err));
