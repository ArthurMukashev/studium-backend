import { path } from 'app-root-path';
import { RouterModule, Routes } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { MailModule } from './mail';
import { FileModule } from './file';

const routes: Routes = [
  {
    path: 'service',
    children: [
      { path: 'mail', module: MailModule },
      { path: 'file', module: FileModule },
    ],
  },
];

@Module({
  imports: [
    MulterModule.register({
      dest: `${path}/storage`,
    }),
    RouterModule.register(routes),
    MailModule,
    FileModule,
  ],
})
export class ServiceRoutingModule {}
