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

const resetOtp = yup.object({
    pin: yup.string().length(4).required().label('OTP').trim(),
});
const validateEmail = (email: string | undefined) => {
    return yup.string().email().isValidSync(email);
};

const validatePhone = (phone: number | undefined) => {
    return yup
        .number()
        .integer()
        .positive()
        .test((phone) => {
            return phone && phone.toString().length == 10 && phone.toString().length <= 14 ? true : false;
        })
        .isValidSync(phone);
};
const loginSchema = yup.object({
    login: yup
        .string()
        .required('Please enter a valid email address or phone no.')
        .test('email_or_phone', 'Email / Phone is invalid', (value) => {
            return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
        }),
});

const initiatePhone = yup.object({
    phone: yup
        .string()
        .matches(/^\d{11}$/, 'Invalid phone number')
        .required('Phone number is required'),
});

const setupPinSchema = yup.object({
    confirm_pin: yup
        .string()
        .oneOf([yup.ref('pin')], 'Pin does not match')
        .label('Pin')
        .required('Confirm your pin to continue'),
    pin: yup.string().label('Pin').required('Enter your pin').max(4),
});

const schema = {
    initiatePhone,
    loginSchema,
    otpSchema,
    registerSchema,
    resetOtp,
    setupPinSchema,
};

export default schema;
