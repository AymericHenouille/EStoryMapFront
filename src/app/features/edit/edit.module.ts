import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddWorkspaceComponent } from './components/add-workspace/add-workspace.component';
import { EditProjectComponent } from './modals/edit-project/edit-project.component';
import { EditWorkspaceComponent } from './modals/edit-workspace/edit-workspace.component';

const COMPONENTS: Type<any>[] = [
  AddProjectComponent,
  AddWorkspaceComponent,
  EditProjectComponent,
  EditWorkspaceComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    SharedModule,
    FormsModule,
    PickerModule,
    ColorPickerModule,
  ],
  exports: [COMPONENTS]
})
export class EditModule { }
