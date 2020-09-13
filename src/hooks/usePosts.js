import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);

  const { params } = useRouteMatch();

  useEffect(() => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://blog-sathesh.netlify.app/"
      }
    };
    fetch(`https://blog-sathesh.herokuapp.com/posts/${params.id}`, config)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.post);
        setloading(false);
      });
  }, [params]);

  return { posts, loading };
};

export default usePosts;
