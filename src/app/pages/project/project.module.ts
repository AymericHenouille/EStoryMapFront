import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ImportSideComponent } from './components/import-side/import-side.component';
import { ReportSideComponent } from './components/report-side/report-side.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { ItemComponent } from './components/import-side/item/item.component';
import { EditModule } from 'src/app/features/edit/edit.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ImportSideComponent,
    ReportSideComponent,
    HeaderComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    EditModule
  ]
})
export class ProjectModule { }
