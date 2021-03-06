import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { Workspace } from 'src/app/core/models/project.model';
import { WorkspaceService } from 'src/app/core/services/workspaces.service';
import { SharedComponent } from '../../modals/shared/shared.component';

@Component({
  selector: 'app-workspace-view',
  templateUrl: './workspace-view.component.html',
  styleUrls: ['./workspace-view.component.scss']
})
export class WorkspaceViewComponent implements OnInit, OnDestroy {

  public workspace!: Workspace;
  private _workspace!: Subscription;

  constructor(
    private workspaceService: WorkspaceService,
    private routes: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this._workspace = this.routes.paramMap.pipe(
      map(param => param.get('id') as string),
      switchMap(id => this.workspaceService.getWorkspaceById(id)),
    ).subscribe(workspace => this.workspace = workspace);
  }

  public ngOnDestroy(): void {
    this._workspace.unsubscribe();
  }

  public share(): void {
    this.dialog.open(SharedComponent, {
      data: { workspace: this.workspace }
    });
  }

}
