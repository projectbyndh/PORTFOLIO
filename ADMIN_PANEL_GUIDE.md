# Admin Panel Documentation

## 🔐 Authentication System

The admin panel uses **Zustand** with **persist middleware** for state management and authentication persistence across browser sessions.

### Default Credentials
- **Username:** `admin`
- **Password:** `NDH@2024`

### Login URL
```
http://localhost:5173/admin/login
```

---

## 📁 Admin File Structure

```
src/
├── Store/
│   ├── useAuthStore.js      # Authentication state management with persistence
│   └── useBlogStore.js      # Blog CRUD operations
└── components/
    ├── AdminLogin.jsx       # Login page
    ├── AdminDashboard.jsx   # Main dashboard with blog management
    └── BlogEditor.jsx       # Create/Edit blog posts
```

---

## 🎨 Features

### 1. **Admin Login** (`/admin/login`)
- Clean, branded login interface matching site theme
- Password visibility toggle
- Form validation
- Auto-redirect if already authenticated
- Persistent sessions using localStorage

### 2. **Admin Dashboard** (`/admin/dashboard`)
- **Statistics Cards:**
  - Total Blogs
  - Published Blogs
  - Views (placeholder)
  
- **Blog Management Table:**
  - View all blogs with thumbnails
  - See author and publish date
  - Quick actions: View, Edit, Delete
  
- **Quick Actions:**
  - Create New Blog button
  - Logout functionality

### 3. **Blog Editor** (`/admin/blog/create` & `/admin/blog/edit/:id`)
- **Create Mode:** Fresh form for new blog posts
- **Edit Mode:** Pre-filled form with existing blog data
- **Fields:**
  - Title (required)
  - Author (default: NDH Technologies)
  - Featured Image URL with live preview
  - Blog Content (textarea with paragraph support)
  
- **Features:**
  - Image preview
  - Auto-save draft (can be implemented)
  - Cancel/Save buttons
  - Loading states

---

## 🔒 Security Features

### 1. **Persistent Authentication**
```javascript
// Stored in localStorage as 'ndh-auth-storage'
{
  state: {
    isAuthenticated: true,
    user: { username: 'admin', role: 'admin' }
  }
}
```

### 2. **Protected Routes**
All admin routes automatically redirect to login if not authenticated:
- `/admin/dashboard`
- `/admin/blog/create`
- `/admin/blog/edit/:id`

### 3. **Logout**
Clears authentication state and redirects to homepage.

---

## 🛠️ Usage Guide

### Accessing Admin Panel

1. **Navigate to Login:**
   ```
   http://localhost:5173/admin/login
   ```

2. **Enter Credentials:**
   - Username: `admin`
   - Password: `NDH@2024`

3. **Dashboard Access:**
   - Automatically redirected to `/admin/dashboard`

### Creating a Blog

1. Click **"Create New Blog"** button
2. Fill in the form:
   - **Title:** Your blog title
   - **Author:** Author name (default provided)
   - **Image URL:** Link to featured image
   - **Content:** Full blog content
3. Click **"Publish Blog"**
4. Redirected to dashboard with success message

### Editing a Blog

1. From dashboard, click **Edit** (pencil icon) on any blog
2. Modify fields as needed
3. Click **"Update Blog"**
4. Changes saved and redirected to dashboard

### Deleting a Blog

1. From dashboard, click **Delete** (trash icon)
2. Confirm deletion in popup
3. Blog removed from list

### Viewing a Blog

1. Click **View** (eye icon) to open blog in new tab
2. See how it appears to public users

---

## 🎯 API Integration

The admin panel integrates with the blog API:

### Create Blog
```javascript
POST /api/blogs
{
  title: "Blog Title",
  author: "Author Name",
  image: "https://...",
  description: "Blog content",
  date: "2024-01-11T..."
}
```

### Update Blog
```javascript
PUT /api/blogs/:id
{
  title: "Updated Title",
  author: "Author Name",
  image: "https://...",
  description: "Updated content"
}
```

### Delete Blog
```javascript
DELETE /api/blogs/:id
```

---

## 🎨 Design System

The admin panel follows the existing site theme:

### Colors
- **Primary:** `#4A8EBC` (Blue)
- **Secondary:** `#3B5488` (Dark Blue)
- **Text:** `#1A2A44` (Dark Navy)
- **Background:** `#F5FAFF` (Light Blue)

### Components
- **Buttons:** Gradient from primary to secondary
- **Cards:** White with backdrop blur
- **Hover Effects:** Translate and shadow transitions
- **Loading Spinners:** Branded color spinner

---

## 📱 Responsive Design

- ✅ **Desktop:** Full-featured dashboard with table view
- ✅ **Tablet:** Responsive columns and adjusted spacing
- ✅ **Mobile:** Stacked layouts and touch-friendly buttons

---

## 🔧 Customization

### Changing Admin Credentials

Edit `src/Store/useAuthStore.js`:

```javascript
ADMIN_USERNAME: 'your-username',
ADMIN_PASSWORD: 'your-password',
```

**⚠️ Important:** In production, implement proper backend authentication!

### Adding More Admin Users

Currently supports single admin. To add multi-user:

1. Create users table in backend
2. Add login API endpoint
3. Update `useAuthStore.login()` to call API
4. Store JWT token instead of hardcoded check

### Customizing Dashboard

Edit `src/components/AdminDashboard.jsx`:

- Add more stat cards
- Customize table columns
- Add filters/search
- Implement pagination

---

## 🚀 Deployment Notes

### Before Production:

1. **Change Credentials:**
   - Update default password
   - Use environment variables

2. **Implement Backend Auth:**
   - Create `/api/auth/login` endpoint
   - Use JWT tokens
   - Add refresh token logic

3. **Add Security:**
   - Rate limiting on login
   - CSRF protection
   - XSS sanitization

4. **Update baseURL:**
   - Change `axios.js` baseURL to production API
   - Update CORS settings

---

## 📋 Future Enhancements

### Suggested Features:
- [ ] Rich text editor (TinyMCE/Quill)
- [ ] Image upload (not just URL)
- [ ] Draft/Publish status
- [ ] Blog categories/tags
- [ ] SEO meta fields
- [ ] Analytics dashboard
- [ ] User management
- [ ] Role-based permissions
- [ ] Blog scheduling
- [ ] Comment moderation
- [ ] Bulk actions
- [ ] Export/Import blogs

---

## 🐛 Troubleshooting

### Can't Login
- Check credentials match `useAuthStore.js`
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors

### Blog Not Saving
- Ensure backend is running on `localhost:5000`
- Check Network tab for API errors
- Verify blog schema matches backend

### Not Redirecting After Login
- Check `isAuthenticated` in React DevTools
- Verify routes in `App.jsx`
- Clear browser cache

### Changes Not Persisting
- Check localStorage in DevTools
- Verify Zustand persist middleware
- Clear and re-login

---

## 📞 Support

For issues or feature requests, contact the development team.

---

## ✅ Quick Start Checklist

- [ ] Navigate to `/admin/login`
- [ ] Login with `admin / NDH@2024`
- [ ] Verify dashboard loads
- [ ] Create a test blog
- [ ] Edit the test blog
- [ ] Delete the test blog
- [ ] Test logout and re-login
- [ ] Verify session persists after browser refresh

---

**Admin Panel Version:** 1.0.0  
**Last Updated:** January 11, 2026  
**Theme:** NDH Technologies Brand
