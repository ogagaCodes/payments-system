import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Payments Api')
  .setDescription('This is a playground for testimng the wallets[paymnmets] endpoints')
  .setVersion('1.0')
  .addTag('payments')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
await app.listen(3003);
}
bootstrap();
