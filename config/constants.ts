import icons from '@/icons';

const ENVIRONMENT = {
    development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
    production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
};

const API = {
    baseURL: 'https://st1.novel-ag.com/api',
    error: {
        aborted: {
            code: 'ECONNABORTED',
            description: 'Please check your network connection and try again',
            message: 'Network Error!',
        },
        expiredToken: 'Access denied. Token Expired',
    },
    routes: {
        auth: {
            login: 'auth/farmer/login',
            pin: 'auth/farmer/verify-pin-code',
            register: '/auth/farmer/register',
            resentOtp: '/auth/farmer/resend-otp',
            resetPin: 'auth/farmer/forgot-pin',
            setPin: '/auth/farmer/set-pin',
            setUpResetPin: '/auth/farmer/reset-pin',
            verifyRegistration: '/auth/farmer/verify-otp',
            verifyResetOtp: '/auth/farmer/verify-forgot-pin-otp',
        },
        banks: {
            createBankAccount: '/farmer/bank-accounts/create',
            getBankAccounts: '/farmer/bank-accounts',
            getBanks: '/banks',
        },
        states: {
            getLocalGovernments: '/local-governments/%state_id%?sort_field=id&sort_type=asc',
            getStates: '/states?sort_field=id&sort_type=asc',
            getWards: '/wards/%local_government_id%?sort_field=id&sort_type=asc',
        },
        user: {
            profile: '/farmer/me',
        },
    },
    timeout: 60000,
};

const CLIENT_ROUTES = {
    activities: '/activities',
    auth: {
        confirmResetPin: '/auth/confirm-reset-pin',
        login: '/auth/login',
        register: '/auth/register',
        reset: '/auth/initiate-reset-pin',
        setPin: '/auth/setup-pin',
        setUpResetPin: '/auth/setup-reset-pin',
        verifyRegistration: '/auth/verify-registration',
        verifyResetOtp: '/auth/verify-reset-otp',
    },
    dashboard: '/dashboard',
    home: '/',
    investment: '/investment',
    loans: '/loans',
    notofications: '/notifications',
    otp: '/auth/otp',
    profile: '/profile',
    settings: '/settings',
    training: '/training',
    wallet: '/wallet',
};

const APP_MENU = [
    {
        icon: icons.dashboardIcon(),
        link: CLIENT_ROUTES.dashboard,
        name: 'Dashboard',
    },
    {
        icon: icons.userIcon(),
        link: CLIENT_ROUTES.profile,
        name: 'Profile',
    },
    {
        icon: icons.activitiesIcon(),
        link: CLIENT_ROUTES.activities,
        name: 'Activities',
    },
    {
        icon: icons.walletIcon(),
        link: CLIENT_ROUTES.wallet,
        name: 'Wallet',
    },
    {
        icon: icons.loanIcon(),
        link: CLIENT_ROUTES.loans,
        name: 'Loans',
    },
    {
        icon: icons.trainingIcon(),
        link: CLIENT_ROUTES.training,
        name: 'Training',
    },
    {
        icon: icons.investmentIcon(),
        link: CLIENT_ROUTES.investment,
        name: 'Investment',
    },
];

const COMING_SOON_APP_MENU = [
    {
        name: 'Loans',
    },
    {
        name: 'Training',
    },
    {
        name: 'Investment',
    },
];

const USER_ACTIONS_APP_MENU = [
    {
        icon: icons.settingsIcon(),
        link: CLIENT_ROUTES.settings,
        name: 'Settings',
    },
    {
        icon: icons.notificationIcon(),
        link: CLIENT_ROUTES.notofications,
        name: 'Notifications',
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
    COMING_SOON_APP_MENU,
    COOKIES,
    ENVIRONMENT,
    SCREEN_SIZES,
    USER_ACTIONS_APP_MENU,
};

export default constants;
