import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/travelData';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-20 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#E53935]" />
              <span>Travel Guides & Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight">
              Latest Industry Insights & Advisories
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Stay ahead with verified airline policies, international visa updates, and insider tips from our travel coordinators.
            </p>
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#071A3D]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#071A3D] font-heading group-hover:text-[#E53935] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">By {post.author}</span>
                  <button
                    onClick={() => setActivePost(post)}
                    className="text-xs font-bold text-[#071A3D] group-hover:text-[#E53935] flex items-center gap-1 transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-lg bg-red-100 text-[#D62828] text-xs font-bold uppercase">
              {activePost.category}
            </span>

            <h3 className="text-2xl font-black text-[#071A3D] font-heading mt-3 mb-2">
              {activePost.title}
            </h3>

            <div className="text-xs text-gray-400 mb-6 flex items-center gap-3">
              <span>{activePost.date}</span>
              <span>•</span>
              <span>{activePost.author}</span>
              <span>•</span>
              <span>{activePost.readTime}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-60">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900">{activePost.excerpt}</p>
              <p>
                When planning commercial international travel or sacred pilgrimages, timing and documentation accuracy are paramount. T4TICKETS continuously monitors global consular advisories, codeshare agreement adjustments, and health protocols across more than 150 nations.
              </p>
              <p>
                Our specialized travel teams coordinate directly with the General Authority of Civil Aviation (GACA) and international IATA hubs to secure seat inventory and priority check-in rights for our clients.
              </p>
              <div className="p-4 rounded-xl bg-[#F7F8FA] border border-gray-200 text-xs text-gray-600">
                <strong>Need custom visa advice or itinerary planning?</strong> Contact our Asir regional desks or reach out via WhatsApp at +966 50 267 4930.
              </div>
            </div>

            <button
              onClick={() => setActivePost(null)}
              className="mt-6 w-full py-3 rounded-xl bg-[#071A3D] text-white text-xs font-bold hover:bg-[#0D2C63]"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
