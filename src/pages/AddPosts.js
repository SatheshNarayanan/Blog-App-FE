import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import useAuthor from "../hooks/useAuthor";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

const AddPosts = () => {
  const [title, setTitle] = useState({ text: "", isValid: "mediator" });
  const [content, setContent] = useState({ text: "", isValid: "mediator" });
  const [authorId, setauthorId] = useState("");
  const [loading, setloading] = useState(false);
  const { authors } = useAuthor();
  const history = useHistory();

  const titleInput = (e) => {
    let validation = "invalid";
    const text = e.target.value.trimLeft();
    if (text.length >= 10) {
      validation = "valid";
    }
    const data = { text, isValid: validation };
    setTitle(data);
  };
  useEffect(() => {
    setauthorId(authors[0]?._id);
  }, [authors]);

  const contentInput = (e) => {
    let validation = "invalid";
    if (e.target.value.length >= 200) {
      validation = "valid";
    }
    const data = { text: e.target.value, isValid: validation };
    setContent(data);
  };

  const authorInput = (e) => {
    setauthorId(e.target.value);
  };

  const addPosts = (e) => {
    e.preventDefault();
    if (content.isValid === "valid" && title.isValid === "valid") {
      setloading(true);
      const formData = new FormData();
      formData.append("title", title.text);
      formData.append("content", content.text);
      formData.append("authorId", authorId);
      let postDetail = {
        title: title.text,
        content: content.text,
        authorId: authorId
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://blog-sathesh.netlify.app/"
        },
        body: JSON.stringify(postDetail)
      };
      fetch("https://blog-sathesh.herokuapp.com/posts/", config)
        .then((response) => response.json())
        .then((data) => {
          swal("Success", "Post has been added Successfully", "success").then(
            () => {
              setloading(false);
              history.push(`/`);
            }
          );
        })
        .catch((error) => {
          console.log(error);
          swal("Error", "Please check the data", "error");
          setloading(false);
        });
    } else {
      swal("Warning", "Please enter valid data", "warning");
    }
  };
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
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title of the post.."
            value={title.text}
            onChange={titleInput}
            required
            valid={title.isValid === "valid" ? true : false}
            invalid={title.isValid === "invalid" ? true : false}
          />
          <FormFeedback>Title must atleast contain 10 characters</FormFeedback>
        </FormGroup>
    <FormGroup>
            <Label for="authors">Author</Label>
            <Input
              type="select"
              name="authors"
              id="authors"
              onChange={authorInput}
            >
              {authors.map((element, index) => {
                return (
                  <option key={index} id={element._id} value={element._id}>
                    {element.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        <FormGroup>
          <Label for="content">Content </Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            rows="10"
            value={content.text}
            onChange={contentInput}
            placeholder="Content of the post.."
            required
            valid={content.isValid === "valid" ? true : false}
            invalid={content.isValid === "invalid" ? true : false}
          />
          <FormFeedback>
            Content must atleast contain 200 characters
          </FormFeedback>
        </FormGroup>
        <Button type="submit" onClick={addPosts} disabled={loading}>
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPosts;
