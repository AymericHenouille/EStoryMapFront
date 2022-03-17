import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyseResponse, Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-report-side',
  templateUrl: './report-side.component.html',
  styleUrls: ['./report-side.component.scss']
})
export class ReportSideComponent implements OnChanges, OnDestroy {

  @Input() public project!: Project;
  public analyse!: AnalyseResponse;

  private _analyse!: Subscription;

  constructor(private projectService: ProjectService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    const project: Project = changes['project'].currentValue;
    if (project) {
      this._analyse?.unsubscribe();
      this.projectService.analyse(project).subscribe(analyse => this.analyse = analyse);
    }
  }

  public ngOnDestroy(): void {
    this._analyse?.unsubscribe();
  }

}
