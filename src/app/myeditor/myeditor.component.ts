import { AfterViewInit, Component, OnInit } from '@angular/core';

import { MyUploadAdapter } from './myCustomUploadPlugint';

import DecoupledEditor from 'src/assets/scripts/pl/ckeditor';
// import DecoupledEditor from 'src/assets/scripts/cdn/decouplededitor';
// import DecoupledEditor from 'src/assets/scripts/cdn/ckeditor5';
// import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter( loader );
  };
}

@Component({
  selector: 'app-myeditor',
  templateUrl: './myeditor.component.html',
  styleUrls: ['./myeditor.component.css']
})
export class MyeditorComponent implements OnInit, AfterViewInit {

  _editor: DecoupledEditor.StandardEditor;

  data: any = '<p>The initial editor data.</p>';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    DecoupledEditor.StandardEditor.create( document.querySelector( '.document-editor__editable' ),
      {
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo', 
        ],
        // plugins: [ Essentials, Paragraph, Heading, Bold, Italic, List, Link, BlockQuote, Image, ImageCaption,
        //   ImageStyle, ImageToolbar, ImageUpload, Table, TableToolbar, MediaEmbed, EasyImage ],
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
        removePlugins: [ 'Heading', 'Link', 'bold' ],
        heading: {
          options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        },
        language: 'pt-br',
      })
      .then( editor => {
          const toolbarContainer = document.querySelector( '.document-editor__toolbar' );

          toolbarContainer.appendChild( editor.ui.view.toolbar.element );

          console.log(editor);
          this._editor = editor;
      })
      .catch( err => {
          console.error( err );
      });
    }

   addText(txt) {
     console.log(this._editor.getData());
    // this._editor.model.document.model.modifySelection(txt);
  }
}
