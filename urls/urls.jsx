/* eslint-disable */

import { HttpAxiosService } from './httpService';
import { Urls } from './constantsUrls.jsx';
import { test_url } from '../config/environment.js';

const project = new HttpAxiosService(test_url);

//login and signup
export const signupCustomer = (payload_data) => {
  return project.post(Urls.SIGN_UP_CUSTOMER, payload_data);
};
export const LoginCustomer = (payload_data) => {
  return project.post(Urls.LOGIN_CUSTOMER, payload_data);
};
export const fetchDashboard = (payload_data) => {
  return project.get(Urls.FETCH_DASHBOARD, payload_data);
};
export const fetchSingleMenuItem = (payload_data) => {
  return project.get(Urls.SINGLE_MENU_ITEM, payload_data);
};
export const addToCartCustomer = (payload_data) => {
  return project.post(Urls.ADD_TO_CART, payload_data);
};
export const fetchCartCustomer = (payload_data) => {
  return project.get(Urls.FETCH_CUSTOMER_CART, payload_data);
};
export const CartAction = (payload_data) => {
  return project.post(Urls.CUSTOMER_CART_ACTION, payload_data);
};
export const getAddresses = (payload_data) => {
  return project.get(Urls.GET_ADDRESSES_CUSTOMER, payload_data);
};
export const addNewAddress = (payload_data) => {
  return project.post(Urls.ADD_NEW_ADDRESSES, payload_data);
};
export const deleteAddress = (payload_data) => {
  return project.post(Urls.DELETE_ADDRESS, payload_data);
};
export const defaultAddress = (payload_data) => {
  return project.post(Urls.DEFAULT_ADDRESS, payload_data);
};
export const fetchUserDetails = (payload_data) => {
  return project.get(Urls.FETCH_USER_DETAILS, payload_data);
};
export const EditUserDetails = (payload_data) => {
  return project.post(Urls.EDIT_USER_DETAILS, payload_data);
};
export const PlaceOrderBeforePayment = (payload_data) => {
  return project.post(Urls.PLACE_ORDER_BEFORE_PAYMENT, payload_data);
};
export const fetchCustomerOrders = (payload_data) => {
  return project.get(Urls.FETCH_CUSTOMER_ORDER, payload_data);
};
export const getOrderView = (payload_data) => {
  return project.get(Urls.GET_SINGLE_ORDER, payload_data);
};
export const getAllMenu = (payload_data) => {
  return project.get(Urls.GET_ALL_MENU_ITEMS, payload_data);
};
export const CategoryMenu = (payload_data) => {
  return project.get(Urls.CATEGORY_MENU, payload_data);
};
export const getCustomerNotification = (payload_data) => {
  return project.get(Urls.GET_USER_NOTIFICATION, payload_data);
};
export const checkRestOfflineOnline = (payload_data) => {
  return project.get(Urls.CHECK_REST_ONLINE, payload_data);
};
export const addNewReview = (payload_data) => {
  return project.post(Urls.ADD_NEW_REVIEW, payload_data);
};
export const sendUserOtp = (payload_data) => {
  return project.post(Urls.SEND_OTP, payload_data);
};
export const VerifyCode = (payload_data) => {
  return project.get(Urls.VERIFY_CODE, payload_data);
};
export const InitiatePayment = (payload_data) => {
  return project.post(Urls.INITIATE_PAYMENT_STATUS, payload_data);
};
export const FetchPaymentStatus = (payload_data) => {
  return project.get(Urls.FETCH_PAYMENT_STATUS, payload_data);
};
export const PlaceOrderAfterPayment = (payload_data) => {
  return project.post(Urls.PLACE_ORDER_AFTER_PAYMENT, payload_data);
};
export const ForgotPasswordOtpSend = (payload_data) => {
  return project.post(Urls.FORGOT_PASSWORD_OTP_SEND, payload_data);
};
export const ChangePasswordCustomer = (payload_data) => {
  return project.post(Urls.CHANGE_PASSWORD_CUSTOMER, payload_data);
};
