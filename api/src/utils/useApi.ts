import { useState, useEffect, useRef } from 'react';

const cache: Record<string, any> = {};

export function useApi(resource: string, options?: RequestInit) {
  const [data, setData] = useState<any>(cache[resource] || null);
  const [loading, setLoading] = useState(!cache[resource]);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (cache[resource]) {
      setData(cache[resource]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    controllerRef.current = new AbortController();
    fetch(resource, { ...options, signal: controllerRef.current.signal })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        cache[resource] = json;
        setData(json);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    return () => controllerRef.current?.abort();
  }, [resource, JSON.stringify(options)]);

  return { data, loading, error };
}
