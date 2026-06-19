import {
  clearAccessTokenCookie,
  getAccessTokenFromDocument,
  setAccessTokenCookie,
} from "@/lib/auth/cookies";
import {
  clearTempAuth,
  getTempToken,
  setResetToken,
  setTempToken,
} from "@/lib/auth/session";
import {
  authApi,
  type AuthUser,
  type ChangePasswordPayload,
  type LoginPayload,
  type RegisterPayload,
  type ResetPasswordPayload,
} from "@/lib/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  message: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,
  message: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    payload: LoginPayload & { remember?: boolean },
    { rejectWithValue },
  ) => {
    try {
      const { remember, ...credentials } = payload;
      const response = await authApi.login(credentials);
      setAccessTokenCookie(response.data.token, remember);
      return { ...response.data, remember: !!remember };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed.",
      );
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      setTempToken(response.data.token, "register");
      return response.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed.",
      );
    }
  },
);

export const verifyRegistrationOtp = createAsyncThunk(
  "auth/verifyRegistrationOtp",
  async (otp: string, { rejectWithValue }) => {
    try {
      const token = getTempToken();
      if (!token) {
        return rejectWithValue("Session expired. Please register again.");
      }
      await authApi.verifyRegistrationOtp(otp, token);
      clearTempAuth();
      return "Registration complete. You can sign in now.";
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "OTP verification failed.",
      );
    }
  },
);

export const resendRegistrationOtp = createAsyncThunk(
  "auth/resendRegistrationOtp",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTempToken();
      if (!token) {
        return rejectWithValue("Session expired. Please register again.");
      }
      const response = await authApi.resendOtp(token);
      setTempToken(response.data.token, "register");
      return response.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Could not resend OTP.",
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      setTempToken(response.data.token, "forgot");
      return response.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Request failed.",
      );
    }
  },
);

export const verifyForgotOtp = createAsyncThunk(
  "auth/verifyForgotOtp",
  async (otp: string, { rejectWithValue }) => {
    try {
      const token = getTempToken();
      if (!token) {
        return rejectWithValue("Session expired. Request a new reset link.");
      }
      const response = await authApi.verifyForgotOtp(otp, token);
      setResetToken(response.data.token);
      return response.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "OTP verification failed.",
      );
    }
  },
);

export const resendForgotOtp = createAsyncThunk(
  "auth/resendForgotOtp",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTempToken();
      if (!token) {
        return rejectWithValue("Session expired. Request a new reset link.");
      }
      const response = await authApi.resendOtp(token);
      setTempToken(response.data.token, "forgot");
      return response.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Could not resend OTP.",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const token = getTempToken();
      if (!token) {
        return rejectWithValue("Session expired. Start the reset flow again.");
      }
      await authApi.resetPassword(payload, token);
      clearTempAuth();
      return "Password updated. You can sign in now.";
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Password reset failed.",
      );
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: ChangePasswordPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue("You need to sign in first.");
      }
      await authApi.changePassword(payload, token);
      return "Password changed successfully.";
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Password change failed.",
      );
    }
  },
);

export const hydrateAuth = createAsyncThunk(
  "auth/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessTokenFromDocument();
      if (!token) {
        return null;
      }
      const response = await authApi.myProfile(token);
      return { user: response.data, token };
    } catch {
      clearAccessTokenCookie();
      return rejectWithValue(null);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthMessage(state) {
      state.message = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
      clearAccessTokenCookie();
      clearTempAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Login failed.";
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Registration failed.";
      })

      .addCase(verifyRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegistrationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(verifyRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Verification failed.";
      })

      .addCase(resendRegistrationOtp.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Request failed.";
      })

      .addCase(verifyForgotOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyForgotOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(verifyForgotOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Verification failed.";
      })

      .addCase(resendForgotOtp.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Reset failed.";
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Change failed.";
      })

      .addCase(hydrateAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearAuthError, clearAuthMessage, logout } = authSlice.actions;
export default authSlice.reducer;
