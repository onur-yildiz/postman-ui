import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { RequestService } from '../../../shared/request.service';

@Component({
  selector: 'app-act-body',
  templateUrl: './act-body.component.html',
  styleUrls: ['./act-body.component.css']
})
export class ActBodyComponent implements OnInit {
  requestBody: string;

  constructor(private requestService: RequestService) {}

  ngOnInit() {}

  updateBody() {
    this.requestService.requestBodyUpdated.next(this.requestBody);
  }
}
