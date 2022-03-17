import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Subscription } from 'rxjs';
import { Project, Workspace } from 'src/app/core/models/project.model';
import { randomColor } from '../edit-workspace/edit-workspace.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProjectComponent implements OnInit, OnDestroy {

  public label!: string;
  public cover!: string;
  public color!: string;
  public emoji: string | undefined;

  public coverContent!: string;

  private _cover!: Subscription;
  private file!: File;

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  constructor(
    private dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { workspace: Workspace, project: Project },
  ) { }

  public ngOnInit(): void {
    const { project } = this.data;
    this.label = project?.label ?? '';
    this.cover = project?.cover;
    this.color = project?.color ?? randomColor();
    this.emoji = project?.emoticon ?? '';
  }

  public ngOnDestroy(): void {
    this._cover?.unsubscribe();
  }

  public uploadFile(fileEvent: Event): void {
    const htmlInputElement: HTMLInputElement = fileEvent.target as HTMLInputElement;
    if (htmlInputElement.files && htmlInputElement.files.length > 0) {
      this.file = htmlInputElement.files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.coverContent = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  public selectEmoji(event: EmojiEvent): void {
    this.emoji = event.emoji.native;
    this.menu.closeMenu();
  }

  public onSubmit(): void {
    const project: Project = {
      ...this.data.project,
      label: this.label,
      cover: this.cover,
      color: this.color,
      emoticon: this.emoji
    };
    this.dialogRef.close([project, this.file]);
  }

  public get action(): string {
    return this.data.project ? 'Editer' : 'Créer';
  }

}
