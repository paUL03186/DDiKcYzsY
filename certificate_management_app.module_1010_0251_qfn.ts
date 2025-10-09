// 代码生成时间: 2025-10-10 02:51:34
 * It includes services for managing certificates and components for displaying and interacting with certificate data.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateService } from './certificate.service';
import { FormsModule } from '@angular/forms';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    CertificateListComponent,
    CertificateDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    CertificateService
  ],
  bootstrap: [CertificateListComponent]
})
export class CertificateManagementAppModule {
}


/*
 * Certificate Service
 *
 * This service is responsible for fetching and managing certificate data.
 * It uses Angular's HttpClient to interact with a backend API.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = 'https://api.example.com/certificates';

  constructor(private http: HttpClient) { }

  getCertificates(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCertificate(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}


/*
 * Certificate List Component
 *
 * This component displays a list of certificates.
 * It uses the CertificateService to fetch the data.
 */
import { Component, OnInit } from '@angular/core';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-certificate-list',
  template: `
    <ul>
      <li *ngFor="let certificate of certificates">{{ certificate.name }}</li>
    </ul>
  `,
  styles: []
})
export class CertificateListComponent implements OnInit {
  certificates: any[] = [];

  constructor(private certificateService: CertificateService) { }

  ngOnInit() {
    this.certificateService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
      },
      error: (error) => {
        console.error('Error fetching certificates:', error);
      }
    });
  }
}


/*
 * Certificate Detail Component
 *
 * This component displays the detailed information of a single certificate.
 * It uses the CertificateService to fetch the data based on the provided certificate ID.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-certificate-detail',
  template: `
    <div *ngIf="certificate">
      <h2>{{ certificate.name }}</h2>
      <p>{{ certificate.description }}</p>
    </div>
  `,
  styles: []
})
export class CertificateDetailComponent implements OnInit {
  certificate: any;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.certificateService.getCertificate(id).subscribe({
      next: (data) => {
        this.certificate = data;
      },
      error: (error) => {
        console.error('Error fetching certificate:', error);
      }
    });
  }
}


/*
 * AppRoutingModule
 *
 * This module defines the routes for the application.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'certificates', component: CertificateListComponent },
  { path: 'certificate/:id', component: CertificateDetailComponent },
  { path: '', redirectTo: '/certificates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }