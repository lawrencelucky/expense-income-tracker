import icons from '@/icons';

const ENVIRONMENT = {
    development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
    production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
};

const API = {
    baseURL: '',
    error: {
        aborted: {
            code: 'ECONNABORTED',
            description: 'Please check your network connection and try again',
            message: 'Network Error!',
        },
        expiredToken: 'Access denied. Token Expired',
    },
    routes: {},
    timeout: 60000,
};

const CLIENT_ROUTES = {
    ai: '/ai',
    home: '/',
    transcations: '/transactions',
};

const APP_MENU = [
    {
        icon: icons.dashboardIcon(),
        link: CLIENT_ROUTES.home,
        name: 'Dashboard',
    },
    {
        icon: icons.investmentIcon(),
        link: CLIENT_ROUTES.transcations,
        name: 'Transactions',
    },
    {
        icon: icons.userIcon(),
        link: CLIENT_ROUTES.ai,
        name: 'AI Assistant',
    },
];

const COOKIES = {
    key: 'novel-ag-user',
    maxAge: 21600, // 6 hours
    path: CLIENT_ROUTES.home,
};

const SCREEN_SIZES = {
    laptop: 1440,
    large: 1024,
    medium: 768,
    small: 640,
    xlarge: 1280,
    xxlarge: 1526,
    xxxlarge: 1600,
};

const constants = {
    API,
    APP_MENU,
    CLIENT_ROUTES,
    COOKIES,
    ENVIRONMENT,
    SCREEN_SIZES,
};

export default constants;
