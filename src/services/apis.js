const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  REFRESH_API: BASE_URL + "/auth/refreshToken",
  CHAPTERS_API: BASE_URL + "/practice-test",
  LOGIN_API: BASE_URL + "/auth/signIn",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  ALLCATEGORY_API: BASE_URL + "/categories",
  PRACTISEBYNAME_API: BASE_URL + "/category/practice-test",
  USERINFO_API: BASE_URL + "/user",
  DAILYDATA_API:  BASE_URL + "/leaderboard/daily",
  WEEKLYDATA_API:  BASE_URL + "/leaderboard/weekly",
  MONTHLYDATA_API:  BASE_URL + "/leaderboard/monthly",
  CHANGEEMAIL_API:BASE_URL + "/user/change-email"
};
