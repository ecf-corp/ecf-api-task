import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; 
import { CreateProductInput } from "./dtos/In/createProduct.dto";
import { Product } from "@prisma/client";
import { fetchProductsOutput } from "./dtos/out/fetchProducts.dto";
import { ProductDto } from "./dtos/product.dto";
import { UpdateProductInput } from "./dtos/In/updateProduct.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {} 

    // 상품 생성
    async create(input: CreateProductInput) {
        try{

            const product = await this.prisma.product.create({
                data: {
                    name: input.name,
                    description: input.description,
                    price: input.price,
                    stock: input.stock,
                }
            });

            return true;

        } catch(error){
            throw new InternalServerErrorException('상품 등록 중 오류가 발생했습니다.')
        }
    }

    // 모든 상품 조회
    async findAll(page: number): Promise<fetchProductsOutput>{

        try{
            // 총 상품 수 계산
            const total = await this.prisma.product.count()
            const limit = 20
            
            // 페이지네이션 처리
            const products = await this.prisma.product.findMany({
                skip: (page - 1) * limit,  // 해당 페이지의 시작점 설정
                take: limit,               // 한 번에 가져올 상품 수
            })

            const productDtos = products.map(product => new ProductDto(product))
            
            return new fetchProductsOutput(productDtos, total, page, limit)
        }catch(error){
            throw new InternalServerErrorException('상품 조회 중 오류가 발생했습니다.')
        }
    }

    // 특정 상품 조회하기
    async findOne(prod_no: number): Promise<Product>{
        const product = await this.prisma.product.findUnique({
            where: { prod_no },
        })

        if(!product){
            throw new NotFoundException(`상품을 찾을 수 없습니다. prod_no: ${prod_no}`);
        }

        return product;
    }

    // 상품 정보 수정하기
    async update(input: UpdateProductInput){
        
        try{
            // 해당 상품이 조회
            const existingProduct = await this.prisma.product.findUnique({
                where:{prod_no: input.prod_no}
            })
            
            // 해당 상품이 없는 경우
            if(!existingProduct){
                throw new NotFoundException(`상품을 찾을 수 없습니다. prod_no: ${input.prod_no}`)
            }

            await this.prisma.product.update({
                where: { 
                    prod_no: input.prod_no 
                },
                data: {
                    name: input.name,
                    description:  input.description,
                    price: input.price,
                    stock: input.stock
                }
            })

            return true

        }catch(error){
            if(error) {
                if(error instanceof NotFoundException){
                    throw error
                }
            }
            throw new InternalServerErrorException('상품 수정 중 오류가 발생했습니다.')
        }
    }

    // 상품 삭제하기
    async delete(prod_no: number){
        try{
            // 해당 상품이 조회
            const existingProduct = await this.prisma.product.findUnique({
                where:{prod_no}
            })
            
            // 해당 상품이 없는 경우
            if(!existingProduct){
                throw new NotFoundException(`상품을 찾을 수 없습니다. prod_no: ${prod_no}`)
            }

            await this.prisma.product.delete({
                where: {
                    prod_no: prod_no
                }
            })

            return true

        }catch(error){
            if(error instanceof NotFoundException){
                throw error
            }
            throw new InternalServerErrorException('상품 삭제 중 오류가 발생했습니다.')
        }
    }
}
