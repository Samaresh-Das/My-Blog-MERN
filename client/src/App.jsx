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
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";
import AboutMe from "./components/AboutMe";
import ComingSoonModal from "./components/shared/ComingSoonModal";
import { useState } from "react";

function App() {
  const { login, logout, token, userId } = useAuth();

  let routes;

  const [showModal, setShowModal] = useState(false);

  const handleUnsupportedRoute = (e, href) => {
    e.preventDefault();
    setShowModal(true);
  };

  // if (token) {
  //   routes = (
  //     <Switch>
  //       <Route path="/create" exact>
  //         <CreatePost />
  //       </Route>
  //       <Route path="/update/:postId" exact>
  //         <UpdatePost />
  //       </Route>
  //       <Route path="/profile" exact>
  //         <Profile />
  //       </Route>
  //       <Route path="/" exact>
  //         <PostList />
  //       </Route>
  //       <Route path="/post/:postId" exact>
  //         <PostDetail />
  //       </Route>
  //     </Switch>
  //   );
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         <PostList />
  //       </Route>
  //       <Route path="/post/:postId" exact>
  //         <PostDetail />
  //       </Route>
  //       <Route path="/auth" exact>
  //         <Auth />
  //       </Route>
  //       <Route path="/contact" exact>
  //         <ContactMe />
  //       </Route>
  //       <Route path="*" exact>
  //         <Auth />
  //       </Route>
  //       {/* <Redirect to="/auth" exact /> */}
  //     </Switch>
  //   );
  // }
  if (token) {
    routes = (
      <Switch>
        <Route path="/create" exact component={CreatePost} />
        <Route path="/update/:postId" exact component={UpdatePost} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/contact" exact component={ContactMe} />
        <Route path="/about" exact component={AboutMe} />
        <Route path="/" exact component={PostList} />
        <Route path="/post/:postId" exact component={PostDetail} />
        <Route path="*" exact component={PostList} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/post/:postId" exact component={PostDetail} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/contact" exact component={ContactMe} />
        <Route path="/about" exact component={AboutMe} />
        <Route path="*" exact component={Auth} />
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
        {/* react router by default auto persists scroll area */}
        <ScrollToTop />
        <div className="relative min-h-screen overflow-hidden">
          <BackgroundBlobs />
          <Navbar />
          {routes}
        </div>
        <ComingSoonModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
        <Footer onUnsupportedClick={handleUnsupportedRoute} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

//react hooks for scroll to top
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever path changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
