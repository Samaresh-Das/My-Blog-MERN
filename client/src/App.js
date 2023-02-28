import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PostList from "./components/Posts/PostList";
import PostDetail from "./components/Posts/PostDetail";
import CreatePost from "./components/Posts/CreatePost";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <PostList />
        </Route>
        <Route path="/create" exact>
          <CreatePost />
        </Route>
        <Route path="/post/:postId" exact>
          <PostDetail />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
