# Backend API Integration Guide

## Overview
This project uses **Zustand** for state management and **Axios** for API communication with the backend server running on `http://localhost:5000`.

## Architecture

### 📁 File Structure
```
src/
├── api/
│   └── axios.js          # Axios instance with interceptors
├── Store/
│   └── useBlogStore.js   # Zustand store for blogs
└── components/
    ├── Blogsection.jsx   # Blog listing (uses store)
    └── BlogsDetails.jsx  # Single blog view (uses store)
```

---

## 🔧 Setup

### 1. Install Dependencies
```bash
pnpm install
```

This installs:
- `axios`: ^1.7.9
- `zustand`: ^5.0.3

### 2. Configure Backend URL
The base URL is set in `src/api/axios.js`:
```javascript
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});
```

**Change this to your production API URL when deploying!**

---

## 📡 API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/blogs`       | Fetch all blogs          |
| GET    | `/api/blogs/:id`   | Fetch single blog by ID  |
| POST   | `/api/blogs`       | Create new blog          |
| PUT    | `/api/blogs/:id`   | Update blog by ID        |
| DELETE | `/api/blogs/:id`   | Delete blog by ID        |

---

## 📚 Blog Schema

```javascript
{
  _id: String,           // MongoDB ID
  title: String,         // Blog title
  author: String,        // Author name
  date: Date,            // Publication date
  image: String,         // Image URL
  description: String,   // Blog content/description
  createdAt: Date,       // Auto-generated timestamp
  updatedAt: Date        // Auto-generated timestamp
}
```

---

## 💡 Usage Examples

### Using the Blog Store in Components

```jsx
import useBlogStore from '../Store/useBlogStore';

function MyComponent() {
  const { 
    blogs, 
    selectedBlog, 
    loading, 
    error, 
    fetchBlogs, 
    fetchBlogById 
  } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog._id}>{blog.title}</div>
      ))}
    </div>
  );
}
```

### Creating a New Blog

```jsx
const { createBlog } = useBlogStore();

const handleSubmit = async (formData) => {
  try {
    await createBlog({
      title: formData.title,
      author: formData.author,
      date: new Date(),
      image: formData.imageUrl,
      description: formData.content
    });
    alert('Blog created successfully!');
  } catch (err) {
    alert('Failed to create blog');
  }
};
```

### Updating a Blog

```jsx
const { updateBlog } = useBlogStore();

const handleUpdate = async (id, updates) => {
  try {
    await updateBlog(id, updates);
    alert('Blog updated!');
  } catch (err) {
    alert('Update failed');
  }
};
```

### Deleting a Blog

```jsx
const { deleteBlog } = useBlogStore();

const handleDelete = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await deleteBlog(id);
      alert('Blog deleted!');
    } catch (err) {
      alert('Delete failed');
  }
};
```

---

## 🔐 Authentication (Future)

The axios instance includes interceptors for JWT tokens:

```javascript
// Request interceptor (auto-adds token)
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

To use authentication:
1. Store JWT token in `localStorage` after login
2. All subsequent API calls will automatically include the token

---

## 🚀 Running the Backend

Make sure your backend server is running on `http://localhost:5000` before using the app:

```bash
# In your backend directory
npm start
# or
node server.js
```

---

## 🧪 Testing

### Test with Dummy Data
The components include fallback dummy data that displays when:
- Backend is not running
- API call fails
- No blogs exist in database

### Test API Integration
1. Start backend server
2. Run frontend: `pnpm dev`
3. Open browser console and check for API calls
4. Verify blogs load from backend

---

## 📝 Store Actions Reference

| Action              | Parameters         | Description                      |
|---------------------|-------------------|----------------------------------|
| `fetchBlogs()`      | -                 | Fetch all blogs from API         |
| `fetchBlogById()`   | `id: string`      | Fetch single blog                |
| `createBlog()`      | `blogData: obj`   | Create new blog                  |
| `updateBlog()`      | `id, updates`     | Update existing blog             |
| `deleteBlog()`      | `id: string`      | Delete blog                      |
| `clearSelectedBlog()`| -                | Clear selected blog state        |
| `clearError()`      | -                 | Clear error state                |
| `resetStore()`      | -                 | Reset entire store to defaults   |

---

## 🐛 Troubleshooting

### CORS Errors
Add CORS middleware to your backend:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173' // Vite dev server
}));
```

### Network Errors
Check:
- Backend is running on port 5000
- Firewall allows localhost connections
- Axios baseURL is correct

### Data Not Showing
- Check browser console for errors
- Verify API responses in Network tab
- Ensure blog schema matches frontend expectations

---

## 🔜 Next Steps

1. **Admin Panel**: Create UI for blog CRUD operations
2. **Authentication**: Add login/register for admin users
3. **File Upload**: Implement image upload for blog images
4. **Rich Text Editor**: Add editor for blog content formatting
5. **SEO**: Add meta tags and structured data for blogs
6. **Pagination**: Implement pagination for blog list
7. **Search**: Add blog search functionality

---

## 📞 Support

For issues or questions, contact the development team.
