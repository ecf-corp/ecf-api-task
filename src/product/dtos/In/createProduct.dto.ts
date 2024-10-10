import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateProductInput {

    @ApiProperty({description: '상품 이름'})
    @IsString()
    name: string;

    @ApiProperty({description: '상품 설명'})
    @IsString()
    description: string;
    
    @ApiProperty({description: '상품 가격'})
    @IsInt()
    price: number;

    @ApiProperty({description: '재고 수량'})
    @IsInt()
    stock: number;
}