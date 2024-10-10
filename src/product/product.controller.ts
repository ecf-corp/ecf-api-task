import { Controller, Post, Body, HttpStatus, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { CreateProductInput } from "./dtos/In/createProduct.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { fetchProductsOutput } from "./dtos/out/fetchProducts.dto";

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    // 상품 추가하기
    @ApiOperation({summary: '상품 추가하기', description:'새로운 상품을 추가합니다.'})
    @Post()
    async createProduct(@Body() createProductInput: CreateProductInput) {
        console.log(createProductInput);
        const isCreated = await this.productService.create(createProductInput);
        if(isCreated){
            return {
                statusCode : HttpStatus.OK,
                message: "상품등록을 성공하였습니다.",
            }
        }else{
            return {
                statusCode : HttpStatus.BAD_REQUEST,
                message: "상품등록에 실패하였습니다.",
                error: "Bad Request"
            }
        }
    }

    // 모든 상품 조회하기
    @ApiOperation({summary: '모든 상품 조회하기', description:'현재 등록된 모든 상품을 조회합니다.'})
    @Get()
    async fetchProducts(@Query('page') page = 1): Promise<fetchProductsOutput>{
        return await this.productService.findAll(page);
    }

    // 특정 상품(개별) 조회하기
    @ApiOperation({summary: '특정 상품 조회하기', description:'특정 상품에 대한 상세 정보를 조회합니다.'})
    @Get(':prod_no')
    async fetchProduct(@Param('prod_no', ParseIntPipe) prod_no : number): Promise<Product>{
        return await this.productService.findOne(prod_no);
    }
}