import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const ROUTES: Routes = [
  { path: '', component: WorkspaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
