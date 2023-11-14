import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const  PORT = process.env.PORT || 7000
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  const config = new DocumentBuilder()                  // документация api
.setTitle('Учебный курс')
.setDescription('Учимся работать с nestjs и postgress')
.setVersion('1.0')
.addTag('relative')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => {console.log(`Connect to serwer = ${PORT}`)});
}
bootstrap();
