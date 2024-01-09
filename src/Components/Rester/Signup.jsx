import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signupAction } from "../../Redux/Auth/Action";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8,"Password must be at least 8 characters").required("Password is required"),
});

const Signup = () => {
    const initialValues = {email:'', username:'', name:'', password:''};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth, user} = useSelector((store)=>store);
    const toast = useToast();
    
    console.log("Store signup: ", auth.signup)

    const handleNavigate = () => navigate('/login');
    const handleSubmit = (values, actions) => {
        console.log("values: ", values);
        dispatch(signupAction(values));
        actions.setSubmitting(false);
    };

    useEffect(() => {
        auth.error = null;
    })
    useEffect(() => {
        if(user.reqUser) {
            navigate('/')
        } else if (auth.signup)
            navigate('/login')
    },[auth.signup?.username])

    useEffect(() => {
        auth.signup = null;
    })
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
                                            placeholder="Mobile number or Email">
                                        </Input>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>)}
                                </Field>
                                <Field name="username">
                                    {({field,form}) => (<FormControl isInvalid={form.errors.username && form.touched.username}>
                                        <Input 
                                            className="w-full" 
                                            {...field} 
                                            id='username' 
                                            placeholder="Username"
                                            required>
                                        </Input>
                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>)}
                                </Field>
                                <Field name="name">
                                    {({field,form}) => (<FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <Input 
                                            className="w-full" 
                                            {...field} 
                                            id='name' 
                                            placeholder="Name">
                                        </Input>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                                    Sign up
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
                <p className="text-center py-2 text-sm">If you have account already<span onClick={handleNavigate} className="ml-2 text-blue-700 cursor-pointer">Sign in</span></p>
            </div>
        </div>
    )
}
export default Signup