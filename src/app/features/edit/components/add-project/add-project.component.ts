import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Project, Workspace } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';
import { ComfirmComponent } from '../../modals/comfirm/comfirm.component';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';

@Component({
  selector: 'app-add-project',
  template: `
  <button mat-fab [color]="color" (click)="addProject()" aria-label="Add Workspace">
    <mat-icon>{{ mode }}</mat-icon>
  </button>
  `
})
export class AddProjectComponent implements OnDestroy {

  @Input() public workspace!: Workspace;
  @Input() public project: Project | undefined;
  @Input() public mode: 'add' | 'edit' | 'delete' = 'add';

  private _project!: Subscription;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public addProject(): void {
    this._project = (
      this.mode === 'delete'
        ? this.dialog.open(ComfirmComponent, {
            data: { project: this.project, workspace: this.workspace }
          })
        : this.dialog.open(EditProjectComponent, {
          data: { project: this.project, workspace: this.workspace },
          width: '500px'
        })).afterClosed().pipe(filter(result => !!result)).subscribe(([result, file]) =>
      this.setProject(result, file)
        .then((newProject) => this.snackBar.open('Mise a jour de votre workspaces', 'voir', { duration: 3000 }).onAction()
          .subscribe(() => this.router.navigate(['/project', newProject.id])))
        .catch(({message}) => this.snackBar.open(message, 'ok', { duration: 3000 }))
    );
  }

  public ngOnDestroy(): void {
    this._project?.unsubscribe();
  }

  private setProject(project: Project, file: File): Promise<Project> {
    switch (this.mode) {
      case 'add': return this.projectService.addProject(this.workspace, project, file);
      case 'edit': return this.projectService.updateProject(this.workspace, project, file);
      case 'delete': return this.projectService.deleteProject(this.project as Project);
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
