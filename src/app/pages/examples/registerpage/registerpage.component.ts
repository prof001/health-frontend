import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-registerpage',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
