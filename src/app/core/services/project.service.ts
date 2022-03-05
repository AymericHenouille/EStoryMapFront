import { Injectable } from '@angular/core';
import { Project, Workspace } from '../models/project.model';

@Injectable()
export class ProjectService {

  public getProjectFromWorkspaceById(workspace: Workspace, id: string): Project {
    return workspace?.projects?.filter(project => project.id === id)[0] ?? id;
  }

}
