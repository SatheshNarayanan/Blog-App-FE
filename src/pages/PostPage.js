import React from "react";
import { useHistory } from "react-router-dom";
import Post from "../Components/Posts";
import { Button } from "reactstrap";
import usePosts from "../hooks/usePosts";
import ReactLoading from "react-loading";

const PostPage = () => {
  const { posts, loading } = usePosts();

  const { goBack } = useHistory();
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
      <Button onClick={goBack} className="mb-5">
        {" "}
        Back{" "}
      </Button>
      <Post
        id={posts._id}
        author={posts.author?.name}
        title={posts.title}
        content={posts.content}
      />
    </div>
  );
};

export default PostPage;
