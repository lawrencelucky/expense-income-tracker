/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            boxShadow: {
                10: '0px 1.8518518209457397px 9.405092239379883px 0px #00000001, 0px 8.148148536682129px 19.47407341003418px 0px #00000002, 0px 20px 38.837501525878906px 0px #00000003, 0px 38.51852035522461px 76.12592315673828px 0px #00000003, 0px 64.81481170654297px 139.96990966796875px 0px #00000004, 0px 100px 239px 0px #00000008',
                20: '0px 5px 10px 0px #10182808',
                30: '0px 5.296296119689941px 10.185185432434082px 0px #00000007, 0px 25.037036895751953px 39.814815521240234px 0px #0000000B, 0px 65px 125px 0px #00000012',
                40: '0px 6px 12px 0px #12B76A26',
                50: '0px 1.2792552709579468px 2.5585105419158936px -1.2792552709579468px #1018280D, 0px 2.5585105419158936px 5.117021083831787px -1.2792552709579468px #10182808',
                'focus-border':
                    '0px 0px 0px 4px rgba(22, 179, 100, 0.09), 0px 0.639628px 1.27926px rgba(16, 24, 40, 0.05)',
            },

            colors: {
                novelblack: {
                    10: '#26272B',
                    20: '#1D2939',
                },
                novelblue: {
                    10: '#0B496A1C',
                    20: '#ABE1F9',
                    30: '#0B496A',
                },
                novelgray: {
                    10: '#EBECF2',
                    20: '#E7E5E4',
                    30: '#A0A0AB',
                    40: '#3F3F46',
                    50: '#FAFAF9',
                    60: '#F5F5F4',
                    70: '#757588',
                },
                novelgreen: {
                    10: '#16B364',
                    20: '#EDFCF2',
                    30: '#D8F7C7',
                    40: '#3CCB7F',
                },
                novelred: {
                    10: '#BC1B06',
                    20: '#F8DCE3',
                },
                novelwhite: {
                    DEFAULT: '#FFFFFF',
                },
                novelyellow: {
                    10: '#FCEABC',
                    20: '#FAE2A8',
                    30: '#79350F1C',
                    40: '#79350F',
                },
            },
            fontFamily: {
                primary: ['satoshi', 'sans-serif'],
            },
        },
    },
};
