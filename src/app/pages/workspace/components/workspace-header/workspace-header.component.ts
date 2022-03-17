import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { Workspace } from 'src/app/core/models/project.model';
import { WorkspaceService } from 'src/app/core/services/workspaces.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace-header',
  template: `
    <div [ngStyle]="{
      'border-top': 'solid 0.5em ' + workspace?.color
    }"></div>
  `
})
export class WorkspaceHeaderComponent implements OnInit, OnDestroy {

  public workspace!: Workspace;
  private _workspace!: Subscription;

  constructor(
    private workspaceService: WorkspaceService,
    private routes: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._workspace = this.routes.paramMap.pipe(
      map(param => param.get('id') as string),
      filter(id => !!id),
      switchMap(id => this.workspaceService.getWorkspaceById(id)),
    ).subscribe(workspace => this.workspace = workspace);
  }

  public ngOnDestroy(): void {
    this._workspace.unsubscribe();
  }

}
