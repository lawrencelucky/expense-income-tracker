/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            boxShadow: {
                10: '0px 1.8518518209457397px 9.405092239379883px 0px #00000001, 0px 8.148148536682129px 19.47407341003418px 0px #00000002, 0px 20px 38.837501525878906px 0px #00000003, 0px 38.51852035522461px 76.12592315673828px 0px #00000003, 0px 64.81481170654297px 139.96990966796875px 0px #00000004, 0px 100px 239px 0px #00000008',
            },
            colors: {
                novelblack: {
                    10: '#26272B',
                    20: '#1D2939',
                },
                novelgray: {
                    10: '#EBECF2',
                    20: '#E7E5E4',
                    30: '#A0A0AB',
                    40: '#3F3F46',
                    50: '#FAFAF9',
                    60: '#F5F5F4',
                },
                novelgreen: {
                    10: '#16B364',
                    20: '#EDFCF2',
                },
                novelwhite: {
                    DEFAULT: '#FFFFFF',
                },
            },
            fontFamily: {
                primary: ['Satoshi', 'sans-serif'],
            },
        },
    },
};
