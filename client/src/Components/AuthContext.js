import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: localStorage.getItem("Login") === "true",
  userEmail: localStorage.getItem("Email") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userEmail: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (email) => {
    dispatch({ type: "LOGIN", payload: { email } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
