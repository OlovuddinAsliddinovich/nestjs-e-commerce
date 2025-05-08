import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import * as fs from 'fs';
import { QueryProductDTO } from '../dto/query.product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(productDTO: CreateProductDTO, image: Express.Multer.File) {
    productDTO.image = image.filename;
    return await this.productModel.create(productDTO);
  }

  async findAll(query: QueryProductDTO) {
    const queryObject = query.search
      ? {
          title: {
            $regex: query.search,
            $options: 'i',
          },
        }
      : {};

    const skip = Number(query.limit || 10) * (Number(query.page) - 1);
    const limit = Number(query.limit || 10);

    return await this.productModel
      .find(queryObject)
      .populate('owner', '-password')
      .limit(limit)
      .skip(skip);
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDTO,
    image: Express.Multer.File,
  ) {
    const product = await this.productModel.findById(id);

    if (image) {
      fs.unlink(
        `${__dirname}/../../uploads/${product?.image}`,
        async (error) => {
          if (error) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
          }

          updateProductDto.image = image.filename;

          return await product?.updateOne(updateProductDto);
        },
      );

      updateProductDto.image = image.filename;
      return await product?.updateOne(updateProductDto);
    }

    return await product?.updateOne(updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
