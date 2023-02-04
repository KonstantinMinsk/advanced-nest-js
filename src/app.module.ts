import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as path from 'path';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.entity';
import { UserRoles } from './roles/user-roles.entity';
import { CoModule } from './auth/co.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static'),
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'advanced-course',
      entities: [User, Roles, UserRoles],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    CoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
