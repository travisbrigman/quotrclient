//Register form for new user
import { Box, Button, Form, FormField, Heading, Main, MaskedInput, Text, TextInput } from "grommet"
import React, { useRef } from "react"
import { Link } from "react-router-dom"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "username": userName.current.value,
                "email" : email.current.value,
                "password": password.current.value,
                "profile_image_url": ""
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser) //adds new user to the db
            })
                .then(res => res.json())
                .then(res => {
                        localStorage.setItem("quotr_user_id", res.token)
                        props.history.push("/") //redirects to home page
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <Main>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <Form className="form--login" onSubmit={handleRegister}>
                <Heading className="h3 mb-3 font-weight-normal">Register an account</Heading>
                    <FormField htmlFor="firstName" label="First Name"> 
                    <TextInput ref={firstName} type="text" name="firstName" className="form-control" placeholder="first name" />
                    </FormField>
                    <FormField htmlFor="lastName" label="Last Name">
                    <TextInput ref={lastName} type="text" name="lastName" className="form-control" placeholder="last name" />
                    </FormField>
                
                    <FormField htmlFor="userName" label="Username">
                    <TextInput ref={userName} type="text" name="userName" className="form-control" placeholder="display name" />
                    </FormField>
                    <FormField htmlFor="inputEmail" label="Email Address">

                    <TextInput ref={email} type="email" name="email" className="form-control" placeholder="email address" required />
                    </FormField>
                    <FormField htmlFor="inputPassword" label="Password"> 
                    <MaskedInput ref={password} type="password" name="password" className="form-control" placeholder="password" required />
                    </FormField>
                    <FormField htmlFor="verifyPassword" label="Verify Password">

                    <MaskedInput ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="re-enter password" required />
                    </FormField>
                    <Button className="btn btn-1 btn-sep icon-send" type="submit" primary label="Register" />
            </Form>
            <Box className="link--register">
                <Text>Already Registered?</Text>
                <Link color="text" to="/login">Login</Link>
            </Box>
        </Main>
    )
}
