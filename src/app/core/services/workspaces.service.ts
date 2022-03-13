import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../models/project.model';

@Injectable()
export class WorkspaceService {

  constructor(private httpClient: HttpClient) { }

  public get workspaces$(): Observable<Workspace[]> {
    return this.httpClient.get<Workspace[]>('workspaces');
  }

  public getWorkspaceById(id: string): Observable<Workspace> {
    return this.httpClient.get<Workspace>(`workspaces/${id}`);
  }

  public createNewWorkspace(workspace: Workspace): Observable<string> {
    return this.httpClient.post<string>(`workspaces/${workspace.id}`, workspace);
  }

}
