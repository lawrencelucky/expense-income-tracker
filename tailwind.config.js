/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            boxShadow: {
                'focus-border':
                    '0px 0px 0px 4px rgba(22, 179, 100, 0.09), 0px 0.639628px 1.27926px rgba(16, 24, 40, 0.05)',
            },
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
