import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('/wallet')
  @Render('wallet')
  wallet() {
    return { message: 'Wallet page' };
  }
}