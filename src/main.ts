import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

function setupDocs(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest.js Workshop example')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupDocs(app)

  await app.listen(3000);
}
bootstrap();
