import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { File } from '../models/api/file';
import { FileAdapter } from '../models/adapters/file-adapter';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  public postFile(query: any): any {
    return this.http.post(environment.api + 'files', query)
      .pipe(catchError(err => {
        return throwError(err);

      }));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}

