import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { CustomLoggerService } from './services/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useLogger(new CustomLoggerService());

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
