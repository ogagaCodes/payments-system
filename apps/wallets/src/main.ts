import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WalletsModule } from './wallets.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletsModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
  .setTitle('Wallets Action Api')
  .setDescription('This is a playground for testimng the wallets endpoints')
  .setVersion('1.0')
  .addTag('wallets')
  .build();
  console.log("PORT   :", configService.get('PORT'))
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3010);
}
bootstrap();
