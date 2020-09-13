import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Author from "./pages/Author";
import PostPage from "./pages/PostPage";
import PageErrorBoundary from "./Components/PageErrorBoundary";
import AddPosts from "./pages/AddPosts";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <PageErrorBoundary>
            <Home />
          </PageErrorBoundary>
        </Route>
        <Route exact path="/posts/:id">
          <PageErrorBoundary>
            <PostPage />
          </PageErrorBoundary>
        </Route>
        <Route path="/authors">
          <PageErrorBoundary>
            <Author />
          </PageErrorBoundary>
        </Route>
        <Route path="/add-posts">
          <PageErrorBoundary>
            <AddPosts />
          </PageErrorBoundary>
        </Route>
      </Switch>
    </>
  );
}
