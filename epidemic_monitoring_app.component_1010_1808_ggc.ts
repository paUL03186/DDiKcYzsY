// 代码生成时间: 2025-10-10 18:08:08
 * Provides a user interface to display and manage disease data.
 */
import { Component, OnInit } from '@angular/core';
import { EpidemicService } from './epidemic.service'; // Importing the service

@Component({
  selector: 'app-epidemic-monitoring',
  templateUrl: './epidemic_monitoring_app.component.html',
  styleUrls: ['./epidemic_monitoring_app.component.css']
})
export class EpidemicMonitoringAppComponent implements OnInit {
  // Define properties to hold data
  diseases: any[] = [];
  errorMessage: string = '';

  constructor(private epidemicService: EpidemicService) {}

  // Lifecycle hook to fetch data on initialization
  ngOnInit(): void {
    this.fetchDiseases();
  }

  // Method to fetch diseases from the service
  fetchDiseases(): void {
    this.epidemicService.getDiseases().subscribe(
      data => {
        this.diseases = data;
      },
      error => {
        this.errorMessage = 'Failed to fetch diseases: ' + error.message;
      }
    );
  }

  // Method to handle error
  handleError(error: any): void {
    this.errorMessage = error.message || 'Error occurred';
  }
}

/*
 * EpidemicService
 * Service for fetching and managing infectious disease data.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpidemicService {
  private apiUrl = 'api/diseases'; // URL to web api

  constructor(private http: HttpClient) {}

  // Method to get diseases from API
  getDiseases(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Private method to handle errors
  private handleError(error: any): Observable<never> {
    const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // Log to console instead
    return throwError(errMsg);
  }
}