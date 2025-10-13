// 代码生成时间: 2025-10-13 18:25:05
import { Injectable } from '@angular/core';
import { HammerGestureConfig, HammerGesturesManager } from '@angular/platform-browser';
import { HammerInput } from '@hammerjs/hammerjs';

@Injectable({
  providedIn: 'root'
})
export class GestureRecognitionService {
  private manager: HammerGesturesManager;

  constructor(private gestureConfig: HammerGestureConfig) {
    this.gestureConfig.overridePatch = (instance: any) => {
      // Override the Hammer.js recognizers to improve gesture recognition
    };
  }

  /**
   * Initialize the gesture manager and bind the event listeners.
   *
   * @param {Element} element - The HTML element to attach the gestures to.
   */
  initializeGestureManager(element: HTMLElement): void {
    this.manager = new HammerGesturesManager(this.gestureConfig, element);

    this.manager.add(['pinch', 'rotate', 'swipe', 'pan', 'tap', 'press'], {
      preset: [
        ['pinch', { enable: true, threshold: 0.1 }, ['rotate']],
        ['rotate', { enable: true }, ['pinch']],
        ['swipe', { direction: Hammer.DIRECTION_ALL }, ['pan']],
        ['pan', { direction: Hammer.DIRECTION_ALL }, ['swipe']],
        ['tap'],
        ['press']
      ]
    });
  }

  /**
   * Add a listener for a specific gesture.
   *
   * @param {string} gesture - The gesture to listen for.
   * @param {Function} callback - The callback function to execute when the gesture is recognized.
   */
  addListener(gesture: string, callback: (event: HammerInput) => void): void {
    if (!this.manager) {
      console.error('Gesture manager is not initialized.');
      return;
    }

    this.manager.on(gesture, callback);
  }

  /**
   * Remove a listener for a specific gesture.
   *
   * @param {string} gesture - The gesture to remove the listener for.
   * @param {Function} callback - The callback function to remove.
   */
  removeListener(gesture: string, callback: (event: HammerInput) => void): void {
    if (!this.manager) {
      console.error('Gesture manager is not initialized.');
      return;
    }

    this.manager.off(gesture, callback);
  }

  /**
   * Destroy the gesture manager to clean up resources.
   */
  destroy(): void {
    if (this.manager) {
      this.manager.destroy();
    }
  }
}
