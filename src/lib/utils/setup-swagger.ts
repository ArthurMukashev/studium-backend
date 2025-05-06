import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppRoutingModule, AdminRoutingModule, ClientRoutingModule, ServiceRoutingModule } from '@/modules';

export function setupSwagger(app: INestApplication) {
	const BASE_DOC_URL = 'docs';

	const docUrls = [
		{
			name: 'App',
			doc: BASE_DOC_URL,
			router: AppRoutingModule,
		},
		{
			name: 'Admin',
			doc: BASE_DOC_URL + '/admin',
			router: AdminRoutingModule,
		},
		{
			name: 'Client',
			doc: BASE_DOC_URL + '/client',
			router: ClientRoutingModule,
		},
		{
			name: 'Service',
			doc: BASE_DOC_URL + '/service',
			router: ServiceRoutingModule,
		},
	];

	const customOptions: SwaggerCustomOptions = {
		explorer: true,
		swaggerOptions: {
			urls: docUrls.flatMap((docUrl) => ({ url: '/' + docUrl.doc + '-json', name: docUrl.name })),
		},
	};

	for (const docUrl of docUrls) {
		const config = new DocumentBuilder().setTitle(`${docUrl.name} API`).build();
		const documentOptions: SwaggerDocumentOptions = {
			deepScanRoutes: true,
			include: [docUrl.router],
		};
		const documentFactory = () => SwaggerModule.createDocument(app, config, documentOptions);
		SwaggerModule.setup(docUrl.doc, app, documentFactory, customOptions);
	}
}
