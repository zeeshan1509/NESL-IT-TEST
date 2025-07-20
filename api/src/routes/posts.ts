import { Router } from 'express';
import { deletePost } from '../controllers/postController';
import { getPosts } from '../controllers/feedController';
import { authorize } from '../middleware/authorize';


const router = Router();

router.get('/posts', authorize(['admin', 'user']), getPosts);
router.delete('/posts/:id', authorize(['admin']), deletePost);

export default router;
