import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Workspace } from 'src/app/core/models/project.model';
import { WorkspaceService } from 'src/app/core/services/workspaces.service';
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
  @Input() public mode: 'add' | 'edit' = 'add';

  private _workspace!: Subscription;

  constructor(
    private dialog: MatDialog,
    private workspaceService: WorkspaceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public addWorkspace(): void {
    this._workspace = this.dialog.open(EditWorkspaceComponent, {
      data: { workspace: this.workspace }
    }).afterClosed().subscribe(result => {
      if (result) {
        (this.mode === 'add' ? this.workspaceService.addWorkspace : this.workspaceService.updateWorkspace).call(this.workspaceService, result)
          .then((newWorkspace) => this.snackBar.open('Mise a jour de vos workspaces', 'voir', { duration: 3000 }).onAction()
            .subscribe(() => this.router.navigate(['/workspaces', newWorkspace.id])))
          .catch(({message}) => this.snackBar.open(message, 'ok', { duration: 3000 }));
      }
    });
  }

  public ngOnDestroy(): void {
    this._workspace?.unsubscribe();
  }

  public get color(): string {
    return this.mode === 'add' ? 'accent' : 'primary';
  }

}

