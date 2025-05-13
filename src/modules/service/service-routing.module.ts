import { path } from 'app-root-path';
import { RouterModule, Routes } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { FileModule } from './file';

const routes: Routes = [
  {
    path: 'service',
    children: [{ path: 'file', module: FileModule }],
  },
];

@Module({
  imports: [
    MulterModule.register({
      dest: `${path}/storage`,
    }),
    RouterModule.register(routes),
    FileModule,
  ],
})
export class ServiceRoutingModule {}
