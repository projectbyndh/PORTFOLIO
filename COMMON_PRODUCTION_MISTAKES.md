# Common Production Mistakes for Vite SPA on Hostinger

1. **Wrong Vite base config**
   - Should be `base: './'` in vite.config.js for static hosting.
2. **Missing or incorrect .htaccess**
   - Without SPA fallback rules, direct or refresh on routes gives 404.
3. **Uploading dist folder instead of its contents**
   - Only upload the files inside dist to public_html, not the dist folder itself.
4. **Browser cache issues**
   - Old files may be cached; always hard refresh after deploy.
5. **Absolute asset paths**
   - Use relative paths (handled by correct Vite base config).
6. **Case sensitivity in routes or file names**
   - Linux hosting is case-sensitive; ensure route and file names match exactly.
7. **localStorage domain mismatch**
   - Data in localStorage is domain-specific; switching domains will not share data.
8. **Not testing all routes**
   - Always test direct access and refresh on all SPA routes after deploy.
9. **Not clearing old files**
   - Remove old files from public_html before uploading new build.
