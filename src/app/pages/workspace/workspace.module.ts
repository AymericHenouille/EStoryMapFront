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
import { SharedComponent } from './modals/shared/shared.component';
import { EditModule } from 'src/app/features/edit/edit.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceCardComponent,
    ProjectCardComponent,
    WorkspaceHeaderComponent,
    WorkspacePageComponent,
    WorkspaceViewComponent,
    SharedComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule,
    EditModule,
    FormsModule
  ]
})
export class WorkspaceModule { }
