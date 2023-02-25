import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  main(@Req() req) {
    if (req.user) {
      return { message: 'Authorized user' };
    } else {
      return { message: 'Unauthorized user' }
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