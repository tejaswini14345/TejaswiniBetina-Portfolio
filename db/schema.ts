import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const portfolioLikes = sqliteTable("portfolio_likes",{visitorId:text("visitor_id").primaryKey(),createdAt:integer("created_at").notNull()});
