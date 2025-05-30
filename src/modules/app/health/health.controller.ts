import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { path } from 'app-root-path';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.disk.checkStorage('storage', { path: path, threshold: 250 * 1024 * 1024 * 1024 }),
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.http.responseCheck('vk', 'https://vk.com', (res) => res.status === 200),
    ]);
  }
}
