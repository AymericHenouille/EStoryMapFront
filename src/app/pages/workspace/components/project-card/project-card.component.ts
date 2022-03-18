import { Component, Input } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() public project!: Project;

  public get image(): string {
    return `${environment.serverLocation}/api/projects/${this.project.id}/cover`;
  }

}
