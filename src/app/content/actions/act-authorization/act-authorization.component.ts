import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
// import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-act-authorization',
  templateUrl: './act-authorization.component.html',
  styleUrls: ['./act-authorization.component.css']
})
export class ActAuthorizationComponent implements OnInit, AfterViewInit {

  constructor(private _elRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jQuery();
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.drop-btn').click(function() {
      const currentDrop = $(this).next();
       $(document).find('.dropdown-content').not(currentDrop).slideUp('fast');
       currentDrop.slideDown('fast');
    });

    component.find('.dropdown.selectable .dropdown-content a').click(function() {
      $(this).closest('.dropdown-content').prev().html($(this).html()); // put selected elements value to the dropdown title
    });
  }

}
