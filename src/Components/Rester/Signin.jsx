import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8,"Password must be at least 8 characters").required("Password is required"),
});

const Signin = () => {
    const initialValues = {email: "", password: ""};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, auth} = useSelector((store)=>store);
    const jwt = localStorage.getItem('token');

    const handleSubmit = (values, actions) => {
        console.log("values: ", values);
        dispatch(signinAction(values));
        actions.setSubmitting(false);
    };

    useEffect(() => {
        auth.error = null;
    })
    
    useEffect(() => {
        if(jwt != null) {
            dispatch(getUserProfileAction(jwt));
            console.log('get user profile'); 
        }
    }, [jwt])

    useEffect(() => {
        if(user.reqUser) {
            navigate('/')
            // navigate(`/${user.reqUser?.username}`)
        }
    }, [jwt, user.reqUser])

    const handleNavigate = () => navigate("/signup");

    console.log('rrr:',auth.error)
    return (
        <div>
            <div className="border">
                <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <img className="mb-5" src="/images/logo.png" alt=""/>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                        {(formikProps) => 
                            <Form className="space-y-8 w-full">
                                <Field name="email">
                                    {({field,form}) => (<FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <Input 
                                            className="w-full" 
                                            {...field} 
                                            id='email' 
                                            placeholder="Email">
                                        </Input>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>)}
                                </Field>
                                <Field name="password">
                                    {({field,form}) => (<FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <Input 
                                            className="w-full" 
                                            type="password"
                                            {...field} 
                                            id='password' 
                                            placeholder="Password">
                                        </Input>
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>)}
                                </Field>
                                <Button className="w-full" mt={4} colorScheme="blue" type="submit" isLoading={formikProps.isSubmitting}>
                                    Sign in
                                </Button>
                                {auth.error && (
                                    <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                        {auth.error}
                                    </div>
                                )}
                            </Form>}
                    </Formik>
                </Box>
            </div>
            <div className="border w-full border-slate-300 mt-5">
                <p className="text-center py-2 text-sm">If you don't have account<span onClick={handleNavigate} className="ml-2 text-blue-700 cursor-pointer">Sign up</span></p>
            </div>
        </div>
    )
}
export default Signin