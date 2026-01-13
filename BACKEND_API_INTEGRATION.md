# Backend API Integration Guide

This document outlines the complete backend API integration for the blog CRUD operations in the NDH Technologies portfolio admin panel.

## 🎯 Overview

The application now supports full CRUD (Create, Read, Update, Delete) operations for blog management with seamless backend API integration and automatic fallback to local data.

## 🔧 Frontend Configuration

### Axios Instance Setup
**File**: `src/api/axios.js`

```javascript
baseURL: 'http://localhost:5000'
```

The axios instance is configured to:
- Add authentication tokens automatically from localStorage
- Handle errors globally
- Set appropriate headers for different content types

## 📡 Required Backend API Endpoints

Your backend server should implement the following REST API endpoints:

### 1. **GET /api/blogs**
Fetch all blogs

**Response**:
```json
[
  {
    "_id": "unique-id",
    "title": "Blog Title",
    "author": "Author Name",
    "image": "https://image-url.jpg",
    "description": "Blog content/description",
    "content": "Full blog content",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
]
```

### 2. **GET /api/blogs/:id**
Fetch a single blog by ID

**Parameters**:
- `id` (string): Blog ID

**Response**:
```json
{
  "_id": "unique-id",
  "title": "Blog Title",
  "author": "Author Name",
  "image": "https://image-url.jpg",
  "description": "Blog content",
  "content": "Full content",
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

### 3. **POST /api/blogs**
Create a new blog

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "New Blog Title",
  "author": "Author Name",
  "image": "https://image-url.jpg",
  "description": "Blog content",
  "content": "Full blog content",
  "date": "2024-01-15T00:00:00.000Z"
}
```

**Response**:
```json
{
  "_id": "newly-created-id",
  "title": "New Blog Title",
  "author": "Author Name",
  "image": "https://image-url.jpg",
  "description": "Blog content",
  "content": "Full blog content",
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

### 4. **PUT /api/blogs/:id**
Update an existing blog

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parameters**:
- `id` (string): Blog ID to update

**Request Body**:
```json
{
  "title": "Updated Blog Title",
  "author": "Author Name",
  "image": "https://new-image-url.jpg",
  "description": "Updated content",
  "content": "Updated full content",
  "date": "2024-01-15T00:00:00.000Z"
}
```

**Response**:
```json
{
  "_id": "blog-id",
  "title": "Updated Blog Title",
  "author": "Author Name",
  "image": "https://new-image-url.jpg",
  "description": "Updated content",
  "content": "Updated full content",
  "date": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-16T00:00:00.000Z"
}
```

### 5. **DELETE /api/blogs/:id**
Delete a blog

**Headers**:
```
Authorization: Bearer <token>
```

**Parameters**:
- `id` (string): Blog ID to delete

**Response**:
```json
{
  "message": "Blog deleted successfully",
  "deletedId": "blog-id"
}
```

### 6. **POST /api/upload/image**
Upload an image file for blogs

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body** (FormData):
```
image: <File>
```

**Response**:
```json
{
  "url": "/uploads/filename.jpg",
  "imageUrl": "/uploads/filename.jpg"
}
```

**Example Response**:
```json
{
  "url": "/uploads/1735862456789-blog-image.jpg",
  "imageUrl": "/uploads/1735862456789-blog-image.jpg"
}
```

**Notes**:
- Images are served statically at: `http://localhost:5000/uploads/filename.jpg`
- Supported formats: jpeg, jpg, png, gif, webp
- Max file size: 10MB
- If this endpoint is not available, the frontend falls back to base64 local storage

## 🔐 Authentication

The frontend automatically includes the authentication token in all API requests:

```javascript
Authorization: Bearer <token-from-localStorage>
```

The token is stored in localStorage with the key `'token'` when users log in through the admin panel.

## 🎨 Frontend Components

### 1. **BlogEditor Component**
**File**: `src/components/BlogEditor.jsx`

Features:
- Create new blogs
- Edit existing blogs
- **Smart Image Handling**: 
  - Tries backend upload first (`/api/upload/image`)
  - Falls back to base64 local storage if backend unavailable
  - Supports both file upload and URL input
- Real-time preview
- Form validation
- Error handling with user-friendly messages

### 2. **AdminDashboard Component**
**File**: `src/components/AdminDashboard.jsx`

Features:
- View all blogs in a table
- Create new blog button
- Edit blog (redirects to BlogEditor)
- Delete blog with confirmation
- Refresh blogs manually
- Loading states for all operations
- Statistics dashboard

### 3. **Blog Store (Zustand)**
**File**: `src/Store/useBlogStore.js`

State management for:
- `blogs` - Array of all blogs
- `selectedBlog` - Currently selected blog (for editing)
- `loading` - Loading state
- `error` - Error messages

Actions:
- `fetchBlogs()` - Get all blogs
- `fetchBlogById(id)` - Get single blog
- `createBlog(blogData)` - Create new blog
- `updateBlog(id, blogData)` - Update existing blog
- `deleteBlog(id)` - Delete blog
- `uploadImage(file)` - **Smart image upload with fallback**

## 🔄 Smart Image Handling System

The blog system now supports **dual-mode image handling**:

### Mode 1: Backend Upload (Preferred)
```
User selects image → Upload to /api/upload/image → 
  → Get server URL → Store in blog → 
  → Image served from /uploads/filename.jpg
```

### Mode 2: Local Storage (Fallback)
```
User selects image → Backend unavailable → 
  → Convert to base64 → Store in blog data → 
  → Image embedded directly in HTML
```

### Benefits:
- ✅ **Works with backend**: Proper file storage and serving
- ✅ **Works without backend**: Complete offline functionality
- ✅ **Seamless transition**: No user-visible difference
- ✅ **Clean console**: No error messages when backend unavailable

## 🔄 Fallback Mechanism

The application includes a smart fallback system:

1. **API Available**: Uses backend API for all operations
2. **API Unavailable**: 
   - Falls back to demo data for read operations
   - Stores new/updated blogs locally with `local-` prefix IDs
   - Shows appropriate badges for local vs. server data

This ensures the app works even when the backend is not available, making it great for demos and development.

## 🚀 Getting Started

### Backend Setup (Required for Production)

1. Set up your backend server on port 5000
2. Implement all the API endpoints listed above
3. Configure CORS to allow requests from your frontend domain
4. Set up authentication middleware for protected routes
5. Configure file upload handling for image uploads

### Frontend Configuration

1. Update the `baseURL` in `src/api/axios.js` if your backend runs on a different port or domain:

```javascript
const axiosInstance = axios.create({
  baseURL: 'https://your-backend-domain.com', // Update this
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

2. Ensure authentication token is properly stored after login:

```javascript
localStorage.setItem('token', yourAuthToken);
```

## 📊 Data Flow

### Creating a Blog:
```
User fills form → Click Submit → 
  → Upload image (if file selected) → 
  → Send blog data to POST /api/blogs → 
  → Update local store → 
  → Navigate to dashboard
```

### Editing a Blog:
```
User clicks Edit → 
  → Fetch blog by ID (GET /api/blogs/:id) → 
  → Populate form → 
  → User updates → 
  → Upload new image (if changed) → 
  → Send updated data to PUT /api/blogs/:id → 
  → Update local store → 
  → Navigate to dashboard
```

### Deleting a Blog:
```
User clicks Delete → 
  → Confirmation dialog → 
  → DELETE /api/blogs/:id → 
  → Remove from local store → 
  → Refresh blog list
```

## 🛠️ Backend Setup (Optional)

If you want to enable proper image uploads instead of base64 storage, set up your backend with:

### 1. **Install Dependencies**
```bash
npm install multer
```

### 2. **Create Upload Middleware** (`middleware/upload.js`)
```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

module.exports = upload;
```

### 3. **Add Route** (`routes/blogRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Image upload endpoint
router.post('/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the URL path for the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      url: imageUrl,
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### 4. **Serve Static Files** (`index.js`)
```javascript
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

### 5. **Use in Main App**
```javascript
const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);
```

## 🎯 Testing Image Upload

### With Backend (curl):
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -F "image=@/path/to/your/blog-image.jpg"
```

**Response:**
```json
{
  "url": "/uploads/1735862456789-blog-image.jpg",
  "imageUrl": "/uploads/1735862456789-blog-image.jpg",
  "filename": "1735862456789-blog-image.jpg"
}
```

### Without Backend:
The system automatically falls back to base64 local storage with no errors.

## 🐛 Troubleshooting

### CORS Errors
Add CORS headers to your backend:
```javascript
// Express example
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

### 401 Unauthorized
- Ensure the auth token is valid
- Check if the token is being sent in the Authorization header
- Verify backend authentication middleware

### Image Upload Fails
- Check file size limits on backend
- Verify multipart/form-data handling
- Ensure correct field name ('image')
- Check backend storage configuration

## 📝 Example Backend (Node.js/Express)

```javascript
const express = require('express');
const router = express.Router();
const Blog = require('./models/Blog');
const auth = require('./middleware/auth');
const upload = require('./middleware/upload');

// Get all blogs
router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog
router.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog
router.post('/api/blogs', auth, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog
router.put('/api/blogs/:id', auth, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog
router.delete('/api/blogs/:id', auth, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully', deletedId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload image
router.post('/api/upload/image', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ url: req.file.path, imageUrl: req.file.path });
});

module.exports = router;
```

## 🎉 Features Implemented

✅ Complete CRUD operations for blogs
✅ **Smart Image Handling**: Backend upload with local storage fallback
✅ Authentication token handling
✅ Error handling and user feedback
✅ Loading states for all operations
✅ Confirmation dialogs for destructive actions
✅ Automatic fallback to demo data
✅ Responsive admin dashboard
✅ Real-time blog preview
✅ Form validation
✅ Public blog listing and detail pages
✅ **Offline-capable**: Works without backend server

## 🔗 Related Files

- `src/api/axios.js` - API configuration
- `src/Store/useBlogStore.js` - State management
- `src/components/BlogEditor.jsx` - Create/Edit UI
- `src/components/AdminDashboard.jsx` - Admin panel
- `src/components/Blogsection.jsx` - Public blog list
- `src/components/BlogsDetails.jsx` - Public blog detail

---

For questions or issues, please refer to the main project documentation or contact the development team.
