// 代码生成时间: 2025-09-24 01:26:31
import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Password Encrypt Decrypt Tool</h1>
      <input #password type="password" placeholder="Enter password"/>
      <button (click)="encryptPassword(password.value)">Encrypt</button>
      <button (click)="decryptPassword(encryptedPassword)">Decrypt</button>
      <p>Encrypted: {{ encryptedPassword }}</p>
      <p>Decrypted: {{ decryptedPassword }}</p>
    </div>
  `,
  styles: []
})
export class AppComponent {
  // The encrypted password will be stored in this variable
  encryptedPassword = '';
  // The decrypted password will be stored in this variable
  decryptedPassword = '';
  
  // Secret key for encryption and decryption
  secretKey = 'mySecretKey';
  
  // Encrypts the password
  encryptPassword(password: string): void {
    try {
      // Encrypt the password using AES encryption
      this.encryptedPassword = CryptoJS.AES.encrypt(password, this.secretKey).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Encryption failed. Please try again.');
    }
  }
  
  // Decrypts the password
  decryptPassword(encrypted: string): void {
    try {
      // Decrypt the password using AES decryption
      const bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
      this.decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      alert('Decryption failed. Please try again.');
    }
  }
}

/*
 * Note:
 * This tool uses a fixed secret key for simplicity.
 * In a real-world application, you should use a secure method to generate and store the secret key.
 * Also, consider using environment variables or secure storage for sensitive information.
 * The CryptoJS library is used for encryption and decryption.
 * You can install it via npm: npm install crypto-js
 */