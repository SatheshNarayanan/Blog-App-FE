import React, { useEffect, useState } from "react";
import Post from "../Components/Posts";
import ReactLoading from "react-loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://blog-sathesh.netlify.app/"
      }
    };
    fetch("https://blog-sathesh.herokuapp.com/posts", config)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setloading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="row justify-content-center align-items-center"
        style={{
          maxWidth: "100vw",
          marginTop: "13%"
        }}
      >
        <ReactLoading
          type="spin"
          color="#7e8a97"
          height={"10%"}
          width={"10%"}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 id="title" className="mb-5">
        Welcome To Blog!
      </h1>
      {posts.map((post, index) => {
        return (
          <Post
            id={post._id}
            key={index}
            title={post.title}
            author={post.author.name}
            content={post.content}
            isSummary
          />
        );
      })}
    </div>
  );
};

export default Home;
