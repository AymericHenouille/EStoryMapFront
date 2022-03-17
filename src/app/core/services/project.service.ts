import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, merge, Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { AnalyseResponse, Project, Workspace } from '../models/project.model';
import { UploadFileService } from './upload-file.service';
import { WorkspaceService } from './workspaces.service';

export type FileType = 'bpmn' | 'mcd' | 'mfc'
@Injectable()
export class ProjectService {

  private upload: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private update$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(
    private httpClient: HttpClient,
    private workspaceService: WorkspaceService,
    private uploadFileService: UploadFileService
  ) { }

  public uploadFile(project: Project, type: FileType, file: File): Observable<HttpEvent<Object>> {
    return this.uploadFileService.uploadFile(file, `projects/${project.id}/${type}`).pipe(
      tap((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.upload.next(Math.round(100 * (event.total ? event.loaded / event.total : 0)));
        } else if (event.type == HttpEventType.Response) {
          this.upload.next(undefined);
        }
      })
    );
  }

  public getProjectById(id: string): Observable<Project> {
    return merge(of({}), this.update$.asObservable()).pipe(
      switchMap(() => this.httpClient.get<Project>(`projects/${id}`)),
    );
  }

  public addProject(workspace: Workspace, project: Project, coverFile?: File): Promise<Project> {
    return lastValueFrom(this.httpClient.post<Project>(`projects/${workspace.id}`, project).pipe(
      switchMap((project) => coverFile ? lastValueFrom(this.setProjectCover(project, coverFile)) : of(project)),
      tap(() => this.workspaceService.updateRequest()),
      tap(() => this.update$.next()),
    ));
  }

  public updateProject(workspace: Workspace, project: Project, coverFile?: File): Promise<Project> {
    return lastValueFrom(this.httpClient.put<Project>(`projects/${workspace.id}`, project).pipe(
      switchMap((project) => coverFile ? lastValueFrom(this.setProjectCover(project, coverFile)) : of(project)),
      tap(() => this.update$.next()),
    ));
  }

  public getProjectWorkspace(project: Project): Observable<Workspace> {
    console.log(project);
    return this.httpClient.get<Workspace>(`projects/${project.id}/workspace`);
  }

  public analyse(project: Project): Observable<AnalyseResponse> {
    return project.mcdName && project.bpmnName && project.mfcName
      ? this.httpClient.get<AnalyseResponse>(`project/${project.id}/verify`)
      : of({
        percent: 0,
        messages: ['Vous devez envoyer tout les fichier pour avoir une analyse.']
      });
  }

  public get uploadCover$(): Observable<number | undefined> {
    return this.upload.asObservable();
  }

  private setProjectCover(project: Project, cover: File): Observable<Project> {
    return this.uploadFileService.uploadFile(cover, `projects/${project.id}/cover`).pipe(
      tap((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.upload.next(Math.round(100 * (event.total ? event.loaded / event.total : 0)));
        } else if (event.type == HttpEventType.Response) {
          this.upload.next(undefined);
        }
      }),
      map((event) => event.type == HttpEventType.Response ? event.body as Project : project)
    );
  }

  public updateRequest(): void {
    this.update$.next();
  }

}
