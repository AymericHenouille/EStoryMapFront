import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-import-side',
  templateUrl: './import-side.component.html',
  styleUrls: ['./import-side.component.scss']
})
export class ImportSideComponent {

  @Input() public project!: Project;

  constructor(
    private snackBar: MatSnackBar,
    private projectService: ProjectService
  ) { }

  public updateNotify(project: Project): void {
    this.snackBar.open(`Projet ${project.label} mis à jour`, 'Ok', { duration: 2000 });
    this.projectService.updateRequest();
  }

}
