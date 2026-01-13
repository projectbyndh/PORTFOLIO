import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

/**
 * ImageUploadPreview Component
 * Handles file selection, preview, and upload functionality
 */
const ImageUploadPreview = ({
  currentImage = '',
  onImageUpload,
  onImageRemove,
  uploading = false,
  className = ''
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const fileInputRef = useRef(null);

  // Update preview when currentImage changes
  useEffect(() => {
    setPreviewUrl(currentImage);
  }, [currentImage]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (selectedFile && onImageUpload) {
      try {
        const result = await onImageUpload(selectedFile);
        // Clear selected file after successful upload
        setSelectedFile(null);
        // Keep the preview URL as it should now be the uploaded image
      } catch (error) {
        // Error is handled by the parent component
        console.error('Upload failed:', error);
      }
    }
  };

  // Handle remove
  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageRemove) {
      onImageRemove();
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Image Preview */}
      <div className="relative">
        {previewUrl ? (
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallbackIcon = e.target.parentElement.querySelector('.fallback-icon');
                if (fallbackIcon) {
                  fallbackIcon.style.display = 'flex';
                }
              }}
            />
            <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center fallback-icon hidden">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload placeholder
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">Click to select image</p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Button */}
      {selectedFile && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Image
              </>
            )}
          </button>
          <span className="text-sm text-gray-600 truncate">
            {selectedFile.name}
          </span>
        </div>
      )}

      {/* Current Image Info */}
      {currentImage && !selectedFile && (
        <div className="text-sm text-gray-600">
          Current image: {currentImage.split('/').pop()}
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;