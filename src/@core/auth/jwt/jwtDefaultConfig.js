export default {
  // Endpoints
  loginEndpoint: '/userauth/oauth/token',
  clientToken: "/userauth/oauth/token",
  // registerEndpoint: '/jwt/register',
  registerEndpoint: '/account/api/user/create',
  resetPasswordRequestEndpoint: '/account/api/forgot-password',
  resetPasswordEndpoint: '/account/api/save-forgot-password',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
