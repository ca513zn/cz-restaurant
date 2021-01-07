import React, { createContext, useEffect, useReducer } from "react";
import firebase from "../lib/firebase";

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }

    //Change a property in the user's state
    case "UPDATE_USER": {
      const { key, value } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          [key]: value
        }
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "FirebaseAuth",
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const updateUser = ({ key, value }) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        key: key,
        value: value
      }
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Here you should extract the complete user profile to make it available in your entire app.
        // The auth state only provides basic information.
        console.log(user)
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              email: user.email,
              name: user.displayName || user.email
            }
          }
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "FirebaseAuth",
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        updateUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
