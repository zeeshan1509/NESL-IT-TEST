import { Request, Response } from 'express';

export const deletePost = (req: Request, res: Response) => {
  const postId = req.params.id;
  res.json({ message: `Post ${postId} deleted` });
};
