import { ProductDto } from "../product.dto";

export class fetchProductsOutput{
    products: ProductDto[]
    total: number
    page: number
    limit: number

    constructor(products: ProductDto[], total: number, page: number, limit: number){
        this.products = products
        this.total = total
        this.page = page
        this.limit = limit
    }
}