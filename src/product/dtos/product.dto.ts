import { Product } from "@prisma/client"

export class ProductDto{
    idx: string
    prod_no: number
    name: string
    price: number

    constructor(product: Product){
        this.idx = product.idx
        this.prod_no = product.prod_no
        this.name = product.name
        this.price = product.price
    }
}