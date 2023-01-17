import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailreducer = (state, action) => {
  if(action.type==="user_input"){
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if(action.type==="user_blur"){
    return { value:state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passreducer=(state,action)=>{
  if(action.type==="user_input"){
    return { value: action.val, isValid: action.val.trim().length>6 };
  }
  if(action.type==="user_blur"){
    return { value:state.value, isValid: state.value.trim().length>6  };
  }
  return { value: "", isValid: false };
}

const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailstate, dispatchemail] = useReducer(emailreducer, {
    value: "",
    isValid: null,
  });

  const [passwoedstate,dispatchpass]=useReducer(passreducer,{
    value: "",
    isValid: null,
  })

  // const {isValid:emailisvalid}=emailstate;
  // const {isValid:passisvalid}=passwoedstate;


  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       emailstate.isValid && passwoedstate.isValid
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [emailisvalid, passisvalid]);

  const emailChangeHandler = (event) => {
    dispatchemail({type:"user_input", val:event.target.value})

    setFormIsValid(
     event.target.value.includes("@  ") && passwoedstate.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchpass({type:"user_input",val:event.target.value})

    setFormIsValid(
      emailstate.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = (event) => {
    dispatchemail({type:"user_blur"})
  };

  const validatePasswordHandler = () => {
    dispatchpass({type:"use_blur"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwoedstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwoedstate.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwoedstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
