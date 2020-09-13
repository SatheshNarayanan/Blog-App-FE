import { useState, useEffect } from "react";

const useAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://blog-sathesh.netlify.app/"
      }
    };
    fetch("https://blog-sathesh.herokuapp.com/author", config)
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data.authors);
        setloading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return { authors, loading };
};

export default useAuthor;
