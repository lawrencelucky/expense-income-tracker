import * as yup from 'yup';

const registerSchema = yup.lazy((v) => {
    return yup.object({
        email: v.token ? yup.string().email().label('Email') : yup.string().email().required().label('Email'),
        first_name: yup.string().required('Please enter your first name').label('Full name'),
        last_name: yup.string().required('Please enter your last name').label(''),
        phone: yup.number().label('Phone number').required(),
    });
});

const otpSchema = yup.object({
    otp: yup.string().length(6).required().label('OTP').trim(),
});

const loginSchema = yup.object({
    email: yup.string().email().required('Please enter a valid email address').label('Email address'),
    phoneNumber: yup.number().required('Please enter a Phone no.').label('Phone no.'),
});

const schema = {
    loginSchema,
    otpSchema,
    registerSchema,
};

export default schema;
