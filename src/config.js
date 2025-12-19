// Theme Colors
const themeColor       = '#223843';
const themeColorOrange = '#D77A61';
const themeColorWhite  = '#EFF1F3';
const themeColorLille  = '#D8D3D8';
const themeColorGold   = '#D8B4A0';

// URLs and Tokens
const api_url                    = import.meta.env.VITE_API_URL;
const app_login_url              = import.meta.env.VITE_APP_LOGIN_URL;
const demo_url                   = import.meta.env.VITE_DEMO_URL;
const websocket_api_url          = import.meta.env.VITE_API_WS_URL;
const forbidden_cad_addresses = import.meta.env.VITE_FORBIDDEN_CAD_ADDRESSES

const landing_page_url = import.meta.env.VITE_LANDING_PAGE_URL
const terms_and_services_url = landing_page_url + "/terms_and_services" 
const privacy_policy_url     = landing_page_url + "/privacy-policy"
const faq_url = landing_page_url + "/faq" 
const price_url = landing_page_url + "/pricing"

const pitch_deck_pdf_url = "https://floating-gates-pub.nbg1.your-objectstorage.com/pitch_deck.pdf"
const business_card_pdf_url = "https://floating-gates-pub.nbg1.your-objectstorage.com/BusinessCard.pdf"
const documentation_url = "https://floating-gates.gitbook.io/gates-docs"

const referral_documents = {
    pitch_deck_pdf_url,
    business_card_pdf_url
}

const COOKIE_NAME = "fg_cookie_token";

// User API Endpoints
const auth_api_endpoint           = api_url + '/user/me';
const register_user_api_endpoint  = api_url + '/user/register';
const login_user_api_endpoint     = api_url + '/user/login';
const logout_api_endpoint         = api_url + '/user/logout';
const user_details_api_endpoint   = api_url + '/user/details';
const user_recovery_api_endpoint  = api_url + '/user/recovery';
const set_new_usr_passwd_endpoint = api_url + '/user/set_new_password';
const auth_google_api_endpoint    = api_url + '/user/login/google' ;

const referral_auth_api_endpoint     = api_url + '/referral/me'
const register_referral_api_endpoint = api_url + '/referral/register';
const login_referral_api_endpoint    = api_url + '/referral/login';
const logout_referral_api_endpoint   = api_url + '/referral/logout';
const referral_details_api_endpoint  = api_url + '/referral/details';
const update_referral_api_endpoint   = api_url + '/referral/update';
const referral_recovery_api_endpoint = api_url + '/referral/recovery'
const set_new_referral_passwd_endpoint = api_url + '/referral/set_new_password'

const update_feature_endpoint    = api_url + '/user/update-feature';
const get_logo_endpoint          = api_url + '/user/get_logo';
const upload_logo_endpoint       = api_url + '/user/upload_logo';
const delete_logo_endpoint       = api_url + '/user/delete_logo';

const update_machine_endpoint = api_url + '/user/update-machine'
const get_machine_endpoint    = api_url + '/user/get-machines'

const update_materials_endpoint = api_url + '/user/update-materials'
const get_materials_endpoint    = api_url + '/user/get-materials'

const update_parametric_model_endopoint      = api_url + '/param-model/update-parametric-model'
const delete_parametric_model_endopoint      = api_url + '/param-model/delete-parametric-model'
const get_complete_parametric_model_endpoint = api_url + '/param-model/get-parametric-model'
const get_parametric_models_vec_endpoint     = api_url + '/param-model/get-parametric-models-vec'

const update_parametric_params_endpoint  = api_url + '/param-model/update-parametric-params'
const delete_parametric_params_endpoint  = api_url + '/param-model/delete-parametric-params'
const get_parametric_params_vec_endpoint = api_url + '/param-model/get-parametric-params-vec'


// Subscription API Endpoints
const set_next_subscription_endpoint = api_url + '/subscription/set-next-subscription'
const get_gocardless_payment_link_endpoint = api_url + '/subscription/get-payment-link'
const delete_subscription_endpoint = api_url + '/subscription/delete';

// Project API Endpoints
const get_project_endpoint      = websocket_api_url + '/project/list';
const create_project_endpoint   = api_url + '/project/create';
const delete_project_endpoint   = api_url + '/project/delete';
const pricing_proj_api_endpoint = api_url + '/project/set_price';
const price_status_api_endpoint = api_url + '/project/set_price_status';
const download_api_endpoint     = api_url + '/project/download';

// Admin API Endpoints
const list_users_api_endpoint     = api_url + '/admin/list_platform_user';
const get_admin_name_api_endpoint = api_url + '/admin/get_admin_name';

// Features API Endpoint
const get_autoquote_endpoint    = api_url + '/features/get-autoquote-details';
const update_autoquote_endpoint = api_url + '/features/update-autoquote-details'
// Payment handling API endpoint
const post_payment_information_endpoint = api_url + '/payment/info';

const git_book_url = "https://floating-gates.gitbook.io/gates-docs"

const docs_links = {
    "intro": git_book_url,
    "start": git_book_url + "/quick-start", 
    "subscription": git_book_url + "/host-your-hub-on-line" 
}

const price_status = {  // DB interface
    1: 'pending',
    2: 'set',
    3: 'accepted',
    4: 'rejected',
    5: 'invoice_sent',
    6: 'paid',
    7: 'shipped'
};


const allowed_manufacturing_kind = [
    "artisan",
    "machining",
    "casting",
    "molding",
    "forming",
    "joining",
    "additive"
]

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
            // link: gocardless_link_basic_plan,
            price: 4900,
            display_price: '49.00 €/month'
        },
        20:  {
            // link: gocardless_link_basic_plan_20,
            price: 3920,
            display_price: '39.20 €/month'
        },
        50: {
            // link: gocardless_link_basic_plan_50,
            price: 2450,
            display_price: '24.50 €/month'
        },
        80:  {
            // link: gocardless_link_basic_plan_80,
            price: 980,
            display_price: '9.80 €/month'
        }

    },
    [tier[2]]: {
        0: {
            link: "",
            price: 999990,
            display_price: 'Coming Soon...'
        },
        50:  {
            link: "",
            price: 999990,
            display_price: 'Coming Soon...'
        },
        20:  {
            link: "",
            price: 999990,
            display_price: 'Coming Soon...'
        },
        80:  {
            link: "",
            price: 999990,
            display_price: 'Coming Soon'
        }
    },
    [tier[3]]: {
        0: {
            link: "/dashboard",
            price: 9999900,
            display_price: 'One of Us will be in contact with you.'
        },
        50:  {
            link: "/services",
            price: 999990,
            display_price: 'You have a 50% discount, Request a Quote'
        },
        20:  {
            link: "/services",
            price: 999990,
            display_price: 'You have a 20% discount, Request a Quote'
        },
        80:  {
            link: "/services",
            price: 9000000,
            display_price: 'You have a 80% discount, Request a Quote'
        }
    }
};


// Contact Info
const contactInfo = {
    // address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    // website: 'https://floating-gates.com',
    // vat: 'IT01675720294'
};

const MAX_MB_PDF = 5;

// Exporting all
export {
    terms_and_services_url, privacy_policy_url, app_login_url, faq_url,
    price_url, documentation_url, forbidden_cad_addresses,
    themeColor, themeColorOrange, themeColorWhite, themeColorLille,
    themeColorGold, demo_url, COOKIE_NAME, price_status_api_endpoint,
    auth_api_endpoint, register_user_api_endpoint, login_user_api_endpoint,
    logout_api_endpoint, user_details_api_endpoint, MAX_MB_PDF,
    get_gocardless_payment_link_endpoint, delete_subscription_endpoint,
    get_project_endpoint, user_recovery_api_endpoint,
    set_new_usr_passwd_endpoint, set_next_subscription_endpoint,
    create_project_endpoint, delete_project_endpoint,
    pricing_proj_api_endpoint, download_api_endpoint,
    price_status, price_list, contactInfo,
    get_machine_endpoint, update_machine_endpoint, get_materials_endpoint,
    update_materials_endpoint, list_users_api_endpoint,
    update_feature_endpoint, post_payment_information_endpoint,
    get_logo_endpoint, upload_logo_endpoint, delete_logo_endpoint,
    referral_auth_api_endpoint,
    register_referral_api_endpoint, login_referral_api_endpoint,
    logout_referral_api_endpoint, update_referral_api_endpoint,
    referral_details_api_endpoint, set_new_referral_passwd_endpoint,
    referral_recovery_api_endpoint, get_autoquote_endpoint,
    update_parametric_model_endopoint, get_complete_parametric_model_endpoint,
    update_autoquote_endpoint, get_parametric_models_vec_endpoint,
    get_parametric_params_vec_endpoint,  update_parametric_params_endpoint,
    delete_parametric_model_endopoint, delete_parametric_params_endpoint,
    auth_google_api_endpoint, docs_links, referral_documents,
    allowed_manufacturing_kind };
