import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    document.getElementById('preview').innerHTML = this.requestService.reqInfo.contents;
  }

}
