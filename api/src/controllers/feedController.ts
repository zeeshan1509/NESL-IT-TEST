import { Request, Response } from 'express';
import { staticPosts } from '../utils/staticPosts';

export const getPosts = (req: Request, res: Response) => {
  // Simple auth check
  if (!(req as any).user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = staticPosts.slice(start, end);

  res.json({
    posts: paginatedPosts,
    page,
    total: staticPosts.length
  });
};

export const staticPostsData = staticPosts;
