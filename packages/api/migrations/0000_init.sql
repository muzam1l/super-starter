CREATE TABLE "app__post" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth__account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth__invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"team_id" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth__member" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth__organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"created_at" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "auth__organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "auth__session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"active_organization_id" text,
	"active_team_id" text,
	CONSTRAINT "auth__session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "auth__team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "auth__team_member" (
	"id" text PRIMARY KEY NOT NULL,
	"team_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "auth__user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "auth__user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "auth__verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "app__post" ADD CONSTRAINT "app__post_user_id_auth__user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth__user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__account" ADD CONSTRAINT "auth__account_user_id_auth__user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth__user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__invitation" ADD CONSTRAINT "auth__invitation_organization_id_auth__organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."auth__organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__invitation" ADD CONSTRAINT "auth__invitation_inviter_id_auth__user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."auth__user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__member" ADD CONSTRAINT "auth__member_organization_id_auth__organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."auth__organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__member" ADD CONSTRAINT "auth__member_user_id_auth__user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth__user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__session" ADD CONSTRAINT "auth__session_user_id_auth__user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth__user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__team" ADD CONSTRAINT "auth__team_organization_id_auth__organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."auth__organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__team_member" ADD CONSTRAINT "auth__team_member_team_id_auth__team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."auth__team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth__team_member" ADD CONSTRAINT "auth__team_member_user_id_auth__user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth__user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "app__post_user_id_index" ON "app__post" USING btree ("user_id");