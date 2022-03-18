import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Workspace } from 'src/app/core/models/project.model';
import { WorkspaceService } from 'src/app/core/services/workspaces.service';
import { ComfirmComponent } from '../../modals/comfirm/comfirm.component';
import { EditWorkspaceComponent } from '../../modals/edit-workspace/edit-workspace.component';

@Component({
  selector: 'app-add-workspace',
  template: `
  <button mat-fab [color]="color" (click)="addWorkspace()" aria-label="Add or Edit Workspace">
    <mat-icon>{{ mode }}</mat-icon>
  </button>
  `
})
export class AddWorkspaceComponent implements OnDestroy {

  @Input() public workspace: Workspace | undefined;
  @Input() public mode: 'add' | 'edit' | 'delete' = 'add';

  private _workspace!: Subscription;

  constructor(
    private dialog: MatDialog,
    private workspaceService: WorkspaceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public addWorkspace(): void {
    this._workspace = (
      this.mode === 'delete'
        ? this.dialog.open(ComfirmComponent, {
            data: { workspace: this.workspace }
          })
        : this.dialog.open(EditWorkspaceComponent, {
          data: { workspace: this.workspace },
          width: '500px'
        })).afterClosed().pipe(filter(result => !!result)).subscribe(result => {
      if (result) {
        this.setWorkspace(result)
          .then((newWorkspace) => this.snackBar.open('Mise a jour de vos workspaces', 'voir', { duration: 3000 }).onAction()
            .subscribe(() => this.router.navigate(['/workspaces', newWorkspace.id])))
          .catch(({message}) => this.snackBar.open(message, 'ok', { duration: 3000 }));
      }
    });
  }

  public ngOnDestroy(): void {
    this._workspace?.unsubscribe();
  }

  private setWorkspace(workspace: Workspace): Promise<Workspace> {
    switch (this.mode) {
      case 'add': return this.workspaceService.addWorkspace(workspace);
      case 'edit': return this.workspaceService.updateWorkspace(workspace);
      case 'delete': return this.workspaceService.deleteWorkspace(this.workspace as Workspace);
    }
  }

  public get color(): string {
    switch (this.mode) {
      case 'add': return 'primary';
      case 'edit': return 'accent';
      case 'delete': return 'warn';
    }
  }


}

