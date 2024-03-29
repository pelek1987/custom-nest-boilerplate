import * as path from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER } from '@nestjs/core';
import { AllErrorsFilter } from './errors/all-errors.filter';
import { LanguageExtractorMiddleware } from './middlewares/language-extractor.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: path.resolve(__dirname, 'pino-pretty.config.js'),
        },
        level: 'debug',
        useLevel: 'debug',
        quietReqLogger: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllErrorsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageExtractorMiddleware).forRoutes('*');
  }
}
