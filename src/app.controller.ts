import { Controller, Get, Render, Req, Res, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from './response-time.interceptor';

@UseInterceptors(new ResponseTimeInterceptor)
@Controller()
export class AppController {
  @Get()
  @Render('index')
  main(@Req() req, @Res() res: Response) {
    if (req.user) {
      return { message: 'Authorized user'};
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