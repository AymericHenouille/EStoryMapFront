import { Component, Input } from '@angular/core';
import { Workspace } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss']
})
export class WorkspaceCardComponent {

  @Input() workspace!: Workspace;

}
