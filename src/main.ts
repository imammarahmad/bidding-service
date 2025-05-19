import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('PayNest Real-Time Bidding API')
    .setDescription('The PayNest Real-Time Bidding System API documentation')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('items', 'Item management endpoints')
    .addTag('bids', 'Bidding management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app
    .listen(process.env.PORT ?? 3000)
    .then(() => {
      Logger.log(`Listening at port ${process.env.PORT}`);
    })
    .catch((error: any) => Logger.error(error));
}
bootstrap();
