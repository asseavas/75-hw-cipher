import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { decodeMessage, encodeMessage } from './ciphersThunks';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCipher, selectCipherLoading, selectCipherText } from './ciphersSlice';

const Cipher: React.FC = () => {
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectCipherText);
  const cipher = useAppSelector(selectCipher);
  const loading = useAppSelector(selectCipherLoading);


  const [inputData, setInputData] = useState({
    inputText: '',
    inputCipher: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEncode = () => {
    if (inputData.inputText && inputData.password) {
      dispatch(encodeMessage({ password: inputData.password, message: inputData.inputText }));
    }
    setInputData({ inputText: '', inputCipher: '', password: '' });
  };

  const handleDecode = () => {
    if (inputData.inputCipher && inputData.password) {
      dispatch(decodeMessage({ password: inputData.password, message: inputData.inputCipher }));
    }
    setInputData({ inputText: '', inputCipher: '', password: '' });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Vigenère Cipher
      </Typography>
      <TextField
        label="Text"
        name="inputText"
        fullWidth
        margin="normal"
        value={inputData.inputText}
        onChange={inputChangeHandler}
        disabled={loading}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={inputData.password}
        onChange={inputChangeHandler}
        disabled={loading}
      />
      <TextField
        label="Cipher Text"
        name="inputCipher"
        fullWidth
        margin="normal"
        value={inputData.inputCipher}
        onChange={inputChangeHandler}
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleEncode}
        disabled={loading}
      >
        Encrypt
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleDecode}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        Decrypt
      </Button>

      {cipher && (
        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 4 }}>
          Encrypted: {cipher}
        </Typography>
      )}

      {text && (
        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 4 }}>
          Decrypted: {text}
        </Typography>
      )}
    </Container>
  );
};

export default Cipher;
