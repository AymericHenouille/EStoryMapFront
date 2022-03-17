import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { Project, Workspace } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  public project!: Project;
  public workspace!: Workspace;
  private _project!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  public ngOnInit(): void {
    this._project = this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      switchMap((id) => this.projectService.getProjectById(id ?? '')),
      switchMap((project: Project) => this.projectService.getProjectWorkspace(project).pipe(
        map((workspace) => ({ project, workspace }))
      )
    )).subscribe(({project, workspace}) => {
      this.project = project;
      console.log(this.workspace = workspace);
    });
  }

  public ngOnDestroy(): void {
    this._project.unsubscribe();
  }

}
