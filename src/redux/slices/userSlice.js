import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../api/api';
import { getDeviceInfo } from '../../utils/deviceInfoUtils';

export const registerNewUser = createAsyncThunk('user/register', async () => {
  const userData = await getDeviceInfo();
  console.log("userData getDeviceInfo ====>", userData)
  const response = await registerUser(userData);
  console.log("registerNewUser Response==>", response.data)
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    secret: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload.userId;
        state.secret = action.payload.secret;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
