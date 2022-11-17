export default {
  // Endpoints
  loginEndpoint: '/userauth/oauth/token',
  clientToken: "/userauth/oauth/token",
  countryToken: "/account/api/countries",
  // registerEndpoint: '/jwt/register',
  registerEndpoint: '/account/api/user/create',
  verifyToken:"/account/api/forgot-password",
  resetPasswordRequestEndpoint: '/account/api/forgot-password',
  resetPasswordEndpoint: '/account/api/save-forgot-password',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  invoiceAddEndpoint: '/account/api/user-invoice/create',
  invoiceEditEndpoint: '/account/api/user-invoice',
  invoiceDeleteEndpoint: '/account/api/user-invoice',
  UserEditEndpoint: '/account/api/user-person',
  UserDeleteEndpoint: '/account/api/user-person',
  SearchCompanyEndpoint: '/index/api/search-companies/search-by-name',
  

  getCompanies: '/api/company/list/1/10',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
