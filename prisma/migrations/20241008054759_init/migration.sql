-- CreateTable
CREATE TABLE "Product" (
    "idx" UUID NOT NULL,
    "prod_no" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_prod_no_key" ON "Product"("prod_no");
