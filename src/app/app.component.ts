import { Component, ElementRef, ViewChild, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public arr = [];
  public searchObj: any = {}
  @ViewChild('selectBox')
  selectBox: ElementRef;
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.selectBox.nativeElement, 'display', 'none');
    this.searchObj.boxSpan = 'No Filter'
  }

  onClick($event) {
    this.renderer.setStyle(this.selectBox.nativeElement, 'display', this.selectBox.nativeElement.style.display === 'none' ? 'block' : 'none');

  }

  selectChange($event) {
  }

  ngAfterViewInit() {
    this.renderer.listen(this.selectBox.nativeElement, 'click',
      (e) => {
          if (!this.selectBox.nativeElement.contains(document.activeElement)) {
            this.renderer.setStyle(this.selectBox.nativeElement, 'display', 'none');
          }
      })
    this.renderer.listen(window, 'click',
      (e) => {
        console.log(e.target.tagName)
          if(e.target.tagName==='HTML'){
            this.renderer.setStyle(this.selectBox.nativeElement, 'display', 'none');
          }          
      })
  }

  selectNofilter() {
    if (!this.searchObj.nofilter) {
      this.searchObj.com = false;
      this.searchObj.b2b = false;
      this.searchObj.ca = false;
      this.searchObj.boxSpan = 'No Filter'
    }
  }


  selectCom() {
    if (!this.searchObj.com) {
      this.searchObj.nofilter = false;
      this.searchObj.ca = false;
      this.searchObj.boxSpan = this.searchObj.boxSpan === 'B2B' ? '.COM,B2B' : '.COM'
    }
    else {
      this.searchObj.boxSpan = this.searchObj.boxSpan === '.COM,B2B' ? 'B2B' : ''
    }
  }

  selectB2b() {
    if (!this.searchObj.b2b) {
      this.searchObj.nofilter = false;
      this.searchObj.ca = false;
      this.searchObj.boxSpan = this.searchObj.boxSpan === '.COM' ? '.COM,B2B' : 'B2B'
    }
    else {
      this.searchObj.boxSpan = this.searchObj.boxSpan === '.COM,B2B' ? '.COM' : ''
    }
  }

  selectCa() {
    if (!this.searchObj.ca) {
      this.searchObj.com = false;
      this.searchObj.b2b = false;
      this.searchObj.nofilter = false;
      this.searchObj.boxSpan = '.CA'
    }
  }
}
