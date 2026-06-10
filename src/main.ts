import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Couch Club API')
    .setDescription('API documentation for Couch Club')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
    
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(3000, '127.0.0.1');
}
bootstrap();