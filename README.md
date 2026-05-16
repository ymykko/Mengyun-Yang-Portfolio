# Mengyun Yang Portfolio Website

This is a ready-to-publish static portfolio website for GitHub Pages.

## Structure

```text
index.html
assets/
  css/styles.css
  js/main.js
  files/
    Mengyun-Yang-CV.pdf
  images/favicon.svg
```

## How to publish on GitHub Pages

1. Create a new GitHub repository, for example: `portfolio`.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Save. GitHub will give you a link like:
   `https://your-username.github.io/portfolio/`

## What to edit first

### 1. Replace CV
Replace:

```text
assets/files/Mengyun-Yang-CV.pdf
```

with your real CV PDF using the same filename.

### 2. Edit contact links
In `index.html`, search for:

```html
https://www.linkedin.com/
https://github.com/
```

Replace them with your actual LinkedIn and GitHub links.

### 3. Edit projects
In `assets/js/main.js`, edit the `projects` array.

Each project has:
- category: `design`, `data`, or `ops`
- title in English, Simplified Chinese, and Traditional Chinese
- description in three languages
- tools
- link

### 4. Add real case-study pages later
Right now all project cards link to the case-study template section on the same page.

Later you can create pages such as:

```text
projects/kaco-rebranding/index.html
projects/youtube-music-comments/index.html
```

and change each project link in `assets/js/main.js`.

## Language switching

The site supports:

- English
- Simplified Chinese
- Traditional Chinese

Language preference is saved in the browser via `localStorage`.

## Notes

This version is intentionally built with plain HTML, CSS, and JavaScript, so it works directly on GitHub Pages without any build step.
