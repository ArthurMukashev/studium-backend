import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UserModule } from './user';

const routes: Routes = [
  {
    path: 'admin',
    children: [{ path: 'user', module: UserModule }],
  },
];

@Module({
  imports: [RouterModule.register(routes), UserModule],
})
export class AdminRoutingModule {}
