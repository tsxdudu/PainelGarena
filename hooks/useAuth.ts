import { useState } from 'react';

type UseApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchInfo: (uid: string) => Promise<void>;
};

export function useAuth<T = any>(): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = async (uid: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://glob-info2.vercel.app/info?uid=${uid}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const dataAuth = await response.json();
      setData(dataAuth);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchInfo };
}