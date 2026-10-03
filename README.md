# Kai Ye's homepage

Two English-language views of the same academic profile:

- `/`: React/Vite research terminal (`home_page/`).
- `/legacy/`: Jekyll graphical homepage (`legacy/`). Publications, talks and teaching, and posters live under `/legacy/portfolio/`.

## Updating content

Edit `legacy/_data/alldetails.yml` for publications, preprints, talks, teaching, posters, and news. Jekyll reads it directly; Vite bundles that same file into the terminal at build time. Rebuild both sites after changing it.

Use explicit publication years and keep accepted papers in `published`, with `status: Accepted` where appropriate. Talk `link` fields point to recordings; `eventLink` fields point to event pages. Teaching records separate the institution from the degree level and optional course code.

## Build and check

Use Node.js 20+ and a Ruby version compatible with `legacy/Gemfile` (GitHub Actions uses Ruby 3.1).

```sh
cd home_page
npm ci
npm run check
npm run build
cd ../legacy
bundle install
bundle exec jekyll build
```

The terminal does not require a Gemini API key. `npm run dev` runs its Vite development server. To preview both versions with images and links, assemble `home_page/dist/` at the web root, `legacy/_site/` at `/legacy/`, and the root `images/` and `posters/` directories at their existing paths, as the deployment workflow does.

## Deployment

`.github/workflows/` builds both sites and deploys their combined output to GitHub Pages on pushes to `master`. The source of the terminal is `home_page/`; the historical root `index.html` and `assets/` are not used by this workflow.

The GUI portfolio pages use `legacy/_layouts/portfolio.html` and `legacy/css/portfolio.css`. The graphical home retains its original cover and project timeline.
