import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ApplicationConfig {
	private endPointPrefix = '';

	setEndPointPrefix(endPointPrefix: string): void {
		this.endPointPrefix = endPointPrefix;
	}

	getEndPointPrefix(api: string, microservice?: string): string {
		if (microservice) {
			return `${this.endPointPrefix}services/${microservice}/${api}`;
		}
		return `${this.endPointPrefix}${api}`;
	}
}
