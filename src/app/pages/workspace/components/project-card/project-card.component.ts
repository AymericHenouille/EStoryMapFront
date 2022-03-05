import { Component, Input } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  private readonly DEFAULT_COVER: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm7L_ZUqfSS42Ka83ejWJYpKtA861hFYzikg&usqp=CAU';

  @Input() public project!: Project;

  public get image(): string {
    return this.project.cover ?? this.DEFAULT_COVER;
  }

}
