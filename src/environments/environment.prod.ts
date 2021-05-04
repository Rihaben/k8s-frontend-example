export const environment = {
	production: true,
	BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP,
	PROFILE: (window as any)['config']['profile'] || 'Production',
	BASE_API_URL: (window as any)['config']['base_api_url'] || 'http://api-service-domain:8080'
};
