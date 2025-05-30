import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { HealthModule } from './health/health.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'health',
        module: HealthModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), AuthModule, HealthModule],
})
export class AppRoutingModule {}
