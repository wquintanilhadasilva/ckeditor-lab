import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// import { CKEditorModule } from 'ngx-ckeditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KibanaComponent } from './kibana/kibana.component';
import { MyeditorComponent } from './myeditor/myeditor.component';

@NgModule({
  declarations: [
    AppComponent,
    KibanaComponent,
    MyeditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
