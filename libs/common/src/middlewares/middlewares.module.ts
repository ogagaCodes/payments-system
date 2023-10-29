import { Module } from '@nestjs/common';
import  { Middleware }  from './middleware.services';

@Module({
  imports: [MiddlewareModule],
  controllers: [],
  providers: [Middleware],
  exports: [Middleware],
})
export class MiddlewareModule {}