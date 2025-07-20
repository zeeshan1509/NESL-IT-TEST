export const staticPosts = Array.from({ length: 555 }, (_, i) => ({
  id: `p${i + 1}`,
  title: `Welcome to the Feed! #${i + 1}`,
  content: `This is post number ${i + 1}. Enjoy your feed!`,
  author: i % 2 === 0 ? 'Admin' : 'User',
  date: new Date(Date.now() - i * 3600 * 1000).toLocaleString()
}));
