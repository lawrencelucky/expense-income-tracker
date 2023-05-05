/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            boxShadow: {},
            colors: {
                novelgray: {
                    10: '#EBECF2',
                    20: '#E7E5E4',
                    30: '#A0A0AB',
                    40: '#3F3F46',
                },
                novelgreen: {
                    10: '#16B364',
                    20: '#EDFCF2',
                },
            },
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
            },
        },
    },
};
