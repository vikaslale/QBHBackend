-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT,
    "email" TEXT,
    "mobile_number" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_user_id_key" ON "customer"("user_id");
