import express from 'express';
import request from 'supertest';
import { authorize } from '../middleware/authorize';
import { signJwt } from '../utils/jwt';
import { deletePost } from '../controllers/postController';

describe('DELETE /posts/:id', () => {
  const app = express();
  app.use(express.json());
  app.delete('/posts/:id', authorize(['admin']), deletePost);

  const adminToken = signJwt({ id: 'u2', role: 'admin', username: 'admin1', password: 'pass2' });
  const userToken = signJwt({ id: 'u1', role: 'user', username: 'user1', password: 'pass1' });

  it('should allow admin to delete', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Post 123 deleted');
  });

  it('should forbid normal user', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/Forbidden/);
  });

  it('should block missing/invalid token', async () => {
    const res = await request(app)
      .delete('/posts/123');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Missing|Invalid/);
  });
});
