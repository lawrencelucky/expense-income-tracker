import * as yup from 'yup';

const registerSchema = yup.lazy((v) => {
    return yup.object({
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Password does not match')
            .label('Confirm Password')
            .required('Confirm your password to continue'),
        email: v.token ? yup.string().email().label('Email') : yup.string().email().required().label('Email'),
        firstName: yup.string().required('Please enter your first name').label('Full name'),
        lastName: yup.string().required('Please enter your last name').label(''),
        password: yup.string().label('Create Password').required('Please enter a valid email address').min(6),
        phoneNumber: yup.number().label('Phone number').required(),
    });
});

const otpSchema = yup.object({
    otp: yup.string().length(6).required().label('OTP').trim(),
});

const loginSchema = yup.object({
    email: yup.string().email().required('Please enter a valid email address').label('Email address'),
    password: yup.string().label('Enter password').required('Please enter your password to continue'),
});

const schema = {
    loginSchema,
    otpSchema,
    registerSchema,
};

export default schema;
