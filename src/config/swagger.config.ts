import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void{
    const options = new DocumentBuilder()
        .setTitle('상품API')
        .setDescription('Nest.js 개발 실습 상품 관리 API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document);    
}