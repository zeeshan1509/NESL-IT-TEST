import { useState, useEffect, useRef, useCallback } from 'react';
import { getPosts } from '../api/feed';
import { useAuth } from './useAuth';

export const useFeed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!token || !hasMore) return;
    setLoading(true);
    setError(null);
    getPosts(token, page, 10)
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(prev => [...prev, ...data.posts]);
          setHasMore(data.posts.length === 10);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load posts');
      })
      .finally(() => setLoading(false));
  }, [token, page, hasMore]);

  const lastPostRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return { posts, loading, error, lastPostRef };
};
