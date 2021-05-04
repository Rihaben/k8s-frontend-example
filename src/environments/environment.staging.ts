export const environment = {
	production: true,
	BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP,
	PROFILE: (window as any)['config']['profile'] || 'Staging',
	BASE_API_URL: (window as any)['config']['base_api_url'] || 'http://192.168.2.228:8080'
};
