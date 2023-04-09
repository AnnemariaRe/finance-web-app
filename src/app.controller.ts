import { Controller, Get, Render, Req, Res, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from './response-time.interceptor';

@UseInterceptors(new ResponseTimeInterceptor)
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
}