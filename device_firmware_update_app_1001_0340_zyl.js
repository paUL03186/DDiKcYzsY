// 代码生成时间: 2025-10-01 03:40:25
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Service to handle device firmware updates
 */
@Injectable({
  providedIn: 'root'
})
export class FirmwareUpdateService {

  /**
   * URL for the API endpoint handling firmware updates
   */
  private apiUrl = '/api/firmware-update';

  constructor(private http: HttpClient) { }

  /**
   * Initiate a firmware update for a device
   *
   * @param deviceId the identifier of the device to update
   * @param firmwareVersion the version of the firmware to update to
   * @returns an Observable that emits the update response
   */
  updateFirmware(deviceId: string, firmwareVersion: string): Observable<any> {
    const url = `${this.apiUrl}/${deviceId}/${firmwareVersion}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(url, {}, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle Http operation that failed.
   *
   * Let the app continue by throwing an error.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns an Observable of the error event
   */
  private handleError(error: any): Observable<never> {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    return throwError(error);
  }
}

/**
 * Component to display the firmware update form and handle user input
 */
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirmwareUpdateService } from './firmware-update.service';

@Component({
  selector: 'app-firmware-update',
  templateUrl: './firmware-update.component.html',
  styleUrls: ['./firmware-update.component.css']
})
export class FirmwareUpdateComponent {
  deviceId: string;
  firmwareVersion: string;
  updateForm = this.fb.group({
    deviceId: [''],
    firmwareVersion: ['']
  });

  constructor(private fb: FormBuilder, private updateService: FirmwareUpdateService) { }

  /**
   * Submit the firmware update form
   */
  onSubmit(): void {
    if (this.updateForm.valid) {
      this.deviceId = this.updateForm.value.deviceId;
      this.firmwareVersion = this.updateForm.value.firmwareVersion;
      this.updateService.updateFirmware(this.deviceId, this.firmwareVersion).subscribe({
        next: (response) => {
          // Handle successful update
          console.log('Firmware update successful:', response);
        },
        error: (error) => {
          // Handle error during update
          console.error('Firmware update failed:', error);
        }
      });
    } else {
      // Handle form validation errors
      console.error('Form is not valid.');
    }
  }
}
