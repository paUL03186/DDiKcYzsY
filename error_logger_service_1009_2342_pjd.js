// 代码生成时间: 2025-10-09 23:42:50
import { Injectable } from '@angular/core';
import { LogEntry } from './log-entry.model'; // Assuming a LogEntry model exists
import { environment } from 'src/environments/environment'; // Assuming environment file exists

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  /**
   * Logs an error to the console and to the server if the environment is production.
   * @param error - The error object to be logged.
   * @param context - Optional string describing the context of the error.
   */
  logError(error: Error, context?: string): void {
    // Create a LogEntry instance with the error details and context
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      context: context || 'Unknown context'
    };

    // Log to the console
    console.error('Error logged:', logEntry);

    // If in production, send the log to the server
    if (environment.production) {
      this.sendLogToServer(logEntry);
    }
  }

  /**
   * Sends the log entry to the server.
   * @param logEntry - The log entry to send.
   */
  private sendLogToServer(logEntry: LogEntry): void {
    try {
      // Replace with actual server endpoint
      const endpoint = 'https://your-server-error-endpoint.com/log';
      
      // Use HttpClient to send the log entry to the server
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry),
      })
      .then(response => response.json())
      .then(data => console.log('Error log sent successfully', data))
      .catch(error => console.error('Error sending error log:', error));
    } catch (error) {
      // Handle errors while sending log to server
      console.error('Failed to send error log:', error);
    }
  }
}
