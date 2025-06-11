import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [],
      selectedBlog: null,
      loading: false,
      error: null,

      fetchBlogs: async () => {
        set({ loading: true, error: null });
        try {
          set({ loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      fetchBlogById: async (id) => {
        set({ loading: true, error: null });
        try {
          const blog = get().blogs.find((b) => b._id === id);
          if (!blog) throw new Error('Blog not found');
          set({ selectedBlog: blog, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      addBlog: async (formData) => {
        set({ loading: true, error: null });
        try {
          const title = formData.get('title');
          const content = formData.get('content');
          const image = formData.get('image');
          let imageBase64 = null;

          if (image && image instanceof File) {
            imageBase64 = await fileToBase64(image);
          }

          const newBlog = {
            _id: Date.now().toString(),
            title,
            content,
            image: imageBase64,
          };

          set((state) => ({
            blogs: [...state.blogs, newBlog],
            loading: false,
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateBlog: async (id, formData) => {
        set({ loading: true, error: null });
        try {
          const title = formData.get('title');
          const content = formData.get('content');
          const image = formData.get('image');
          let imageBase64 = null;

          if (image && image instanceof File) {
            imageBase64 = await fileToBase64(image);
          }

          set((state) => {
            const updatedBlog = {
              _id: id,
              title,
              content,
              image: imageBase64 || state.blogs.find((b) => b._id === id)?.image,
            };
            return {
              blogs: state.blogs.map((blog) =>
                blog._id === id ? updatedBlog : blog
              ),
              selectedBlog: state.selectedBlog?._id === id ? updatedBlog : state.selectedBlog,
              loading: false,
            };
          });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      deleteBlog: async (id) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            blogs: state.blogs.filter((blog) => blog._id !== id),
            selectedBlog: state.selectedBlog?._id === id ? null : state.selectedBlog,
            loading: false,
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: 'blog-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        blogs: state.blogs.map(({ _id, title, content, image }) => ({
          _id,
          title,
          content,
          image,
        })),
        selectedBlog: state.selectedBlog
          ? { _id: state.selectedBlog._id, title: state.selectedBlog.title, content: state.selectedBlog.content, image: state.selectedBlog.image }
          : null,
        loading: state.loading,
        error: state.error,
      }),
    }
  )
);

export default useBlogStore;