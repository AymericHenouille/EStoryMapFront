import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type FileData = {
  data: File;
  inProgress: boolean;
  progress: number;
}

@Injectable()
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File, url: string): Observable<HttpEvent<Object>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

}
