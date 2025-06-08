"use client"
import React from "react"
import { useParams, Link } from "react-router-dom"

function BlogDetails() {
  const { id } = useParams()

  // Mock blog data (replace with API call or data source in a real app)
  const blogs = [
    {
      id: 1,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 5, 2025",
      author: "John Doe",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Key Trends in 2025</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
    {
      id: 2,
      title: "Building Scalable Web Applications",
      excerpt: "Learn best practices for creating robust and scalable web applications.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 3, 2025",
      author: "Jane Smith",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Scalability Best Practices</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
    {
      id: 3,
      title: "AI and Machine Learning Demystified",
      excerpt: "A beginner's guide to understanding AI and its real-world applications.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 1, 2025",
      author: "Alex Johnson",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Understanding AI Basics</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
    {
      id: 4,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 5, 2025",
      author: "John Doe",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Emerging Innovations</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
    {
      id: 5,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 5, 2025",
      author: "John Doe",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Tech Predictions</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
    {
      id: 6,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=400&width=800",
      date: "June 5, 2025",
      author: "John Doe",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Future Insights</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
  ]

  const blog = blogs.find((b) => b.id === parseInt(id))

  if (!blog) {
    return (
      <div className="w-full bg-[#F5FAFF] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1A2A44]">Blog Not Found</h2>
          <p className="mt-4 text-[#2B4066]/80">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-block text-[#4A8EBC] font-medium hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F5FAFF] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
            {blog.title}
          </h1>
          <div className="mt-4 flex justify-center items-center text-sm text-[#2B4066]/60">
            <span>{blog.author}</span>
            <span className="mx-2">•</span>
            <span>{blog.date}</span>
          </div>
        </div>

        {/* Blog Image */}
        <div className="mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-sm"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=400&width=800"
            }}
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-[#2B4066]">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Back to Blog Link */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-block text-[#4A8EBC] font-medium hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails