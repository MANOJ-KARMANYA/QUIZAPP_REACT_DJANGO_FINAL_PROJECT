import { useState, useEffect } from 'react';

const useVouchers = (requestUrl, requestMethod, requestBody) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (requestUrl && requestMethod) {
        setIsPending(true);
        setError(null);

        const token = localStorage.getItem('authToken'); 

        const options = {
          method: requestMethod,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '', 
          },
          body: requestBody ? JSON.stringify(requestBody) : null,
        };

        try {
          const response = await fetch(requestUrl, options);
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsPending(false);
        }
      }
    };

    fetchData();
  }, [requestUrl, requestMethod, requestBody]);

  return { data, isPending, error };
};

export default useVouchers;
