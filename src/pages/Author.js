import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Author from "./indiAuthor";
import useAuthor from "../hooks/useAuthor";
import ReactLoading from "react-loading";

const Authors = () => {
  const { authors, loading } = useAuthor();

  let { path } = useRouteMatch();

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
      <ul>
        {authors.map((author, index) => {
          return (
            <li key={index}>
              <NavLink to={`${path}/${author._id}`}>{author.name}</NavLink>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route path={`${path}/:authorId`}>
          <Author />
        </Route>
      </Switch>
    </div>
  );
};

export default Authors;
