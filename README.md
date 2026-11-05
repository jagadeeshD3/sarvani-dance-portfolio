# Sarvani — classical dancer portfolio (3D website)

A static website: plain HTML, CSS and JavaScript. It has no build step and needs no server or database.

## Run it on your computer
**Easiest:** unzip the folder and double-click `index.html`. It opens in your browser with the 3D lotus animating. Chrome, Edge, Firefox and Safari all work.

**Optional:** to test it exactly as it will run online, open a terminal in this folder and run
```
python -m http.server 8000
```
Then go to http://localhost:8000.

Two things only work once the site is online (or on localhost): YouTube videos and the share-preview image.

## Put it on GitHub and publish it for free (GitHub Pages)
1. Create a free account at https://github.com, then click **New repository**.
   - Name it something like `sarvani-dance`.
   - Set it to **Public**, then click **Create repository**.
2. On the new repository page, click **uploading an existing file**.
3. Open the unzipped folder, select **everything inside it** (`index.html`, `css`, `js`, `fonts`, `assets` and the rest) and drag it onto the page. Drag the contents, not the folder itself.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then branch **main**, folder **/ (root)**, and click **Save**.
6. Wait 1 to 2 minutes and refresh the page. Your link appears at the top:
   `https://YOUR-USERNAME.github.io/sarvani-dance/`

**Updating it later:** in the repository, open the file (for example `js/config.js`), click the pencil icon, edit, then **Commit changes**. To add photos, open `assets/images`, choose **Add file → Upload files** and drag them in. The site updates within a minute.

### Prefer the command line?
```
cd sarvani-dance          # the unzipped folder
git init
git add .
git commit -m "Sarvani portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sarvani-dance.git
git push -u origin main
```
Then do step 5 above.

### Or use Vercel or Netlify (also free)
- **Vercel:** sign in at vercel.com with GitHub, choose **Add New → Project**, select the repository, set Framework to **Other**, and click **Deploy**. Every later commit to GitHub updates the site automatically.
- **Netlify:** drag the folder onto https://app.netlify.com/drop.

**A custom domain** (for example `sarvanidance.nl`, about €10 a year): buy it from a registrar such as TransIP, then add it under Settings → Pages (GitHub) or Domains (Vercel).

## Changing content
- **All text, names, videos and links:** `js/config.js`. Anything in `[square brackets]` is a placeholder.
- **Photos:** put them in `assets/images/` using the file names in `ASSETS.md`. Until a photo is there, the site shows a placeholder with the name of the file it expects.
- **YouTube videos:** paste the video ID (the part after `watch?v=`) into `videos` in `config.js`.
- **Contact form:** to have messages emailed to her, create a free form at https://formspree.io and paste its URL into `formEndpoint` in `config.js`. Without it, the form opens the visitor's email app.
- **Colours:** the `:root` block at the top of `css/style.css`.

## What moves
- On load, a lotus bud rises in a glow of oil-lamp light while her name writes itself in.
- **Scrolling** opens the lotus. When it fully opens, it releases a burst of petals.
- Clicking or tapping the hero scatters petals from the lotus.
- Petals across the page drift away from the mouse pointer.
- The temple-arch frames tilt in 3D, and the photo gallery is a ring that turns slowly by itself.

If a visitor's device is set to reduce motion, the lotus appears already open and nothing animates.

`js/scene.js` contains the 3D scene with Three.js bundled in. It is compiled, so you shouldn't edit it by hand.
