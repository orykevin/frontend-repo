import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserDataApi, updateUserDataApi } from '../apis/userApi';
import { User, UserDataForm } from '@/apis/user';

interface UserState {
  data: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  updateStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  updateError: string | null;
}

const initialState: UserState = {
  data: null,
  loading: 'idle',
  error: null,
  updateStatus: 'idle',
  updateError: null,
};


export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserDataApi();
      if (response) return response

      return rejectWithValue(response || 'Failed to fetch user data')
    } catch (error: any) {
      console.error("fetchUser thunk error:", error);
      return rejectWithValue(error.message || 'Failed to fetch user data');
    }
  }
);

export const updateUser = createAsyncThunk<
  { message: string; updatedData: UserDataForm },
  { userData: UserDataForm },
  { rejectValue: string }
>(
  'user/updateUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await updateUserDataApi(userData);
      return { message: response?.message || '', updatedData: userData };
    } catch (error: any) {
      console.error("updateUser thunk error:", error);
      return rejectWithValue(error.message || 'Failed to update user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      state.updateError = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'Unknown error fetching user';
        state.data = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'pending';
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        if (state.data && action.payload.updatedData) {
          state.data = { ...state.data, ...action.payload.updatedData };
        }
        fetchUser();
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.payload ?? 'Unknown error updating user';
      });
  },
});

export const { clearUser, resetUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
