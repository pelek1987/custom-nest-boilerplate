import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';

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
  providers: [],
})
export class AppModule {}
