# Personal Website

Vunny Grover’s portfolio at **https://vunnyg.com**, with the BMO project at **https://vunnyg.com/bmo**.

This repository contains the website source from deployed version 19, including the mobile layout improvements, DM Sans typography, equal-width animation controls and pixel V favicon.

## Import status

The website code, images, fonts and 3D model assets are included. The five large Fusion download files are pending import. To fetch those exact original files locally, run `python scripts/import-bmo-assets.py` from the repository folder. Each file is checked against its expected size and SHA-256 hash.

## Download the code

Use **Code → Download ZIP**, or [download the latest repository version](https://github.com/TheVBoss/personal-website/archive/refs/heads/main.zip).

The ZIP always reflects this repository’s `main` branch. Changes to the hosted website are not automatically synced here. Ask for the repository to be updated after future website edits. Pushing to this repository does not automatically deploy the live website.

## Main files

- `public/index.html`: portfolio homepage
- `public/bmo.html`: BMO project page
- `public/style.css`: typography, layout and responsive styles
- `public/app.js`: interactive 3D model viewer
- `public/faces.js`: BMO face animations
- `public/models/`: 3D model data and images
- `public/downloads/`: Fusion download split into binary parts, combined by `public/downloads.js`
- `app/bmo/route.ts`: clean `/bmo` route

## Quick local preview

With Python installed, run this from the repository folder:

```sh
python -m http.server 8000 --directory public
```

Open http://localhost:8000/index.html for the homepage or http://localhost:8000/bmo.html for BMO. This simple server does not implement the `/bmo` application route. Some BMO face assets and settings load from GitHub and need an internet connection.

## Full application

The source uses Vinext, Vite and Cloudflare Workers. Use Node.js 22.13 or later and the pnpm version specified in `package.json`:

```sh
pnpm install
pnpm dev
```

Create a production build with `pnpm build`. Hosting on another provider requires adapting its routing and worker configuration. The framework scaffold is retained alongside the portfolio files.

Private hosting identifiers, credentials, environment files, dependencies and build output are excluded. The exported Vite configuration uses empty database and storage bindings so it does not depend on the private hosting configuration file.

Source snapshot: `bf61a42ebecb92d65c6d29ab9c94b148d3830b9f` (version 19).
