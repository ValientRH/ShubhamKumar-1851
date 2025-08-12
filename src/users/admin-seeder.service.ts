// src/users/admin-seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user-role.enum';

@Injectable()
export class AdminSeederService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const adminEmail = 'admin@email.com';
    const adminExists = await this.usersService.findOneByEmail(adminEmail);

    if (!adminExists) {
      console.log('Admin user not found. Seeding admin user...');
      await this.usersService.create({
        email: adminEmail,
        password: 'admin',
        role: UserRole.ADMIN,
      });
      console.log('Admin user seeded successfully.');
    }
  }
}