import { createSlice } from '@reduxjs/toolkit';
import { encodeMessage, decodeMessage } from './ciphersThunks';

export interface CipherState {
  text: string;
  cipher: string;
  loading: boolean;
}

const initialState: CipherState = {
  text: '',
  cipher: '',
  loading: false,
};

const ciphersSlice = createSlice({
  name: 'ciphers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(encodeMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.cipher = action.payload;
      })
      .addCase(encodeMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(decodeMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(decodeMessage.fulfilled, (state, {payload: text}) => {
        state.loading = false;
        state.text = text;
      })
      .addCase(decodeMessage.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    selectCipherText: (state) => state.text,
    selectCipher: (state) => state.cipher,
    selectCipherLoading: (state) => state.loading,
  },
});

export const ciphersReducer = ciphersSlice.reducer;

export const {
  selectCipherText,
  selectCipher,
  selectCipherLoading
  } = ciphersSlice.selectors;