import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Project, Workspace } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';

@Component({
  selector: 'app-add-project',
  template: `
  <button mat-fab (click)="addProject()" aria-label="Add Workspace">
    <mat-icon>{{ mode }}</mat-icon>
  </button>
  `
})
export class AddProjectComponent implements OnDestroy {

  @Input() public workspace!: Workspace;
  @Input() public project: Project | undefined;
  @Input() public mode: 'add' | 'edit' = 'add';

  private _project!: Subscription;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public addProject(): void {
    this._project = this.dialog.open(EditProjectComponent, {
      data: { project: this.project, workspace: this.workspace },
      width: '500px'
    }).afterClosed().pipe(filter(result => !!result)).subscribe(([result, file]) =>
      (this.mode === 'add' ? this.projectService.addProject : this.projectService.updateProject).call(this.projectService, this.workspace, result, file)
        .then((newProject) => this.snackBar.open('Mise a jour de votre workspaces', 'voir', { duration: 3000 }).onAction()
          .subscribe(() => this.router.navigate(['/project', newProject.id])))
        .catch(({message}) => this.snackBar.open(message, 'ok', { duration: 3000 }))
    );
  }

  public ngOnDestroy(): void {
    this._project?.unsubscribe();
  }

}
