import { AfterViewInit, Component, OnInit } from '@angular/core';

import { MyUploadAdapter } from './myCustomUploadPlugint';

import CK from 'src/assets/scripts/pl/ckeditor';

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

  _editor: any;

  data: any = '<p>The initial editor data.</p>';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    CK.StandardEditor.create(
      document.querySelector('.document-editor__editable'),
      this.StandardEditorConfig)
      .then( editor => {
          const toolbarContainer = document.querySelector('.document-editor__toolbar');

          toolbarContainer.appendChild( editor.ui.view.toolbar.element );
          editor.id = 'myEditor';

          console.log(editor);
          this._editor = editor;

          this._editor.setData(this.data);
      })
      .catch( err => {
          console.error( err );
      });
    }

   addText(txt) {
    const docFrag = this._editor.model.change( writer => {
      
      const p1 = writer.createElement( 'paragraph' );
      const p2 = writer.createElement( 'paragraph' );
      const blockQuote = writer.createElement( 'blockQuote' );
      const docFrag = writer.createDocumentFragment();
    
      writer.append( p1, docFrag );
      writer.append( blockQuote, docFrag );
      writer.append( p2, blockQuote );
      writer.insertText( 'foo', p1 );
      writer.insertText( 'bar', p2 );
    
      return docFrag;
    } );
    
    // insertContent() does not have to be used in a change() block. It can, though,
    // so this code could be moved to the callback defined above.
    this._editor.model.insertContent( docFrag );

  }


  public get StandardEditorConfig() {
		return {
      language: 'pt-br',
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
      table: {
        contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells',
            'tableProperties', 'tableCellProperties'
        ],
      },
      
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
      removePlugins: [ 'Heading', 'Link', 'bold' ],
      heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
      },
		};
  }
}
