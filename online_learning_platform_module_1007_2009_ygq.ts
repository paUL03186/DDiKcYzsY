// 代码生成时间: 2025-10-07 20:09:00
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

// Services
import { CourseService } from './services/course.service';

// Routing
const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'courses' } // Wildcard route for 404
];

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CourseService // Provide the course service
  ],
  bootstrap: [CourseListComponent] // Boot module with CourseListComponent
})
export class OnlineLearningPlatformModule {}

/*
 * CourseListComponent
 *
 * This component lists all available courses.
 */
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  errorMessage: string;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: (err) => this.errorMessage = err.message
    });
  }
}

/*
 * CourseDetailComponent
 *
 * This component shows the details of a selected course.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.getCourse();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe({
      next: (course) => this.course = course,
      error: (err) => this.errorMessage = err.message
    });
  }
}

/*
 * ProfileComponent
 *
 * This component shows the user profile.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Profile data can be fetched from a service
  // For simplicity, it is not implemented here

  constructor() {}

  ngOnInit() {}
}

/*
 * CourseService
 *
 * This service handles data operations for courses.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = 'api/courses'; // URL to web API

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    return this.http.get(this.courseUrl)
      .pipe(catchError(this.handleError));
  }

  getCourse(id: string): Observable<any> {
    const url = `${this.courseUrl}/${id}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  // Handle Http operation that failed.
  // Let the app continue.
  private handleError(error: any) {
    // TODO: send the error to remote logging infrastructure
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

/*
 * Course Model
 *
 * This model represents a course.
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  price: number;
}
