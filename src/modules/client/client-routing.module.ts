import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ProfileModule } from './profile';

const routes: Routes = [
  {
    path: 'client',
    children: [{ path: 'profile', module: ProfileModule }],
  },
];

@Module({
  imports: [RouterModule.register(routes), ProfileModule],
})
export class ClientRoutingModule {}
