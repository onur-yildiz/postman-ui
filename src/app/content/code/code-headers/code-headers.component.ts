import { Component, OnInit, Input } from '@angular/core';
import { Info } from '../../../shared/info.model';

@Component({
  selector: 'app-code-headers',
  templateUrl: './code-headers.component.html',
  styleUrls: ['./code-headers.component.css']
})
export class CodeHeadersComponent implements OnInit {
  @Input() requestInfo: Info;
  headers: {};
  keys: any[];

  constructor() {}

  ngOnInit() {
    this.headers = this.requestInfo.headers;
    this.keys = Object.keys(this.requestInfo.headers);
  }
}
