import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Workspace } from 'src/app/core/models/project.model';
import { WorkspaceService } from 'src/app/core/services/workspaces.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  public workspaces: Workspace[] = [];
  private _workspaces!: Subscription;

  constructor(private workspaceService: WorkspaceService) { }

  public ngOnInit(): void {
    this._workspaces = this.workspaceService.workspaces$
      .subscribe(workspaces => this.workspaces = workspaces);
  }

  public ngOnDestroy(): void {
    this._workspaces.unsubscribe();
  }

}
