import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Post from "../Components/Posts";
import ReactLoading from "react-loading";

const Author = () => {
  const [author, setAuthor] = useState([]);
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
    fetch(
      `https://blog-sathesh.herokuapp.com/posts/author/${params.authorId}`,
      config
    )
      .then((res) => res.json())
      .then((data) => {
        setloading(false);
        setAuthor(data.post);
      });
  }, [params]);

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
    <div>
      {author.map((element, index) => {
        return (
          <Post
            key={index}
            id={element._id}
            author={element.author?.name}
            title={element.title}
            content={element.content}
            isSummary
          />
        );
      })}
    </div>
  );
};

export default Author;
