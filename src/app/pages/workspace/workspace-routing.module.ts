import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { WorkspaceViewComponent } from './pages/workspace-view/workspace-view.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const ROUTES: Routes = [
  { path: '', component: WorkspacePageComponent, children: [
    { path: '', component: WorkspaceComponent },
    { path: ':id', component: WorkspaceViewComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
