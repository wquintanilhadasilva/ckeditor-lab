import { Component, ViewChild } from '@angular/core';
// import  CKEDITOR  from '../shared/ckeditor/custombuild/build/ckeditor';
// import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import  CKEDITOR  from '../assets/scripts/ckeditor/ckeditor';

/*
https://stackoverflow.com/a/48869478
Em /tsconfig.json(às vezes também é necessário /src/tsconfig.app.json), habilite a opção resolveJsonModule (reinicialização do servidor webpack dev depois disso):
    "compilerOptions": {
      ...
      "resolveJsonModule": true
      ...
Em seguida, em seu componente, por exemplo, /src/app/app.component.tsuse as informações da versão:
    import { version } from '../../package.json';
    ...
    export class AppComponent {
      public version: string = version;
    }
*/
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  

  constructor() {
    console.log(version);
  }

  restricted = false;
  data: any = '<p>The initial editor data. <a href="http://www.google.com">Google</a></p>';

  changeStandartEditor() {
    this.restricted = false;
  }

  changeRestrictedEditor() {
    this.restricted = true;
  }

  change(val) {
    this.data = val;
  }

  // @ViewChild('myEditor', { static: false }) myEditor: CKEditorComponent;
  // // ed;

  // saved = false;

  // // public listArry  = ["car", "bus", "suv"];

  // public StandardEditor = CKEDITOR.Editor;

  // // title = 'lab';
  // // public Editor = CKEDITOR.Editor;

  // private e;

  // doc: any = "<p>Hello, world!</p>";
  // doc2Save;

  // public onReady( editor ) {
  //     editor.ui.getEditableElement().parentElement.insertBefore(
  //         editor.ui.view.toolbar.element,
  //         editor.ui.getEditableElement()
  //     );
  //     this.e = editor;
  // }

  // public onChange( { editor }: ChangeEvent ) {
  //   this.doc2Save = editor.getData();

  //   console.log( this.doc2Save );
  // }

  // public save(): void {
  //   console.log(this.doc2Save);
  //   console.log(this.doc);
  //   this.saved = !this.saved;
  // }

  // public get StandardEditorConfig() {
	// 	return {
  //     toolbar: {
  //       items: ['ImageUpload', '|', 'insertTable', '|', 'linkProposicao', 'bold', 'italic', '|', 'undo', 'redo', '-', 'numberedList', 'bulletedList'],
  //       // items: [ 'bold', 'italic', '|', 'undo', 'redo', '-', 'numberedList', 'bulletedList' ],
  //       viewportTopOffset: 40,
  //       shouldNotGroupWhenFull: true
  //   },
  //     // toolbar: [
  //     //   'ImageUpload', '|', 'insertTable', '|', 'linkProposicao',
  //     // ],
  //     table: {
  //       contentToolbar: [
  //           'tableColumn', 'tableRow', 'mergeTableCells',
  //           'tableProperties', 'tableCellProperties'
  //       ],
  //     },
  //     image: {
  //       styles: [
  //         'full', 'side', 'alignLeft', 'alignCenter', 'alignRight'
  //       ],
  //       toolbar: [
  //         'imageStyle:full',
  //         'imageStyle:side',
  //         '|',
  //         'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
  //         '|',
  //         'imageResize',
  //         '|',
  //         'imageTextAlternative',
  //         ],
  //       resizeOptions: [
  //         {
  //             name: 'imageResize:original',
  //             value: null,
  //             icon: 'original'
  //         },
  //         {
  //             name: 'imageResize:50',
  //             value: '50',
  //             icon: 'medium'
  //         },
  //         {
  //             name: 'imageResize:75',
  //             value: '75',
  //             icon: 'large'
  //         }
  //       ],
  //     },
  //     linkProposicao: {
  //       prefix: 'http://basis.com.br/',
  //       sufix: 'listar'
  //     },
  //     language: 'pt-br',
  //     restrictedEditing: {
  //         allowedCommands: [ 'enter', 'ImageUpload', 'insertTable' ]
  //     },
	// 	};
  // }

  // addText(txt) {
  //   this.myEditor.editorInstance.editing.model.modifySelection(txt);

  // }

}
