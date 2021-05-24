import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { title } from '@k8s/utils';
import { environment } from '@k8s/environment';

@Component({
	selector: 'k8s-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	buildTimestamp: Date | undefined;
	buildProfile: string | undefined;
	baseApiUrl: string | undefined;

	constructor(private titleService: Title, private swUpdate: SwUpdate) {
		this.titleService.setTitle(title());
	}

	ngOnInit(): void {
		if (environment.BUILD_TIMESTAMP !== undefined) {
			this.buildTimestamp = new Date(Number(environment.BUILD_TIMESTAMP));
		}
		this.buildProfile = environment.PROFILE;
		this.baseApiUrl = environment.BASE_API_URL;

		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				console.log('New Version Available !');
				window.location.reload();
			});
		}
	}
}
