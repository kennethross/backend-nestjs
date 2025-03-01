import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log'],
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setVersion('1.0')
    .setContact('k5h-r2s', '', 'k5hr2s@gmail.com')
    .addCookieAuth(
      'access_token',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.register(fastifyCookie);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
