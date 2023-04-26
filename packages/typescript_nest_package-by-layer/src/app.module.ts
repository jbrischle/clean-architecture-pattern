import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { RepositoryModule } from './repository/repository.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ControllerModule, ServiceModule, RepositoryModule],
})
export class AppModule {}
