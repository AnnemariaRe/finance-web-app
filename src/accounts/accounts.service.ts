import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  // constructor(private prisma: PrismaService) {
  // }

  // create(createAccountDto: CreateAccountDto) {
  //   const { userId, title, balance, currency, accountType } = createAccountDto;
  //   const user = this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       accounts: {
  //         create: { title, balance, currency, accountType },
  //       },
  //     },
  //     include: {
  //       accounts: { take: -1 }
  //     }
  //   });
  //   return user.accounts[-1];
  // }

  // findAllFromUser(userId: number) {
  //   return this.prisma.account.findMany({ where: { userId } });
  // }

  // findOne(id: number) {
  //   return this.prisma.account.findUnique({ where: { id } });
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return this.prisma.account.update({
  //     where: { id },
  //     data: updateAccountDto,
  //   });
  // }

  // remove(id: number) {
  //   return this.prisma.account.delete({ where: { id } });
  // }
}
