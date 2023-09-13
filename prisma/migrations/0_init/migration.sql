-- CreateTable
CREATE TABLE "balance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplier_id" UUID NOT NULL,
    "total_amount" INTEGER,
    "paid_amount" INTEGER,
    "due_amount" INTEGER,
    "last_payment_date" DATE,
    "next_payment_date" DATE,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divergence" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "goods_id" UUID NOT NULL,
    "expected_quantity" INTEGER,
    "received_quantity" INTEGER,
    "divergence_divergence" INTEGER,
    "analysis_date" DATE,
    "analyst_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "divergence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "supplier_id" UUID NOT NULL,
    "quantity" INTEGER,
    "received_date" DATE,
    "receiver_id" UUID NOT NULL,
    "status" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "goods_id" UUID NOT NULL,
    "quantity" INTEGER,
    "last_updated" DATE,
    "updated_by" UUID NOT NULL,
    "status" VARCHAR(255),
    "location" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "address" VARCHAR(255),
    "contact_number" VARCHAR(255),
    "contact_person" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "divergence" ADD CONSTRAINT "divergence_analyst_id_fkey" FOREIGN KEY ("analyst_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "divergence" ADD CONSTRAINT "divergence_goods_id_fkey" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "goods" ADD CONSTRAINT "goods_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "goods" ADD CONSTRAINT "goods_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_goods_id_fkey" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

