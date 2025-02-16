import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
};
  
  export const decryptData = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) {
        throw new Error('Decryption failed');
      }
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
};