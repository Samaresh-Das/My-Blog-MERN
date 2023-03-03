import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PostList from "./components/Posts/PostList";
import PostDetail from "./components/Posts/PostDetail";
import CreatePost from "./components/Posts/CreatePost";
import Auth from "./components/Auth/Auth";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import Profile from "./components/User/Profile";

function App() {
  const { login, logout, token, userId } = useAuth();

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
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
}

function Routes() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && <Navbar />}
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
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    </>
  );
}

export default App;
