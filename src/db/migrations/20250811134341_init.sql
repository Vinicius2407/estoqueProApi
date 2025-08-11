CREATE TYPE "public"."image_status" AS ENUM('uploading', 'processing', 'success', 'failed');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id"),
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "image_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"input_file_key" varchar(255) NOT NULL,
	"product_id" serial NOT NULL,
	"status" "image_status" NOT NULL,
	CONSTRAINT "image_product_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"base_price" double precision DEFAULT 0 NOT NULL,
	"category_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "stock_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"color" varchar(255),
	"size" varchar(255),
	"quantity" integer DEFAULT 0 NOT NULL,
	"sku" varchar(300),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "stock_item_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"telephone" varchar(13) NOT NULL,
	"document" varchar(100) NOT NULL,
	"active" boolean NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "image_product" ADD CONSTRAINT "image_product_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;