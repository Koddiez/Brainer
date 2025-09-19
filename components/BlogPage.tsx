import React from 'react';
import { BlogPost } from '../types';
import { blogPosts } from '../constants';

const Tag: React.FC<{tag: string}> = ({ tag }) => {
    const colors: {[key: string]: string} = {
        'EdTech': 'bg-blue-100 text-blue-800',
        'Nigeria': 'bg-green-100 text-green-800',
        'Innovation': 'bg-purple-100 text-purple-800',
        'Study Tips': 'bg-yellow-100 text-yellow-800',
        'Competitions': 'bg-red-100 text-red-800',
        'Success': 'bg-teal-100 text-teal-800',
        'Skills': 'bg-indigo-100 text-indigo-800',
        'Future of Work': 'bg-sky-100 text-sky-800',
        'Education': 'bg-rose-100 text-rose-800',
    };
    return (
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors[tag] || 'bg-gray-100 text-gray-800'}`}>
            #{tag}
        </span>
    );
};


const BlogPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">Brainer Blog</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">Insights, tips, and updates from the world of competitive learning.</p>
      </div>

      <div className="space-y-12">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-shadow hover:shadow-2xl">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{post.date}</span>
              <span className="mx-2">&bull;</span>
              <span>By {post.author}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-3">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => <Tag key={tag} tag={tag} />)}
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Read more &rarr;
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;