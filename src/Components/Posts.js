import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

const Post = (props) => {
  const history = useHistory();

  const openPost = () => {
    history.push(`/posts/${props.id}`);
  };

  return (
    <div className="container">
      <Card className="my-3">
        <CardBody>
          <CardTitle>
            <h3>{props.title}</h3>
          </CardTitle>
          <CardText>
            {props.isSummary
              ? `${props.content.substring(0, 100)}...`
              : props.content}
          </CardText>
          {props.isSummary ? (
            <Button onClick={openPost}> Read More</Button>
          ) : null}{" "}
        </CardBody>
        <CardFooter>- {props.author}</CardFooter>
      </Card>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isSummary: PropTypes.bool.isRequired
};

export default Post;
