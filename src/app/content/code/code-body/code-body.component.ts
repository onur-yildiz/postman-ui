import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Info } from '../../../shared/info.model';
import { Router } from '../../../../../node_modules/@angular/router';
import { RequestService } from '../../../shared/request.service';
// import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-code-body',
  templateUrl: './code-body.component.html',
  styleUrls: ['./code-body.component.css']
})
export class CodeBodyComponent implements OnInit, AfterViewInit {
  @ViewChild ('pagePreview') private pagePreview: ElementRef;
  @Input() requestInfo: Info;
  arrow = '<';
  mode = 'pretty';
  downloadFileType = 'plain/html';

  constructor(private _elRef: ElementRef,
              private router: Router,
              private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.downloadRequested
      .subscribe(
        () => {
          this.onDownload();
        }
      );
  }

  ngAfterViewInit() {
    this.jQuery();
  }

  onPreview() {
    this.router.navigate(['/preview']);
  }

  onCopy() {
    const range = document.createRange();
    range.selectNode(document.getElementById(this.mode));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  toggleSearch() {
    this.arrow = this.arrow === '>' ? '<' : '>';
    document.getElementById('code-search-box').classList.toggle('active-search');
  }

  onSearch(queryForm: NgForm) {
    if (queryForm.value.search.trim() === '' || queryForm.value.search === null) {
      document.getElementById(this.mode).textContent = this.requestInfo.contents;
      return;
    }

    const searchQuery = queryForm.value.search.trim();
    const searchQueryLength = searchQuery.length;
    const searchStr = this.requestInfo.contents;
    const indices = [];

    let index;
    let startIndex = 0;
    while ((index = searchStr.indexOf(searchQuery, startIndex)) !== -1) {
      indices.push(index);
      startIndex = index + searchQueryLength;
    }

    const select = '➤' + searchQuery + '•';
    const searchArr = searchStr.split('');
    for (let i = 0; i < indices.length; i++) {
      searchArr.splice(indices[i] + (i - (searchQueryLength * i)), searchQueryLength, select);
    }

    document.getElementById(this.mode).textContent = searchArr.join('');
  }

  onDownload() {
    if (!this.requestInfo.contents) { alert('No file found.'); return; }
    const file = new Blob([this.requestInfo.contents], {type: this.downloadFileType});
    const a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.requestInfo.url.split('.').join('') + Math.random().toString(36).substr(2, 6)
    + '.' + this.downloadFileType.split('/')[1];
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.drop-btn').click(function() {
      const currentDrop = $(this).next();
       $(document).find('.dropdown-content').not(currentDrop).slideUp('fast');
       currentDrop.slideToggle('fast');
    });
    component.find('.dropdown.selectable .dropdown-content a').click(function() {
      $(this).closest('.dropdown-content').prev().html($(this).html()); // put selected elements value to the dropdown title
    });
    component.find('button:not(.drop-btn):not(.no-focus)').click(function() {
      component.find('button:not(.drop-btn):not(.no-focus)').removeClass('active-btn');
      $(this).addClass('active-btn');
    });
  }

}
