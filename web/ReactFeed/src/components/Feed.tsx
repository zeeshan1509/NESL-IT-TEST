import { useFeed } from '../hooks/useFeed';
import React from 'react';

const PostCard = React.memo(({ post }: { post: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4 text-base leading-relaxed">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-500 border-t pt-2 mt-2">
        <span className="font-medium">By {post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
});

const Feed = () => {
  const { posts, loading, error, lastPostRef } = useFeed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">Feed</h1>
          <p className="text-gray-500 text-lg">See what’s new and trending!</p>
        </header>
        <div className="flex flex-col gap-8">
          {posts.map((post, idx) => {
            if (idx === posts.length - 1) {
              return <div ref={lastPostRef} key={post.id}><PostCard post={post} /></div>;
            }
            return <PostCard key={post.id} post={post} />;
          })}
          {loading && <div className="text-center text-gray-500 py-4">Loading...</div>}
          {error && <div className="text-center text-red-600 py-4">Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
