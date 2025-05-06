import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), AuthModule],
})
export class AppRoutingModule {}
