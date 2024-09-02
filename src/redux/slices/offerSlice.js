import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableOffers } from '../../api/api';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';

export const fetchOffers = createAsyncThunk('offers/fetchOffers', async (body) => {
    const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
    const idfa = !res.isAdTrackingLimited ? res.id : null;
    const lang = "EN";
    // console.log("BODY ===>", body, idfa)
    const response = await fetchAvailableOffers({ ...body, idfa, lang });
    // console.log("RESPONSE of OFFERS===>", response.data)
    return response.data;
});

const offerSlice = createSlice({
    name: 'offers',
    initialState: {
      newOffers: [],
      inProgressOffers: [],
      completedOffers: [],
      status: 'idle',
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOffers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchOffers.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.newOffers = action.payload.newOffers;
          state.inProgressOffers = action.payload.inProgressOffers;
          state.completedOffers = action.payload.completedOffers;
        })
        .addCase(fetchOffers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

export default offerSlice.reducer;
