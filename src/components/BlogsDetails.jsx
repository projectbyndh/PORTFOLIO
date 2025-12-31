// src/components/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBlogStore from "../Store/BlogStore";
import React from "react";
import Footer from "./Footer";

// Dummy blogs for fallback (sync with Blogsection)
const dummyBlogs = [
  {
    _id: '1700000000001',
    title: 'How to Build a Modern React App',
    content: 'Learn the essentials of building a modern React application with best practices, hooks, and state management. This guide covers everything you need to get started quickly.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_45lUhXYOommHgxXd0_IWSp8FQ06wA0PaPSoDL4FasAXvA_ju9wWVZiJ4l__EoGOK1G2tA8b-dEQa-s0CnqgQ7xh9eeoeWUuByVMTDWN93SG3t71rtuUn7rHzxgg-hABgLN5clLBIWPEu9BXuf1y3H4xljah2T-8Kqo2Ih-GhuTai47PjnGAZPkPWfOAe/s2681/Imagen4.jpg',
  },
  {
    _id: '1700000000002',
    title: 'Understanding Zustand for State Management',
    content: 'Zustand is a fast and simple state management solution for React. Discover how to use Zustand effectively in your next project.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_45lUhXYOommHgxXd0_IWSp8FQ06wA0PaPSoDL4FasAXvA_ju9wWVZiJ4l__EoGOK1G2tA8b-dEQa-s0CnqgQ7xh9eeoeWUuByVMTDWN93SG3t71rtuUn7rHzxgg-hABgLN5clLBIWPEu9BXuf1y3H4xljah2T-8Kqo2Ih-GhuTai47PjnGAZPkPWfOAe/s2681/Imagen4.jpg',
  },
  {
    _id: '1700000000003',
    title: 'Deploying Vite Apps on Hostinger',
    content: 'A step-by-step guide to deploying your Vite-powered React SPA on Hostinger shared hosting, including routing and asset fixes.',
    image: 'https://images.g2crowd.com/uploads/product/image/d2295191ae7e31fe5bb82cb311c7cb95/hostinger.png',
  },
  {
    _id: '1700000000004',
    title: '7 Sales Psychology Principles to Master as a Digital Marketer',
    content: `Introduction\nThe secret to each top-performing campaign is knowing how humans act. Techniques and technology evolve, but human psychology remains the same. In this article, I'll share the top sales psychology takeaways I learned on a digital marketing course — and how you can apply them ethically to drive engagement, conversions, and customer loyalty.\n\n1. The Power of Reciprocity\nPsychological Insight: People have a desire to repay a favor.\nMarketing Application: Deliver value first — e.g., a free ebook, checklist, or premium content — and then ask for something in return, such as an email address or sale.\nExample: HubSpot's set of free templates creates good will, increasing the chances users will ultimately purchase their CRM software.\n\n2. Curiosity Drives Clicks\nPsychological Insight: We are wired to seek closure when presented with information deficiency.\nMarketing Application: Use open loops and stimulating headlines to make readers curious.\nExample: 'You're Losing Sales Because of This One Mistake' makes you click to learn what the mistake is.\n\n3. Scarcity Creates Urgency\nPsychological Insight: We are scared of losing out on limited opportunities.\nMarketing Application: Use time-sensitive offers, low-stock alerts, or countdown timers to elicit quicker decisions.\nExample: Amazon's 'Only 3 left in stock' urges customers to act quickly.\n\n4. Social Proof Builds Trust\nPsychological Insight: We refer to others when uncertain.\nMarketing Application: Emphasize testimonials, reviews, user base, or influencer endorsement.\nExample: 'Over 1 million users trust Grammarly' immediately builds confidence.\n\n5. Anchoring for Perceived Value\nPsychological Insight: Our brain calculates prices according to the first number we notice.\nMarketing Application: Show a big anchor price next to your offer so the deal will sound like a bargain.\nExample: 'Originally $299, now $99' frames the product as high value at a reduced price.\n\n6. The Decoy Effect (Three-Box Strategy)\nPsychological Insight: People like to choose the middle item when offered three.\nMarketing Application: Price your offerings in three tiers, with the middle one as 'best value.'\nExample: SaaS vendors generally price as Basic, Pro (highlighted), and Premium.\n\n7. Consistency Builds Loyalty\nPsychological Observation: Once they've committed, people strive to stay consistent.\nMarketing Use: Start off small like a newsletter sign-up, which can be escalated to larger conversions.\nExample: A free 7-day challenge gets users on board before selling them a full course.\n\nConclusion\nSales psychology isn’t about manipulation — it’s about understanding and ethically influencing behavior. When applied with empathy and integrity, these principles can dramatically improve your marketing results. Whether you’re writing copy, designing funnels, or crafting offers, embedding psychology makes your message resonate deeper and convert better.`,
    image: 'https://fiveringsmarketing.com/wp-content/uploads/2023/11/Psychology-of-Sales-Five-Proven-Tips-1024x569.png',
  },
];

export default function BlogDetails() {
  const { selectedBlog, fetchBlogById, loading } = useBlogStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageError, setIsImageError] = useState(false);

  // Extract ID from query parameter
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // Local state for dummy blog fallback
  const [dummyBlog, setDummyBlog] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBlogById(id);
      // Fallback for dummy blogs
      const found = dummyBlogs.find((b) => b._id === id);
      setDummyBlog(found || null);
    }
  }, [id, fetchBlogById]);

  // Handle image load error
  const handleImageError = (e) => {
    setIsImageError(true);
    e.target.src = "/placeholder.svg?height=384&width=768";
  };

  // Prefer selectedBlog from store, fallback to dummyBlog
  const blog = selectedBlog || dummyBlog;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF] font-sans text-[#1A2A44] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#3B5488]/10 animate-pulse-slow"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto p-6 py-16 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2 text-[#4A8EBC] hover:text-[#3B5488] font-semibold mb-8 transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">← Back to Blogs</span>
        </button>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#4A8EBC]/20 border-t-[#4A8EBC] rounded-full animate-spin mx-auto"></div>
            <p className="text-[#4A8EBC] text-lg bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow mt-4 animate-pulse">
              Loading...
            </p>
          </div>
        )}

        {/* Blog Content */}
        {!loading && blog && (
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Title */}
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-6">
              {blog.title}
            </h1>

            {/* Image */}
            {blog.image && !isImageError ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-96 bg-[#4A8EBC]/10 flex items-center justify-center rounded-lg mb-6">
                <img
                  src="/placeholder.svg?height=384&width=768"
                  alt="No Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="text-[#2B4066]/80">
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Not Found State */}
        {!loading && !blog && id && (
          <div className="text-center py-20 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-4">
              Blog Not Found
            </h3>
            <p className="text-[#2B4066]/80">The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  );
}