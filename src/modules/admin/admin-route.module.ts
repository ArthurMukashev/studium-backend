import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'test',
        module: TestModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), TestModule],
})
export class AdminRoutingModule {}
