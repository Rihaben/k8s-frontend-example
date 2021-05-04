import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const config: ExtraOptions = {
	useHash: true,
	scrollPositionRestoration: 'top',
	onSameUrlNavigation: 'reload',
	anchorScrolling: 'enabled',
	enableTracing: process.env.NODE_ENV === 'development'
};

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
