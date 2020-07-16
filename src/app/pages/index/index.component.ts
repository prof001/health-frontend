import { Component, OnInit, OnDestroy } from '@angular/core';
import noUiSlider from 'nouislider';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  date = new Date();
  pagination = 3;
  constructor() {}
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
