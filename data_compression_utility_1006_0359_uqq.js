// 代码生成时间: 2025-10-06 03:59:20
// Import necessary Angular modules
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCompressionUtility {
  
  // Compress data using deflate algorithm
  /**
   * Compresses a given string using the deflate algorithm.
   * @param {string} data - The string to be compressed.
   * @returns {Uint8Array} - The compressed data as a Uint8Array.
   * @throws {Error} - If the input is not a string.
   */
  compressData(data: string): Uint8Array {
    if (typeof data !== 'string') {
      throw new Error('Input data must be a string.');
    }

    // Convert string to a Uint8Array
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);

    // Compress the data using the deflate algorithm
    const compressedData = new Zlib.Deflate(uint8Array).compress();

    return compressedData;
  }

  // Decompress data that was compressed using deflate algorithm
  /**
   * Decompresses a given Uint8Array using the inflate algorithm.
   * @param {Uint8Array} compressedData - The compressed data to be decompressed.
   * @returns {string} - The decompressed string.
   * @throws {Error} - If the input is not a Uint8Array.
   */
  decompressData(compressedData: Uint8Array): string {
    if (!(compressedData instanceof Uint8Array)) {
      throw new Error('Input data must be a Uint8Array.');
    }

    // Decompress the data using the inflate algorithm
    const decompressedData = new Zlib.Inflate(compressedData).decompress();

    // Convert Uint8Array back to string
    const decoder = new TextDecoder();
    return decoder.decode(decompressedData);
  }
}
