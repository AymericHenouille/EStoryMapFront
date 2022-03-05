import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../models/project.model';
import { HttpService } from './http.service';

@Injectable()
export class WorkspaceService {

  constructor(private httpService: HttpService) { }

  public get workspaces$(): Observable<Workspace[]> {
    return this.httpService.get('workspaces');
  }

  public getWorkspaceById(id: string): Observable<Workspace> {
    return this.httpService.get(`workspaces/${id}`);
  }

  public createNewWorkspace(workspace: Workspace): Observable<string> {
    return this.httpService.post(`workspaces/${workspace.id}`, workspace);
  }

}
