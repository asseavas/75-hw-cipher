import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { CipherParams } from '../types';

export const encodeMessage = createAsyncThunk(
  'cipher/encodeMessage',
  async ({ password, message }: CipherParams) => {
    const response = await axiosApi.post('/ciphers/encode', { password, message });
    return response.data.encoded;
  }
);

export const decodeMessage = createAsyncThunk(
  'cipher/decodeMessage',
  async ({ password, message }: CipherParams) => {
    const response = await axiosApi.post('/ciphers/decode', { password, message });
    return response.data.decoded;
  }
);
