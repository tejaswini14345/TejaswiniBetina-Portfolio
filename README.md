# Tejaswini Betina — Portfolio

This is the complete upgraded portfolio source, including project filters, expandable details, light/dark themes, mobile navigation, and a shared like button.

## Important: GitHub repository versus GitHub Pages

You can put all this code in a public GitHub repository. Publishing a repository makes the code visible; it does not automatically publish the website.

GitHub Pages serves static HTML/CSS/JavaScript. This version also has a server API and a database for the shared likes. To keep every feature, store your source in GitHub and deploy the website to Cloudflare Workers with D1 using the steps below. GitHub Pages alone cannot run the shared-like backend.

## 1. Install the tools

Install Node.js 22.13 or newer, Git, and VS Code. Then install the pinned package manager:

```sh
npm install --global pnpm@11.25.0
```

Open this folder in VS Code. Open Terminal > New Terminal. Run every command below from the folder containing package.json.

## 2. Run the complete website locally

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_green_molecule_man.sql
pnpm start
```

Open the local URL printed by the last command. The database command creates the local likes table; run it once for a new local database, not on every start. The website and likes can then run entirely on your computer. Local likes are separate from the currently hosted website's likes.

For editing with automatic reload:

```sh
pnpm dev
```

Open the URL it prints. If the local likes table is unavailable in development, use the built local workflow above to test it.

## 3. Edit your portfolio

- app/page.tsx: your name, experience, projects, skills, and LinkedIn link; project data is near the top.
- app/globals.css: colors, layout, typography, responsive design, and animations.
- app/layout.tsx: browser title and description.
- public/favicon.svg: site icon.
- app/api/likes/route.ts: like API and visitor cookie handling.
- db/likes.ts: prepared database queries.
- db/schema.ts: database schema.
- drizzle/: generated SQL migrations; keep these in Git.

Refresh your local page after edits, or use pnpm dev for automatic updates. Rebuild before publishing.

## 4. Upload to GitHub

Create an empty repository on GitHub (for example, tejaswini-portfolio). Choose Public if you want everyone to see the source. Do not add an initial README to that empty remote because this folder already includes one.

From this folder:

```sh
git init
git add .
git commit -m "Add my portfolio website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace YOUR_GITHUB_REPOSITORY_URL with the HTTPS repository URL GitHub shows. Authenticate with GitHub's normal sign-in flow. Alternatively, use GitHub Desktop to add this folder and publish the repository.

The ZIP excludes dependency folders, Git history, deployment credentials, local database contents, and the current Site's identity. Its .gitignore also excludes local environment files and generated output.

## 5. Publish publicly with working shared likes

Use your own Cloudflare account. These commands publish a NEW website in your account; they do not change the existing ChatGPT-hosted version.

First log in and create a D1 database:

```sh
pnpm exec wrangler login
pnpm exec wrangler d1 create tejaswini-portfolio-likes
```

Copy the database_id printed by the second command. It is an identifier, not a password.

Build and generate your standalone hosting configuration:

```sh
pnpm build
pnpm public:config YOUR_D1_DATABASE_ID
```

Replace YOUR_D1_DATABASE_ID with your real database ID. The helper refuses the local placeholder ID. It creates wrangler.public.json with paths to the built website and your database.

Apply the database migrations and publish:

```sh
pnpm exec wrangler d1 migrations apply DB --remote --config wrangler.public.json
pnpm exec wrangler deploy --config wrangler.public.json
```

The deploy command prints the public website URL. Share that URL on LinkedIn. Check the Cloudflare dashboard for any account-level access settings that you have enabled.

For later updates:

```sh
pnpm build
pnpm exec wrangler deploy --config wrangler.public.json
```

If you change the database schema, generate and apply the new migrations before deploying. Existing counts stay in your database across deployments. Likes are one per browser cookie, not one verified person. Clearing cookies or using another browser creates another visitor identity. This is a lightweight portfolio reaction feature, not an abuse-resistant voting system.

## What was tested

The portfolio build and TypeScript checks passed. The real like route and database helper were tested against SQLite for shared counts, duplicate saves, reload state, separate visitors, undo, invalid input, origin validation, and database unavailability. The standalone export's build was checked separately. Deployment to YOUR Cloudflare account has not been performed or verified; you will complete the sign-in, database creation, and publish steps.

## Official references

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Upload existing source to GitHub: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
- Cloudflare D1 commands: https://developers.cloudflare.com/workers/wrangler/commands/d1/
- Wrangler configuration: https://developers.cloudflare.com/workers/wrangler/configuration/
- Vinext: https://github.com/cloudflare/vinext
