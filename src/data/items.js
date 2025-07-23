// Theme Colors
const themeColor       = '#223843';
const themeColorOrange = '#D77A61';
const themeColorWhite  = '#EFF1F3';
const themeColorLille  = '#D8D3D8';
const themeColorGold   = '#D8B4A0';

// URLs and Tokens
const base_url                   = import.meta.env.VITE_API_URL;
const gocardless_token           = import.meta.env.VITE_GOCARDLESS_TOKEN
const gocardless_secret          = import.meta.env.VITE_GOCARDLESS_SECRET
const gocardless_link_basic_plan = import.meta.env.VITE_GOCARDLESS_LINK_BASIC_PLAN
const COOKIE_NAME = "jwt";

// User API Endpoints
const auth_api_endpoint          = base_url + '/api/user/me';
const register_user_api_endpoint = base_url + '/api/user/register';
const login_user_api_endpoint    = base_url + '/api/user/login';
const logout_api_endpoint        = base_url + '/api/user/logout';
const user_details_api_endpoint  = base_url + '/api/user/details';

// Subscription API Endpoints
const get_subscription_endpoint    = base_url + '/api/subscription';  // NOT USED
const create_subscription_endpoint = base_url + '/api/subscription/create';
const delete_subscription_endpoint = base_url + '/api/subscription/delete';

// Project API Endpoints
const get_project_endpoint      = base_url + '/api/project';
const create_project_endpoint   = base_url + '/api/project/create';
const delete_project_endpoint   = base_url + '/api/project/delete';
const pricing_proj_api_endpoint = base_url + '/api/project/set_price';
const download_api_endpoint     = base_url + '/api/download';

// Admin API Endpoints
const list_users_api_endpoint     = base_url + '/api/admin/list_platform_user';
const get_admin_name_api_endpoint = base_url + '/api/admin/get_admin_name';

const price_status = {
    1: 'pending',
    2: 'set',
    3: 'accepted',
    4: 'rejected'
};

//----------------- Not exported
const tier = {  
    1: 'basic',
    2: 'standard',
    3: 'enterprise',
    4: 'demo'
};

// Pricing
const price_list = {
    [tier[1]]: 49.00,
    [tier[2]]: 149.00,
    [tier[3]]: 399.00,
};

// Pricing
const sub_links_list = {
    [tier[1]]: gocardless_link_basic_plan,
    [tier[2]]: gocardless_link_basic_plan,
    [tier[3]]: gocardless_link_basic_plan
};


// Contact Info
const contactInfo = {
    address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com',
    vat: 'IT01675720294'
};

// Exporting all
export {
    themeColor, themeColorOrange, themeColorWhite, themeColorLille,
    themeColorGold, base_url, COOKIE_NAME,
    auth_api_endpoint, register_user_api_endpoint, login_user_api_endpoint,
    logout_api_endpoint, user_details_api_endpoint,
    get_subscription_endpoint, create_subscription_endpoint,
    delete_subscription_endpoint, get_project_endpoint,
    create_project_endpoint, delete_project_endpoint,
    pricing_proj_api_endpoint, download_api_endpoint,
    price_status, price_list, contactInfo,
    list_users_api_endpoint, get_admin_name_api_endpoint,
    sub_links_list
};
