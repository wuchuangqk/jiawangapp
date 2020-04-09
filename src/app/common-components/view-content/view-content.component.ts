import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss'],
})
export class ViewContentComponent implements OnInit {
  @Input() content: string;
  constructor(
      public sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
  }

  public transform(content): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
