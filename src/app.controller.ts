import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  main() {
    return { message: 'Home page' };
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