import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.serverLocation}/api/${url}`);
  }

  public post<T>(url: string, body: unknown): Observable<T> {
    return this.httpClient.post<T>(`${environment.serverLocation}/api/${url}`, body);
  }

  public put<T>(url: string, body: unknown): Observable<T> {
    return this.httpClient.put<T>(`${environment.serverLocation}/api/${url}`, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${environment.serverLocation}/api/${url}`);
  }

}
