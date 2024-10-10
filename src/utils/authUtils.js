// tokenUtils.j
import { refreshToken } from "@/features/auth/authSlice";
import { isTokenExpired } from "@/features/auth/authSlice";

export const checkTokenExpiration = async (dispatch, auth) => {
  console.log(auth)
  const { tokenExpiration } = auth;
  console.log(tokenExpiration)
  console.log(isTokenExpired(tokenExpiration))
  if (isTokenExpired(tokenExpiration)) {
    
    await dispatch(refreshToken());
  }
};
