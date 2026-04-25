import { useEffect, useState } from "react";

export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    setState((current) => ({ ...current, loading: true }));
    fetcher()
      .then((response) => {
        if (mounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (mounted) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}
