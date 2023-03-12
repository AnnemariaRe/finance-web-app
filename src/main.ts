import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ResponseTimeInterceptor } from './response-time.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import hbs = require('hbs');
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const config = new DocumentBuilder()
    .setTitle('WalletKeeper Web App')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('account')
    .addTag('transaction')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaService = app.get(PrismaService);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  app.useGlobalInterceptors(new ResponseTimeInterceptor());


  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
