interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
};

export default PostCard;
