// src/users/dto/create-user.dto.ts

import { UserRole } from "../entities/user-role.enum";

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRole; // Role is optional during creation
}