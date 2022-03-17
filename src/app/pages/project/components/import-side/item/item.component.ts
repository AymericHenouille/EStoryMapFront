import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { Project } from 'src/app/core/models/project.model';
import { FileType, ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnDestroy {

  @Input() public type!: FileType;
  @Input() public project!: Project;
  @Output() public projectUpdate: EventEmitter<Project> = new EventEmitter();

  public fileName: string | undefined;

  private _upload!: Subscription;

  constructor(private projectService: ProjectService) { }

  public uploadFile(fileEvent: Event): void {
    const htmlInputElement: HTMLInputElement = fileEvent.target as HTMLInputElement;
    if (htmlInputElement.files && htmlInputElement.files.length > 0) {
      this._upload?.unsubscribe();
      this._upload = this.projectService.uploadFile(this.project, this.type, htmlInputElement.files[0]).pipe(
        filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
        map((response) => response as HttpResponse<any>),
      ).subscribe((project) => this.projectUpdate.emit(project.body));
    }
  }

  public ngOnDestroy(): void {
    this._upload?.unsubscribe();
    this.projectUpdate.complete();
  }

  public get accept(): string {
    switch (this.type) {
      case 'bpmn':
        return '.bpmn';
      case 'mcd':
        return '.xml';
      case 'mfc':
        return '.drawio.xml';
    }
  }

  public get fileFieldName(): string {
    return (this.project as any)[this.type.toLowerCase() + 'Name'] as string ?? 'Aucun fichier';
  }
}
