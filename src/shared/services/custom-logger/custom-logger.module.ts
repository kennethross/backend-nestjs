import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

declare module 'http' {
  interface IncomingMessage {
    requestId: string;
  }
}

@Module({
  providers: [CustomLoggerService],
  imports: [],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
