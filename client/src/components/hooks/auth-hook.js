import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 180);
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(false);
    setTokenExpiration(null);
    setUserId(null);
    // history.push("/");
    localStorage.removeItem("userData");
    localStorage.removeItem("userPhoto");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  return {
    token,
    login,
    logout,
    userId,
  };
};
