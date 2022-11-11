import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('IONIX')
    .setDescription('The Ionix API application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
