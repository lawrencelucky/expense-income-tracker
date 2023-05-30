import { toast, Flip } from 'react-toastify';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { INotification } from '../types/interfaces';

interface IProps {
    number: any;
    isCurrency?: boolean;
    currency?: 'NGN' | 'USD';
    notation?: 'compact' | 'standard';
}

const query = `*[_type == "post"] | order(_createdAt desc) [0...100]{
   _id,
   title,
   author-> {
    name,
    image
   },
   description,
   publishedAt,
   _createdAt,
   mainImage,
   slug,
   body
 }`;

const openNotification = ({ type, message }: INotification): void => {
    toast[type](message, {
        autoClose: 5000,
        className: 'text-sm',
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: 'top-right',
        progress: undefined,
        theme: 'light',
        transition: Flip,
    });
};

const isTokenExpired = (token: string): boolean => {
    const decodedToken: JwtPayload = jwtDecode(token);
    return !decodedToken.exp || decodedToken.exp * 1000 < Date.now();
};

const handleCopy = (value: string): void => {
    if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(value);
        openNotification({ message: 'Copied to Clipboard', type: 'info' });
    }
};

const formatNumber = ({ number, isCurrency = false, currency = 'USD', notation = 'standard' }: IProps): string => {
    const locale = 'en-Gb';
    const numberToFormat = number;
    return isCurrency
        ? new Intl.NumberFormat(locale, {
              currency,
              currencySign: 'accounting',
              notation,
              style: 'currency',
          }).format(numberToFormat)
        : new Intl.NumberFormat(locale, { notation }).format(numberToFormat);
};

const thousandSeparator = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const replaceItemInArray = <T>(arr: T[], index: number, newItem: T): T[] => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index + 1),
];

function hashPhoneNumber(phoneNumber: any): string {
    const countryCodeRegex = /^\+(\d{1,3})/;
    const areaCodeRegex = /^(\d{2})(\d+)/;

    // Check if the phone number starts with a country code
    const countryCodeMatch = phoneNumber.match(countryCodeRegex);
    let countryCode = '';
    if (countryCodeMatch) {
        countryCode = countryCodeMatch[1];
    }

    // Remove any non-digit characters from the phone number
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Check if the phone number contains an area code
    const areaCodeMatch = digitsOnly.match(areaCodeRegex);
    let areaCode = '';
    let remainingDigits = digitsOnly;
    if (areaCodeMatch) {
        areaCode = areaCodeMatch[1];
        remainingDigits = areaCodeMatch[2];
    }

    // Mask the middle digits
    const maskedDigits = remainingDigits.slice(0, -6) + '******' + remainingDigits.slice(-3);

    // Format the hashed phone number
    let hashedPhoneNumber = '';
    if (countryCode) {
        hashedPhoneNumber += `+${countryCode}`;
    }
    if (areaCode) {
        hashedPhoneNumber += `${areaCode}`;
    }
    hashedPhoneNumber += `${maskedDigits}`;

    return hashedPhoneNumber;
}

const helpers = {
    formatNumber,
    handleCopy,
    hashPhoneNumber,
    isTokenExpired,
    openNotification,
    query,
    replaceItemInArray,
    thousandSeparator,
};

export default helpers;
