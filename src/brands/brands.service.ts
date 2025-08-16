// src/brands/brands.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto, user: User): Promise<Brand> {
    const newBrand = this.brandsRepository.create({
      ...createBrandDto,
      createdBy: user, // Link the brand to the user who created it
    });
    return this.brandsRepository.save(newBrand);
  }

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandsRepository.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    // We use findOne to leverage the NotFoundException if the brand doesn't exist
    const brand = await this.findOne(id); 
    const updatedBrand = Object.assign(brand, updateBrandDto);
    return this.brandsRepository.save(updatedBrand);
  }

  async remove(id: string): Promise<void> {
    const result = await this.brandsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
  }
}