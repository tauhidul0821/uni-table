import { NgModule } from '@angular/core';
import { UniTableComponent } from './uni-table.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {RouterModule} from "@angular/router";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  key => antDesignIcons[key]
);

@NgModule({
  declarations: [
    UniTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzSwitchModule,
    NzDropDownModule,
    RouterModule,
    NzTableModule,
    NzToolTipModule,
    NzRadioModule,
    NzEmptyModule,
    NzInputGroupComponent,
    NzDatePickerModule,
    NzCheckboxComponent,
    NzInputDirective,
    NzIconModule.forRoot(icons)
  ],
  exports: [
    UniTableComponent
  ]
})
export class UniTableModule { }
