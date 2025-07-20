import { useState, useEffect, useRef } from 'react';

interface UseApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  skip?: boolean;
}

const cache = new Map<string, any>();

export function useApi(resource: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resourceKey = JSON.stringify({ resource, options });
  const skip = options.skip;
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (skip) return;
    if (cache.has(resourceKey)) {
      setData(cache.get(resourceKey));
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    abortRef.current = new AbortController();
    fetch(resource, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: abortRef.current.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((json) => {
        cache.set(resourceKey, json);
        setData(json);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message || 'Fetch error');
      })
      .finally(() => setLoading(false));
    return () => abortRef.current?.abort();
  }, [resourceKey, skip]);

  return { data, loading, error };
}
