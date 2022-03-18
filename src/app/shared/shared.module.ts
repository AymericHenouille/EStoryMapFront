import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MaterialModule } from './material/material.module';

const MODULES: Type<any>[] = [
  MaterialModule,
  CommonModule
];

@NgModule({
  imports: [ MODULES ],
  exports: [ MODULES ]
})
export class SharedModule { }
