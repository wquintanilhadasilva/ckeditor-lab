import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  
  _restricted = false;

  @Input()
  public set restricted(value: boolean) {
    this._restricted = value;
  }

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  private EDITOR_NAME = 'myEditor';

  _editorFactory = CK.StandardEditor;
  _editorConfig = this.DefaultConfig;

  _editor: any;

  @Input()
  data: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this._restricted){
      this._editorFactory = CK.RestrictedEditor;
    }else {
      this._editorFactory = CK.StandardEditor;
    }
    this.ckinit('.document-editor__editable', '.document-editor__toolbar');
  }

  private ckinit(doc, toolbar) {

    this._editorFactory.create(
      document.querySelector(doc),
      this._editorConfig)
      .then(editor => {
        const toolbarContainer = document.querySelector(toolbar);

        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        editor.id = this.EDITOR_NAME;

        console.log(editor);
        this._editor = editor;
        this._editor.setData(this.data);

        this.setListeners();

      })
      .catch(err => {
        console.error(err);
      });
  }

  setListeners(): void {

    this._editor.model.document.on( 'change:data', () => {
      console.log( 'The data has changed!' );
      const val = this._editor.getData();
      this.change.emit(val);
      this.data = val;
      console.log(val);
    });    
    
  }

  getContent(): any {
    return this.data;
  }

  addText(txt) {
    const docFrag = this._editor.model.change( writer => {

      const p1 = writer.createElement( '<span>' );
      // const p2 = writer.createElement( 'paragraph' );
      // const blockQuote = writer.createElement( 'blockQuote' );
      const docFrag = writer.createDocumentFragment();
    
      writer.append( p1, docFrag );
      // writer.append( blockQuote, docFrag );
      // writer.append( p2, blockQuote );
      writer.insertText( txt, p1 );
      // writer.insertText( 'bar', p2 );
    
      return docFrag;
    } );
    
    // insertContent() does not have to be used in a change() block. It can, though,
    // so this code could be moved to the callback defined above.
    this._editor.model.insertContent( docFrag );

  }

  getData() {
    const dataout = this._editor.getData();
    console.log(dataout);
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

  public get RestrictedConfig() {
    return {
      toolbar: [
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        'fontColor',
        'fontBackgroundColor',
        'specialCharacters',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'indent',
        'outdent',
        '|',
        'link',
        'blockquote',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        'restrictedEditing'
      ],
      image: {
        styles: [
          'full',
          'alignLeft',
          'alignRight'
        ],
        toolbar: [
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'pt-br'
    };
  }

  public get DefaultConfig() {
    return {
      toolbar: [
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        'fontColor',
        'fontBackgroundColor',
        'specialCharacters',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'indent',
        'outdent',
        '|',
        'link',
        'blockquote',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        'restrictedEditingException'
      ],
      image: {
        styles: [
          'full',
          'alignLeft',
          'alignRight'
        ],
        toolbar: [
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight',
          '|',
          'imageTextAlternative',
    
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'pt-br'
    };
  }
}


// import {
//   AfterViewInit,
//   AfterViewChecked,
//   Component,
//   ElementRef,
//   EventEmitter,
//   Input,
//   NgZone,
//   OnChanges,
//   OnDestroy,
//   OnInit,
//   Output,
//   SimpleChanges,
//   ViewChild,
//   forwardRef
// } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// declare var CKEDITOR: any;

// const defaults = {
//   contentsCss: [''],
//   customConfig: ''
// };

// @Component({
//   selector: 'ck-editor',
//   template: `
//     <textarea #textarea aria-label="editor content"></textarea>
//   `,
//   providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CKEditorComponent), multi: true }],
//   exportAs: 'ckEditor'
// })
// export class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked, ControlValueAccessor {
//   private static idx = 1;

//   private ckIns: any;
//   private innerValue = '';
//   private identifier: string;
//   private disabled = false;
//   private editorInitialized = false;

//   /**
//    * Is readonly mode, default:false
//    */
//   @Input() public readonly = false;
//   /**
//    * The ck-editor config object.
//    */
//   @Input() public config: any = {};
//   /**
//    * The special skin, default: moono-lisa
//    */
//   @Input() public skin = 'moono-lisa';
//   /**
//    * The special language, default: en
//    */
//   @Input() public language = 'en';
//   /**
//    * Use fullpage mode, default:false
//    */
//   @Input() public fullPage = false;
//   /**
//    * Use inline mode, default: false
//    */
//   @Input() public inline = false;
//   /**
//    * The editor id
//    */
//   @Input() public id: string;

//   @Output() public change = new EventEmitter();
//   @Output() public ready = new EventEmitter();
//   @Output() public blur = new EventEmitter();
//   @Output() public focus = new EventEmitter();

//   @ViewChild('textarea', { static: false }) public textareaRef: ElementRef;

//   private static getRandomIdentifier(id: string = '') {
//     return 'editor-' + (id !== '' ? id : String(CKEditorComponent.idx++));
//   }

//   onChange = (value: string) => {};
//   onTouched = () => {};

//   public get instance() {
//     return this.ckIns;
//   }

//   constructor(private ngZone: NgZone, private hostEl: ElementRef) {
//     this.identifier = CKEditorComponent.getRandomIdentifier(this.id);
//   }

//   ngOnInit() {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (this.editorInitialized) {
//       this.destroyEditor();
//       this.initEditor(this.identifier);
//     }
//   }

//   ngAfterViewChecked() {
//     if (!this.editorInitialized && this.documentContains(this.textareaRef.nativeElement)) {
//       this.editorInitialized = true;
//       this.initEditor(this.identifier);
//     } else if (this.editorInitialized && !this.documentContains(this.textareaRef.nativeElement)) {
//       this.editorInitialized = false;
//       this.destroyEditor();
//     }
//   }

//   ngOnDestroy() {
//     this.destroyEditor();
//   }

//   private initEditor(identifier: string) {
//     if (typeof CKEDITOR === 'undefined') {
//       return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
//     }
//     const textareaEl = this.textareaRef.nativeElement;
//     this.identifier = identifier;
//     textareaEl.setAttribute('name', this.identifier);
//     if (this.ckIns || !this.documentContains(this.textareaRef.nativeElement)) {
//       return;
//     }

//     const opt = Object.assign({}, defaults, this.config, {
//       readOnly: this.readonly,
//       skin: this.skin,
//       language: this.language,
//       fullPage: this.fullPage,
//       inline: this.inline
//     });

//     this.ckIns = this.inline ? CKEDITOR.inline(textareaEl, opt) : CKEDITOR.replace(textareaEl, opt);
//     this.ckIns.setData(this.innerValue);

//     this.ckIns.on('change', () => {
//       const val = this.ckIns.getData();
//       this.updateValue(val);
//     });

//     this.ckIns.on('instanceReady', (evt: any) => {
//       this.ngZone.run(() => {
//         this.ready.emit(evt);
//       });
//     });

//     this.ckIns.on('blur', (evt: any) => {
//       this.ngZone.run(() => {
//         this.blur.emit(evt);
//         this.onTouched();
//       });
//     });

//     this.ckIns.on('focus', (evt: any) => {
//       this.ngZone.run(() => {
//         this.focus.emit(evt);
//       });
//     });
//   }

//   private destroyEditor() {
//     if (this.ckIns) {
//       // If use destroy, will fire 'Error code: editor-destroy-iframe'
//       // this.ckIns.destroy();
//       if (CKEDITOR.instances.hasOwnProperty(this.ckIns.name)) {
//         CKEDITOR.remove(CKEDITOR.instances[this.ckIns.name]);
//       }
//       this.ckIns = null;
//       const editorEl = this.hostEl.nativeElement.querySelector('#cke_' + this.identifier);
//       if (editorEl != null && editorEl.parentElement) {
//         editorEl.parentElement.removeChild(editorEl);
//       }
//     }
//   }

//   private updateValue(value: string) {
//     this.ngZone.run(() => {
//       this.innerValue = value;
//       this.onChange(value);
//       this.onTouched();
//       this.change.emit(value);
//     });
//   }

//   private documentContains(node: Node) {
//     return document.contains ? document.contains(node) : document.body.contains(node);
//   }

//   writeValue(value: any): void {
//     this.innerValue = value || '';
//     if (this.ckIns) {
//       // Fix bug that can't emit change event when set non-html tag value twice in fullpage mode.
//       this.ckIns.setData(this.innerValue);
//       const val = this.ckIns.getData();
//       this.ckIns.setData(val);
//     }
//   }

//   registerOnChange(fn: (value: string) => void): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: () => void): void {
//     this.onTouched = fn;
//   }

//   setDisabledState?(isDisabled: boolean): void {
//     this.disabled = isDisabled;
//   }
// }