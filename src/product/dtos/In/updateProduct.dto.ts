import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductInput{

    @ApiProperty({description: '상품 번호'})
    prod_no: number

    @ApiProperty({description: '상품 이름'})
    name: string

    @ApiProperty({description: '상품 설명'})
    description: string

    @ApiProperty({description: '상품 가격'})
    price: number
    
    @ApiProperty({description: '상품 재고'})
    stock: number
}