// Theme Colors
const themeColor       = '#223843';
const themeColorOrange = '#D77A61';
const themeColorWhite  = '#EFF1F3';
const themeColorLille  = '#D8D3D8';
const themeColorGold   = '#D8B4A0';

// URLs and Tokens
const base_url                   = import.meta.env.VITE_API_URL;
const demo_url                   = import.meta.env.VITE_DEMO_URL;

const gocardless_token           = import.meta.env.VITE_GOCARDLESS_TOKEN
const gocardless_secret          = import.meta.env.VITE_GOCARDLESS_SECRET
const gocardless_link_basic_plan = import.meta.env.VITE_GOCARDLESS_LINK_BASIC_PLAN
const gocardless_link_basic_plan_20 = import.meta.env.VITE_GOCARDLESS_LINK_BASIC_PLAN_20
const gocardless_link_basic_plan_50 = import.meta.env.VITE_GOCARDLESS_LINK_BASIC_PLAN_50
const gocardless_link_basic_plan_80 = import.meta.env.VITE_GOCARDLESS_LINK_BASIC_PLAN_80

const COOKIE_NAME = "fg_cookie_token";

// User API Endpoints
const auth_api_endpoint          = base_url + '/api/user/me';
const register_user_api_endpoint = base_url + '/api/user/register';
const login_user_api_endpoint    = base_url + '/api/user/login';
const logout_api_endpoint        = base_url + '/api/user/logout';
const user_details_api_endpoint  = base_url + '/api/user/details';

const referral_auth_api_endpoint     = base_url + '/api/referral/me'
const register_referral_api_endpoint = base_url + '/api/referral/register';
const login_referral_api_endpoint    = base_url + '/api/referral/login';
const logout_referral_api_endpoint   = base_url + '/api/referral/logout';
const referral_details_api_endpoint  = base_url + '/api/referral/details';

const update_feature_endpoint    = base_url + '/api/user/update-feature';
const get_logo_endpoint          = base_url + '/api/user/get_logo'
const upload_logo_endpoint       = base_url + '/api/user/upload_logo'

const update_machine_endpoint = base_url + '/api/user/update-machine'
const get_machine_endpoint    = base_url + '/api/user/get-machines'

const update_materials_endpoint = base_url + '/api/user/update-materials'
const get_materials_endpoint    = base_url + '/api/user/get-materials'

// Subscription API Endpoints
// const get_subscription_endpoint    = base_url + '/api/subscription';          // NOT USED
const create_subscription_endpoint = base_url + '/api/subscription/create';
const delete_subscription_endpoint = base_url + '/api/subscription/delete';

// Project API Endpoints
const get_project_endpoint      = base_url + '/api/project';
const create_project_endpoint   = base_url + '/api/project/create';
const delete_project_endpoint   = base_url + '/api/project/delete';
const pricing_proj_api_endpoint = base_url + '/api/project/set_price';
const price_status_api_endpoint = base_url + '/api/project/set_price_status';
const download_api_endpoint     = base_url + '/api/project/download';

// Admin API Endpoints
const list_users_api_endpoint     = base_url + '/api/admin/list_platform_user';
const get_admin_name_api_endpoint = base_url + '/api/admin/get_admin_name';


const post_payment_information_endpoint = base_url + '/api/payment/info';

const price_status = {  // DB interface
    1: 'pending',
    2: 'set',
    3: 'accepted',
    4: 'rejected',
    5: 'invoice_sent',
    6: 'paid',
    7: 'shipped'
};

const display_price_list = [
    {name: 'Basic'     , price: '49.00' },
    {name: 'Standard'  , price: 'Coming Soon' },
    {name: 'Enterprise', price: 'Request a Quote' }
];

const tier = {  //----------------- Not exported, DB interface
    1: 'basic',
    2: 'standard',
    3: 'enterprise',
    4: 'demo'
};

// Pricing
const price_list = {
    [tier[1]]: {
        0: {
            link: gocardless_link_basic_plan,
            price: 49.0,
            display_price: '49.00 €/month'
        },
        20:  {
            link: gocardless_link_basic_plan_20,
            price: 39.2,
            display_price: '39.20 €/month'
        },
        50: {
            link: gocardless_link_basic_plan_50,
            price: 24.5,
            display_price: '24.50 €/month'
        },
        80:  {
            link: gocardless_link_basic_plan_80,
            price: 9.8,
            display_price: '9.80 €/month'
        }

    },
    [tier[2]]: {
        0: {
            link: "",
            price: 99999.0,
            display_price: 'Coming Soon...'
        },
        50:  {
            link: "",
            price: 99999.0,
            display_price: 'Coming Soon...'
        },
        20:  {
            link: "",
            price: 99999.0,
            display_price: 'Coming Soon...'
        },
        80:  {
            link: "",
            price: 99999.0,
            display_price: 'Coming Soon'
        }
    },
    [tier[3]]: {
        0: {
            link: "/services",
            price: 99999.0,
            display_price: 'Request a Quote'
        },
        50:  {
            link: "/services",
            price: 99999.0,
            display_price: 'You have a 50% discount, Request a Quote'
        },
        20:  {
            link: "/services",
            price: 99999.0,
            display_price: 'You have a 20% discount, Request a Quote'
        },
        80:  {
            link: "/services",
            price: 9.8,
            display_price: 'You have a 80% discount, Request a Quote'
        }
    }
};


// Contact Info
const contactInfo = {
    address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com',
    vat: 'IT01675720294'
};

const MAX_MB_PDF = 5;

// Exporting all
export {
    themeColor, themeColorOrange, themeColorWhite, themeColorLille,
    themeColorGold, base_url, demo_url, COOKIE_NAME, price_status_api_endpoint,
    auth_api_endpoint, register_user_api_endpoint, login_user_api_endpoint,
    logout_api_endpoint, user_details_api_endpoint, MAX_MB_PDF,
    // get_subscription_endpoint,
    create_subscription_endpoint, delete_subscription_endpoint,
    get_project_endpoint,
    create_project_endpoint, delete_project_endpoint,
    pricing_proj_api_endpoint, download_api_endpoint,
    price_status, price_list, display_price_list, contactInfo,
    get_machine_endpoint,
    update_machine_endpoint, get_materials_endpoint,
    update_materials_endpoint, list_users_api_endpoint,
    update_feature_endpoint, post_payment_information_endpoint,
    get_logo_endpoint, upload_logo_endpoint, referral_auth_api_endpoint,
    register_referral_api_endpoint, login_referral_api_endpoint,
    logout_referral_api_endpoint,
    referral_details_api_endpoint
};
