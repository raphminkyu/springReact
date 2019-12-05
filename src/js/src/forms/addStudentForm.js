import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../client';

const inputButtonMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputButtonMargin};

const AddStudentForm = (props) => 
    (
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
                }else if(!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)){
                    errors.gender = "Gender must be (MALE, male, FEMALE, female)";
                }
                return errors;
            }}
            onSubmit={(student, { setSubmitting }) => {
              
                addNewStudent(student).then(() => {
                   props.onSuccess();
                    
                })
                .catch(err => {
                    props.onFailure(err);

                })
                .finally(() =>{
                    setSubmitting(false);
                })
               
         
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
        
    );
    


export default AddStudentForm;