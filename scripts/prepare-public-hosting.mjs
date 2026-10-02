import { writeFileSync, existsSync } from "node:fs";
const databaseId = process.argv[2];
if (!databaseId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(databaseId) || databaseId === "00000000-0000-4000-8000-000000000000") {
  console.error("Usage: pnpm public:config YOUR_CLOUDFLARE_D1_DATABASE_ID");
  console.error("Use the database_id printed by: pnpm exec wrangler d1 create tejaswini-portfolio-likes");
  process.exit(1);
}
if (!existsSync("dist/server/index.js")) {
  console.error("Build the website first with pnpm build."); process.exit(1);
}
const config = {
  name: "tejaswini-betina-portfolio",
  main: "dist/server/index.js",
  compatibility_date: "2026-05-15",
  compatibility_flags: ["nodejs_compat"],
  no_bundle: true,
  rules: [{ type: "ESModule", globs: ["**/*.js", "**/*.mjs"] }],
  assets: { directory: "dist/client" },
  d1_databases: [{ binding: "DB", database_name: "tejaswini-portfolio-likes", database_id: databaseId, migrations_dir: "drizzle" }]
};
writeFileSync("wrangler.public.json", JSON.stringify(config, null, 2) + "\n");
console.log("Created wrangler.public.json for your own Cloudflare account.");
