import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, merge, Observable, of, Subject, zip } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Workspace } from '../models/project.model';

@Injectable()
export class WorkspaceService {

  private workspaceSubject: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  public get workspaces$(): Observable<Workspace[]> {
    return merge(of({}), this.workspaceSubject.asObservable()).pipe(
      switchMap(() => this.httpClient.get<Workspace[]>('workspaces'))
    );
  }

  public getWorkspaceById(id: string): Observable<Workspace> {
    return merge(of({}), this.workspaceSubject.asObservable()).pipe(
      switchMap(() => this.httpClient.get<Workspace>(`workspaces/${id}`))
    );
  }

  public addWorkspace(workspace: Workspace): Promise<Workspace> {
    return lastValueFrom(this.httpClient.post<Workspace>(`workspaces`, workspace).pipe(
      tap(() => this.updateRequest())
    ));
  }

  public updateWorkspace(workspace: Workspace): Promise<Workspace> {
    return lastValueFrom(this.httpClient.put<Workspace>(`workspaces`, workspace).pipe(
      tap(() => this.updateRequest())
    ));
  }

  public updateRequest(): void {
    this.workspaceSubject.next();
  }


}
