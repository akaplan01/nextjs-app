ALTER TABLE "ppdle-daily" DROP CONSTRAINT "ppdle-daily_id_ppdle-moves_id_fkey";--> statement-breakpoint
ALTER TABLE "ppdle-daily" ADD COLUMN "answer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ppdle-daily" ADD COLUMN "game_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "ppdle-daily" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "ppdle-daily" DROP COLUMN "day";--> statement-breakpoint
CREATE SEQUENCE "ppdle-daily_id_seq";--> statement-breakpoint
ALTER TABLE "ppdle-daily" ALTER COLUMN "id" SET DEFAULT nextval('ppdle-daily_id_seq')--> statement-breakpoint
ALTER SEQUENCE "ppdle-daily_id_seq" OWNED BY "public"."ppdle-daily"."id";--> statement-breakpoint
ALTER TABLE "ppdle-daily" ALTER COLUMN "id" SET DATA TYPE int USING "id"::int;--> statement-breakpoint
CREATE UNIQUE INDEX "ppdle-daily_game_date_index" ON "ppdle-daily" ("game_date");--> statement-breakpoint
ALTER TABLE "ppdle-daily" ADD CONSTRAINT "ppdle-daily_answer_id_ppdle-moves_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "ppdle-moves"("id") ON DELETE CASCADE ON UPDATE CASCADE;