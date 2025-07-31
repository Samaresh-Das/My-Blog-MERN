import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PostList from "./components/Posts/PostList";
import PostDetail from "./components/Posts/PostDetail";
import CreatePost from "./components/Posts/CreatePost";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import Profile from "./components/User/Profile";
import UpdatePost from "./components/Posts/UpdatePost";
import BackgroundBlobs from "./components/BackgroundBlobs";

function App() {
  const { login, logout, token, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/create" exact>
          <CreatePost />
        </Route>
        <Route path="/update/:postId" exact>
          <UpdatePost />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/" exact>
          <PostList />
        </Route>
        <Route path="/post/:postId" exact>
          <PostDetail />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <PostList />
        </Route>
        <Route path="/post/:postId" exact>
          <PostDetail />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="*" exact>
          <Auth />
        </Route>
        {/* <Redirect to="/auth" exact /> */}
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {/* <BackgroundBlobs /> */}
      <Router>
        <div className="relative min-h-screen overflow-hidden">
          <BackgroundBlobs />
          <Navbar />
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
