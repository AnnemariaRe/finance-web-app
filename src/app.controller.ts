import { Controller, Get, Render, Req, Res, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from './response-time.interceptor';

@UseInterceptors(new ResponseTimeInterceptor)
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  @Get()
  @Render('index')
  main(@Req() req) {
    if (req.user) {
      return {
        message: 'Main page',
        showLogoutbutton: true
      };
    } else {
      return {
        message: 'Main page',
        showLoginButton: true
      }
    }
  }

  @Get('/wallet')
  @Render('wallet')
  wallet() {
    return { message: 'Wallet page' };
  }

  @Get('/history')
  @Render('history')
  history() {
    return { message: 'History page' };
  }
}