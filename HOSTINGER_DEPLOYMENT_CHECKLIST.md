# Hostinger Deployment Checklist for React + Vite SPA (Zustand Persist)

1. **Update vite.config.js**
   - Ensure `base: './'` is set.

2. **Check Zustand persist config**
   - Confirm `storage: createJSONStorage(() => localStorage)` is used.

3. **Build the app**
   - Run: `pnpm run build` (or `npm run build`)

4. **Add .htaccess for SPA routing**
   - Place the provided `.htaccess` file in the `dist` folder.

5. **Upload to Hostinger**
   - In File Manager, go to `public_html`.
   - Delete old files (except .htaccess if you want to keep custom rules).
   - Upload all files and folders from inside `dist` (not the `dist` folder itself) to `public_html`.

6. **Test your site**
   - Visit your domain.
   - Test all routes, including direct `/admin` and refresh.
   - Check that localStorage data persists across refresh and navigation.

7. **Clear browser cache**
   - If you see a blank screen or old content, do a hard refresh (Ctrl+F5).

8. **Troubleshoot**
   - If routes 404, check `.htaccess` is present and correct.
   - If assets 404, check Vite `base` config and upload structure.
   - If state does not persist, check Zustand persist config.

---

**You are now ready to deploy your SPA to Hostinger!**
