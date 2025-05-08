import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utilities/file-heplers';
import { AuthGuard } from '@nestjs/passport';
import { QueryProductDTO } from 'src/dto/query.product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Body() productDto: CreateProductDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.productService.create(productDto, image);
  }

  @Get()
  async findAll(@Query() query: QueryProductDTO) {
    return await this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.update(id, updateProductDto, image);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
