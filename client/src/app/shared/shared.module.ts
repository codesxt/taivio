import { RoleTranslatePipe } from '../pipes/role-translate';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [
  ],
  providers: [
  ],
  declarations: [
    RoleTranslatePipe
  ],
  exports: [
    RoleTranslatePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [

      ]
    };
  }
}
