import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Workspace } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-edit-workspace',
  templateUrl: './edit-workspace.component.html',
  styleUrls: ['./edit-workspace.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditWorkspaceComponent implements OnInit {

  public label!: string;
  public color!: string;
  public emoji: string | undefined;

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  constructor(
    private dialogRef: MatDialogRef<EditWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { workspace: Workspace }
  ) { }

  public ngOnInit(): void {
    const { workspace } = this.data;
    this.label = workspace?.label ?? '';
    this.color = workspace?.color ?? randomColor();
    this.emoji = workspace?.emoticon ?? '';
  }

  public selectEmoji(event: EmojiEvent): void {
    this.emoji = event.emoji.native;
    this.menu.closeMenu();
  }

  public onSubmit(): void {
    const workspace: Workspace = {
      ...this.data.workspace,
      label: this.label,
      color: this.color,
      emoticon: this.emoji
    };
    this.dialogRef.close(workspace);
  }

  public get action(): string {
    return this.data.workspace ? 'Editer' : 'Créer';
  }

}

export function randomColor(): string {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
  }
  return color;
}
