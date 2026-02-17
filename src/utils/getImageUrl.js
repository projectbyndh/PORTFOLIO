/**
 * Centralized utility to handle image URLs across the application.
 * Handles Cloudinary URLs, local paths, and provides intelligent fallbacks.
 */
export const getImageUrl = (imagePath, type = 'default') => {
    // 1. Handle missing image path
    if (!imagePath || imagePath.trim() === '') {
        return getFallbackImage(type);
    }

    // 2. Handle known broken placeholder URLs and generic placeholders
    const isPlaceholder =
        imagePath.includes('via.placeholder.com') ||
        imagePath.includes('placeholder.svg') ||
        imagePath.includes('placehold.it') ||
        imagePath.includes('placeholder.com') ||
        imagePath.includes('/placeholder') ||
        imagePath.includes('course-placeholder') ||
        imagePath.includes('instructor-placeholder') ||
        imagePath.includes('default-career') ||
        imagePath.includes('fallback');

    if (isPlaceholder) {
        return getFallbackImage(type);
    }

    // 3. Handle absolute URLs (Cloudinary, external websites, data URIs)
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
    }

    // 4. Handle local backend paths
    // Clean up path separators and ensure leading slash
    let cleanPath = imagePath.replace(/\\/g, '/');
    if (!cleanPath.startsWith('/')) {
        cleanPath = `/${cleanPath}`;
    }

    // Prepend backend URL if in development and path starts with /uploads
    if (window.location.hostname === 'localhost' && cleanPath.startsWith('/uploads')) {
        return `http://localhost:5000${cleanPath}`;
    }

    return cleanPath;
};

/**
 * Returns a high-quality professional fallback image from Unsplash
 * based on the content type.
 */
const getFallbackImage = (type) => {
    const fallbacks = {
        career: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60",
        team: "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?w=400&h=400&auto=format&fit=crop&q=60",
        project: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        service: "https://images.unsplash.com/photo-1454165833767-13143895960b?w=400&h=400&auto=format&fit=crop&q=60",
        blog: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60",
        default: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60"
    };

    return fallbacks[type] || fallbacks.default;
};
