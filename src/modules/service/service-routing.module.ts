import { RouterModule, Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { FileModule } from './file';

const routes: Routes = [
  {
    path: 'service',
    children: [{ path: 'file', module: FileModule }],
  },
];

@Module({
  imports: [RouterModule.register(routes), FileModule],
})
export class ServiceRoutingModule {}
