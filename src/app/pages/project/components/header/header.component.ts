import { Component, Input, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Project, Workspace } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public project!: Project;
  public workspace!: Workspace;
  private _workspace!: Subscription;

  constructor(private projectService: ProjectService) { }

  public ngOnInit(): void {
    this._workspace = this.projectService.getProjectWorkspace(this.project)
      .subscribe((workspace: Workspace) => this.workspace = workspace);
  }

  public ngOnDestroy(): void {
    this._workspace.unsubscribe();
  }

}
