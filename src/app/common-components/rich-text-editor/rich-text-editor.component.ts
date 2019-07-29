import { Component, OnInit } from '@angular/core';
import ZxEditor from 'zx-editor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const zxEditor = new ZxEditor('#editorContainer', {
      placeholder: '请输入内容'
    });
  }

}
