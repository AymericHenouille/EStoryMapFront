import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project, Workspace } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.scss']
})
export class ComfirmComponent {

  constructor(
    private dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { workspace: Workspace, project: Project }
  ) { }

  public comfirm(): void {
    this.dialogRef.close([this.data.workspace, this.data.project]);
  }

  public cancel(): void {
    this.dialogRef.close(undefined);
  }

}
