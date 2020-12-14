//login page
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";

export const Login = (props) => {
  const user = useRef();
  const password = useRef();

  const [show, setShow] = useState();
  const [showUser, setShowUser] = useState();

  // see if user already exists
  const existingUserCheck = () => {
    return fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        return user !== undefined ? user : false;
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists.valid) {
        localStorage.setItem("rare_user_id", exists.token);
        props.history.push("/home");
      } else if (exists.valid != true) {
        setShow(true);
      } else if (!exists) {
        setShowUser(true);
      }
    });
  };

  return (
    <Box direction="column" animation="fadeIn">
      <Box className="container--login">
        {showUser && (
          <Layer>
            <Heading level="3">User does not exist</Heading>
            <Button
              label="Close"
              className="button--close"
              onClick={() => setShowUser(false)}
            />
          </Layer>
        )}
        {show && (
          <Layer>
            <Heading level="3">Password does not match</Heading>
            <Button
              className="button--close"
              label="Close"
              primary
              onClick={() => setShow(false)}
            />
          </Layer>
        )}
      </Box>
      <Box direction="column" alignSelf="center">
        <Heading level="1">Rare</Heading>
        <Heading level="2">Sign In</Heading>
        <Form className="form--login" onSubmit={handleLogin}>
          <FormField label="Email address" htmlFor="inputEmail">
            <TextInput
              ref={user}
              type="text"
              id="username"
              placeholder="User Name"
              required
            />
          </FormField>
          <FormField label="Password" htmlFor="inputPassword">
            <TextInput
              ref={password}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </FormField>
          <FormField>
            <Box align="center" pad="medium">
              <Button
                size="large"
                label="sign in"
                fill={false}
                margin="small"
                pad="small"
                primary
                type="submit"
              />
            </Box>
          </FormField>
        </Form>
      </Box>
      <Box className="link--register">
        <Anchor
          as={Link}
          to="/register"
          title="register"
          href="/register"
          margin="small"
          justify="center"
        >
          Not a member yet?
        </Anchor>
      </Box>
    </Box>
  );
};
