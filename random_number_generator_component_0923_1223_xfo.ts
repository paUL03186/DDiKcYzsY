// 代码生成时间: 2025-09-23 12:23:52
import { Component } from '@angular/core';

/**
 * RandomNumberGeneratorComponent is a component that generates a random number within a specified range.
 * It provides a simple interface for users to input the range and retrieve a random number.
 */
@Component({
  selector: 'app-random-number-generator',
  templateUrl: './random-number-generator.component.html',
  styleUrls: ['./random-number-generator.component.css']
})
export class RandomNumberGeneratorComponent {
  // The minimum value of the random number range
  minValue: number = 1;

  // The maximum value of the random number range
  maxValue: number = 100;

  // The generated random number
  randomNumber: number | null = null;

  /**
   * Generates a random number within the specified range.
   * @returns {void}
   */
  generateRandomNumber(): void {
    // Check if the maxValue is greater than minValue
    if (this.maxValue < this.minValue) {
      console.error('Error: Maximum value must be greater than minimum value.');
      return;
    }

    // Calculate the range and generate a random number within that range
    const range = this.maxValue - this.minValue + 1;
    this.randomNumber = Math.floor(Math.random() * range) + this.minValue;
  }

  /**
   * Resets the min and max values to their default values.
   * @returns {void}
   */
  resetDefaultRange(): void {
    this.minValue = 1;
    this.maxValue = 100;
  }
}
