import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "blogs" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blogs_seo_seo_og_image_idx" ON "blogs" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_og_image_id_media_id_fk";
  
  DROP INDEX "blogs_seo_seo_og_image_idx";
  ALTER TABLE "blogs" DROP COLUMN "featured";
  ALTER TABLE "blogs" DROP COLUMN "seo_meta_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_meta_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_og_image_id";`)
}
