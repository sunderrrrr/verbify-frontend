const config = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'AppName',
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
        endpoints: {
            login: '/auth/sign-in',
            register: '/auth/sign-up',
            refresh: '/auth/refresh',
            theory: '/theory/'
        },
    },
};

export default config;