import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { WorkspaceCardComponent } from './components/workspace-card/workspace-card.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkspaceHeaderComponent } from './components/workspace-header/workspace-header.component';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { WorkspaceViewComponent } from './pages/workspace-view/workspace-view.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceCardComponent,
    ProjectCardComponent,
    WorkspaceHeaderComponent,
    WorkspacePageComponent,
    WorkspaceViewComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule
  ]
})
export class WorkspaceModule { }
