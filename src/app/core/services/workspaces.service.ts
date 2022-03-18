import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, merge, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Workspace } from '../models/project.model';

@Injectable()
export class WorkspaceService {

  private workspaceSubject: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient, private router: Router) {}

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

  public deleteWorkspace(workspace: Workspace): Promise<Workspace> {
    return lastValueFrom(this.httpClient.delete<void>(`workspaces/${workspace.id}`).pipe(
      tap(() => this.updateRequest()),
      tap(() => this.router.navigate(['/workspaces']))
    )).then(() => workspace);
  }

  public updateRequest(): void {
    this.workspaceSubject.next();
  }


}
