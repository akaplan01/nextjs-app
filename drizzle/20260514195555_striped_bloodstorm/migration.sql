CREATE TABLE "ppdle-daily" (
	"id" integer
);
--> statement-breakpoint
ALTER TABLE "ppdle-daily" ADD CONSTRAINT "ppdle-daily_id_ppdle-moves_id_fkey" FOREIGN KEY ("id") REFERENCES "ppdle-moves"("id") ON DELETE CASCADE ON UPDATE CASCADE;