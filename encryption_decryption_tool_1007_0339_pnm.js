// 代码生成时间: 2025-10-07 03:39:24
 * This tool provides functionality to encrypt and decrypt strings using
 * a simple Caesar cipher method for educational purposes.
 *
 * @author Your Name
 * @version 1.0
 */

// Import Angular and other necessary modules
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {
  // Service to handle encryption and decryption
  constructor() {}

  // Encrypts a string using a simple Caesar cipher method
  encrypt(text: string, shift: number): string {
    if (!text) {
      throw new Error('No text provided for encryption.');
    }
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      if (char.match(/[a-z]/i)) {
        let code = text.charCodeAt(i);
        if (char === char.toUpperCase()) {
          code -= 65;
        } else {
          code -= 97;
        }
        code = (code + shift) % 26;
        code = (code + 65) % 26;
        if (text.charAt(i) === char.toUpperCase()) {
          code = code - 65;
        } else {
          code = code - 97;
        }
        encryptedText += String.fromCharCode(code);
      } else {
        encryptedText += text.charAt(i);
      }
    }
    return encryptedText;
  }

  // Decrypts a string using a simple Caesar cipher method
  decrypt(text: string, shift: number): string {
    if (!text) {
      throw new Error('No text provided for decryption.');
    }
    // Decryption is the same as encryption with the shift value negated
    return this.encrypt(text, -shift);
  }
}

// Example usage of the service
// import { EncryptionDecryptionService } from './encryption_decryption_service';

// const encryptionService = new EncryptionDecryptionService();
// const encrypted = encryptionService.encrypt('Hello World!', 3);
// console.log('Encrypted:', encrypted);
// const decrypted = encryptionService.decrypt(encrypted, 3);
// console.log('Decrypted:', decrypted);