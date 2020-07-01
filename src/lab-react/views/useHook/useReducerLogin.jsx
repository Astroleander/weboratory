import React, { useReducer, useRef } from "react";
import mockLogin from "@/utils/mock/mockLogin";
/**
 * @src https://juejin.im/post/5d072b0e5188256147327ba7
 */
const initState = {
  name: "",
  pwd: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        name: "",
        pwd: "",
      };
    case "success":
      return {
        ...state,
        name: action.info.name,
        pwd: action.info.pwd,
        isLoggedIn: true,
        isLoading: false,
      };
    case "error":
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        name: "",
        pwd: "",
      };
    case "reset":
      return initState;
    default:
      return state;
  }
};

export default function useReducerLogin() {
  const [state, dispatch] = useReducer(loginReducer, initState);
  const { name, pwd, error, isLoading, isLoggedIn } = state;

  const inputName = useRef();
  const inputPwd = useRef();

  const signIn = (event) => {
    event.preventDefault();
    dispatch({ type: "login" });
    mockLogin({ name: inputName.current.value, pwd: inputPwd.current.value })
      .then((result) => {
        dispatch({
          ...result,
          type: "success" 
        });
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: { error: error.message },
        });
      });
  };
  const signOut = (event) => {
    event.preventDefault();
    dispatch({ type: "logout" });
  };
  const reset = (event) => {
    event.preventDefault();
    inputPwd.current.value = '';
    inputName.current.value = '';
    dispatch({ type: "reset" });
  };

  const showInfo = () => {
    return Object.keys(state).map((each, idx) => {
      return (
        <span key={each} style={{ display: "block" }}>
          {each}:<code>{String(state[each])}</code>
        </span>
      );
    });
  };
  return (
    <article>
      <h1>Login with useReducer/useRef</h1>
      <section className="flex-container row">
        <form>
          <label htmlFor="name">
            Name: <abbr title="required">*</abbr> 
          </label>
          <input id="name" type="text" name="name" ref={inputName}
          ></input>

          <label htmlFor="password">
            Password: <abbr title="required">*</abbr> 
          </label>
          <input id="password" type="password" name="password" ref={inputPwd}
          ></input>
        </form>
        <button onClick={(event) => signIn(event)}>Sign In</button>
        <button onClick={(event) => signOut(event)}>Sign Out</button>
        <button onClick={(event) => reset(event)}>Reset</button>
        <p className="card margin full">{showInfo()}</p>
      </section>
    </article>
  );
}
