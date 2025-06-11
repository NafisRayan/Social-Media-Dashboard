import React, { useState } from 'react';
import { Calendar, Clock, Image, FileText, Plus, Filter } from 'lucide-react';
import { samplePosts } from '../../data/sampleData';

const ContentManagement: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredPosts = samplePosts.filter(post => {
    if (selectedFilter === 'all') return true;
    return post.status === selectedFilter;
  });

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Post Schedule
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {timeSlots.map((time) => {
              const postsAtTime = samplePosts.filter(post => {
                const postTime = new Date(post.scheduledTime);
                const postHour = postTime.getHours().toString().padStart(2, '0');
                return `${postHour}:00` === time && 
                       postTime.toISOString().split('T')[0] === selectedDate;
              });

              return (
                <div key={time} className="flex items-start space-x-3 py-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-16 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {time}
                  </div>
                  <div className="flex-1">
                    {postsAtTime.length > 0 ? (
                      postsAtTime.map(post => (
                        <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                              {post.status}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {post.platform}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 dark:text-gray-500 text-sm italic">
                        No posts scheduled
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Library */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Content Library
              </h3>
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            <div className="flex space-x-2 mb-4">
              {['all', 'draft', 'scheduled', 'published'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors duration-200 ${
                    selectedFilter === filter
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[post.status]}`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.platform}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(post.scheduledTime).toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Media Library
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
              Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;