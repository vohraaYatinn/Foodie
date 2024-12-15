/* eslint-disable */
export class Urls {
    static MPHRMS_API_PREFIX = 'api/';

    //users
    static SIGN_UP_CUSTOMER = Urls.MPHRMS_API_PREFIX + 'users/sign-up-customer/';
    static LOGIN_CUSTOMER = Urls.MPHRMS_API_PREFIX + 'users/login-customer/';
    static FETCH_DASHBOARD = Urls.MPHRMS_API_PREFIX + 'users/fetch-dashboard-customer/';
    static GET_ADDRESSES_CUSTOMER = Urls.MPHRMS_API_PREFIX + 'users/manage-address/';
    static ADD_NEW_ADDRESSES = Urls.MPHRMS_API_PREFIX + 'users/add-new-address/';
    static DELETE_ADDRESS = Urls.MPHRMS_API_PREFIX + 'users/delete-address/';
    static DEFAULT_ADDRESS = Urls.MPHRMS_API_PREFIX + 'users/default-address/';
    static FETCH_USER_DETAILS = Urls.MPHRMS_API_PREFIX + 'users/fetch-user-details/';
    static EDIT_USER_DETAILS = Urls.MPHRMS_API_PREFIX + 'users/edit-user-details/';
    static GET_USER_NOTIFICATION = Urls.MPHRMS_API_PREFIX + 'users/get-user-notification/';
    static SEND_OTP = Urls.MPHRMS_API_PREFIX + 'users/send-user-otp/';
    static VERIFY_CODE = Urls.MPHRMS_API_PREFIX + 'users/phone-otp-verify/';
    static INITIATE_PAYMENT_STATUS = Urls.MPHRMS_API_PREFIX + 'users/initiate-mb-pay/';
    static FETCH_PAYMENT_STATUS = Urls.MPHRMS_API_PREFIX + 'users/check-status-mbway/';


    //menu
    static SINGLE_MENU_ITEM = Urls.MPHRMS_API_PREFIX + 'menu/single-menu-item/';
    static GET_ALL_MENU_ITEMS = Urls.MPHRMS_API_PREFIX + 'menu/get-all-menu-items/';
    static CATEGORY_MENU = Urls.MPHRMS_API_PREFIX + 'menu/category-menu/';
    static CHECK_REST_ONLINE = Urls.MPHRMS_API_PREFIX + 'menu/check-rest-online/';


    //orders
    static ADD_TO_CART = Urls.MPHRMS_API_PREFIX + 'orders/add-to-cart/';
    static FETCH_CUSTOMER_CART = Urls.MPHRMS_API_PREFIX + 'orders/fetch-customer-cart/';
    static CUSTOMER_CART_ACTION = Urls.MPHRMS_API_PREFIX + 'orders/customer-cart-action/';
    static PLACE_ORDER_BEFORE_PAYMENT = Urls.MPHRMS_API_PREFIX + 'orders/place-order-before-payment/';
    static FETCH_CUSTOMER_ORDER = Urls.MPHRMS_API_PREFIX + 'orders/fetch-customer-order/';
    static GET_SINGLE_ORDER = Urls.MPHRMS_API_PREFIX + 'orders/fetch-single-order/';
    static ADD_NEW_REVIEW = Urls.MPHRMS_API_PREFIX + 'orders/add-new-review/';
    static PLACE_ORDER_AFTER_PAYMENT = Urls.MPHRMS_API_PREFIX + 'orders/place-order-after-payment/';



}