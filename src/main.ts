// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 使用 body-parser 中间件解析 JSON 请求体
  app.useGlobalPipes(new ValidationPipe({
    // email pass id, id will not be here  --> stripe out 
    whitelist: true,
  }));
  app.use(bodyParser.json());
  
  await app.listen(3000);
}
bootstrap();

