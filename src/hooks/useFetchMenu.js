import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

const useFetchMenu = (page) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const request = async () => {
      setError(false);
      setLoading(true);
      try {
        await db.collection("products").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setResults((prevState) => {
              return [...prevState, doc];
            });
          });
        });
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    request();
  }, []);
  return { results, loading, error };
};

export default useFetchMenu;
