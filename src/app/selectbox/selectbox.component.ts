import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.css']
})
export class SelectboxComponent implements OnInit {

  @Input('options') options;
  optionsCopy: any;
  showOptions: false;
  selectedOption: any;
  choosenOption: any;
  isVisible = true;
  @ViewChild('selectbox') selectbox;
  @ViewChild('selectboxInput') selectboxInput;
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.optionsCopy = this.options;
    this.selectedOption = this.optionsCopy[0];
      console.log(this.selectedOption);

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 40) {
          this.selectOptionByArrows('down');
          event.preventDefault();
          event.stopPropagation();
      } else if (event.keyCode === 38) {
          this.selectOptionByArrows('up');
          event.preventDefault();
          event.stopPropagation();
      } else if (event.keyCode === 13) {
         this.onOptionSelect(this.selectedOption);
      }
    });

    window.addEventListener('scroll', () => {
      this.setIsVisibleProperty();
    });

    this.setIsVisibleProperty();
  }

  filterOptions(event) {
    const keyCode = event.keyCode;
    if ((keyCode === 40) || (keyCode === 38)) {
     /* const cursorPositionStart = event.target.selectionStart;
      const cursorPositionEnd = event.target.selectionEnd;
      event.preventDefault();
      console.log(cursorPositionStart, cursorPositionEnd);
      return;*/
     // if arrow keys pressed, cursor must stay on it's place
    }
    const keyword = event.target.value.toLowerCase();
    this.optionsCopy = this.options.filter( (option) => {
        if (option.display.toLowerCase().indexOf(keyword) !== -1) {
          return true;
        }
    });

    this.selectedOption = this.optionsCopy[0];

  }

   selectOptionByArrows(upOrDown) {
    const arrSize = this.optionsCopy.length;
    if (upOrDown === 'up') {
        const curIndex = this.optionsCopy.indexOf(this.selectedOption);
        if (curIndex) {
            this.selectedOption = this.optionsCopy[curIndex - 1];
        }
    } else if (upOrDown === 'down') {
        const curIndex = this.optionsCopy.indexOf(this.selectedOption);
        if (curIndex < (arrSize - 1)) {
          this.selectedOption = this.optionsCopy[curIndex + 1];
        }
    }
  }

  onOptionSelect(option) {
    this.showOptions = false;
    this.choosenOption = option;
    this.optionsCopy = this.options;
    this.valueChange.emit(option);
  }

  setIsVisibleProperty() {
      const el = this.selectbox.nativeElement;
      const selectboxHeight = 387;
      const selectboxOffsetTop = el.offsetTop;
      const windowHeight = window.innerHeight;
      const windowScrolled = window.pageYOffset;

      console.log('selectboxOffsetTop:' + selectboxOffsetTop, 'windowHeight:' + windowHeight, 'windowScrolled:' + windowScrolled);

      if ((selectboxOffsetTop + selectboxHeight - windowScrolled) < windowHeight) {
        console.log('Is visible');
        this.isVisible = true;
      } else {
        console.log('not visible');
        this.isVisible = false;
      }


  }

}
