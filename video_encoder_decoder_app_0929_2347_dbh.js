// 代码生成时间: 2025-09-29 23:47:40
// Import Angular core modules and components
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VideoEncoderService } from './video-encoder.service';

@Component({
  selector: 'app-video-encoder-decoder',
  templateUrl: './video_encoder_decoder.component.html',
  styleUrls: ['./video_encoder_decoder.component.css']
})
export class VideoEncoderDecoderComponent {
  // Property to hold the video file to be encoded
  videoFile: File = null;

  constructor(private encoderService: VideoEncoderService) {}

  // Method to handle file input changes
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.videoFile = input.files[0];
    }
  }

  // Method to start encoding the video file
  encodeVideo(form: NgForm): void {
    if (!form.valid || !this.videoFile) {
      console.error('Invalid form or no file selected');
      return;
    }

    try {
      this.encoderService.encodeVideo(this.videoFile).subscribe(
        blobUrl => {
          console.log('Encoded video URL:', blobUrl);
          // Display or use the encoded video URL as needed
        },
        error => {
          console.error('Error encoding video:', error);
        }
      );
    } catch (error) {
      console.error('Error during video encoding:', error);
    }
  }
}

/**
 * video-encoder.service.js
 *
 * Service responsible for handling video encoding and decoding.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoEncoderService {
  private onDestroy = new Subject<void>();

  constructor() {}

  // Method to encode the video file
  encodeVideo(videoFile: File): Observable<string> {
    return new Observable(subscriber => {
      const mediaRecorder = new MediaRecorder(new Blob([videoFile]), {
        mimeType: 'video/webm; codecs=vp8'
      });

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        subscriber.next(window.URL.createObjectURL(event.data));
      };

      mediaRecorder.onstop = () => {
        subscriber.complete();
      };

      mediaRecorder.onerror = (event: MediaRecorderErrorEvent) => {
        subscriber.error(event.error);
      };

      mediaRecorder.start();

      // Stop recording after 5 seconds for demonstration purposes
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);

      // Use the onDestroy subject to teardown the subscription when component is destroyed
      this.onDestroy.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        mediaRecorder.stop();
        subscriber.complete();
      });
    });
  }
}
