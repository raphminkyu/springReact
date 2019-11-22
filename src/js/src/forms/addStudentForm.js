import React, { Component } from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';

const inputButtonMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputButtonMargin};

class AddStudentForm extends Component{
    render(){
        return (
            <Formik
            initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
            validate={values => {
                const errors = {};

                if(!values.firstName){
                    errors.firstName = "First Name Required"

                }

                if(!values.lastName){
                    errors.lastName = "Last Name Required"

                }

                if (!values.email) {
                    errors.email = 'Email Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid Email address';
                }

                if(!values.gender){
                    errors.gender = "Gender Required"
                }else if(!['Male', 'male', 'FEMALE', 'female'].includes(values.gender)){
                    errors.gender = "Gender must be (MALE, male, FEMALE, female)";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                <Input
                    style = {inputButtonMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeHolder = 'First Name' 
                />
                {errors.firstName && touched.firstName && <Tag style ={tagStyle}>{errors.firstName}</Tag>}
                 <Input
                    style = {inputButtonMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeHolder = 'Last Name' 
                />
                {errors.lastName && touched.lastName && <Tag style ={tagStyle}>{errors.lastName}</Tag>}
                <Input
                    style = {inputButtonMargin}
                    name="email"
                    type='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeHolder = 'Email' 
                />
                {errors.email && touched.email && <Tag style ={tagStyle}>{errors.email}</Tag>}
                <Input
                    style = {inputButtonMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeHolder = 'Gender; Male or Female'
                />
                {errors.gender && touched.gender && <Tag style ={tagStyle}>{errors.gender}</Tag>}
                
                <Button onClick ={() => submitForm()} 
                        type = "submit"
                        disabled={isSubmitting | (touched && !isValid)}>
                
                    Submit
                </Button>
                </form>
            )}
            </Formik>
        
        )
    }
}

export default AddStudentForm;