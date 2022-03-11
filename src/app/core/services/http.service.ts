import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string, httpHeaderConfig = {}): Observable<T> {
    const headers: HttpHeaders = new HttpHeaders(httpHeaderConfig);
    return this.httpClient.get<T>(`${environment.serverLocation}/api/${url}`, {headers, responseType: 'text' as 'json'});
  }

  public post<T>(url: string, body: unknown): Observable<T> {
    return this.httpClient.post<T>(`${environment.serverLocation}/api/${url}`, body, { responseType: 'text' as 'json' });
  }

  public put<T>(url: string, body: unknown): Observable<T> {
    return this.httpClient.put<T>(`${environment.serverLocation}/api/${url}`, body, { responseType: 'text' as 'json' });
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${environment.serverLocation}/api/${url}`, { responseType: 'text' as 'json' });
  }

}
