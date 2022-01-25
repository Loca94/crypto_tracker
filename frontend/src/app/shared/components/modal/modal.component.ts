import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() confirmInsertedInputs = new EventEmitter<{alias: string, targetPrice: number, tags: string[]}>();
  
  alias: string;
  targetPrice: number;
  tags: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.close.emit(true);
  }
  
  confirmUserInputs() {
    if (this.inputIsValid()) {
      this.confirm.emit({
        alias: this.alias,
        targetPrice: this.targetPrice,
        tags: this.tags.split(',').map(tag => tag.trim())
      });
      this.closeModal();
    }
  }
  
  private inputIsValid(): boolean {
    return this.alias && this.alias !== '' && this.targetPrice && this.tags && this.tags !== '';
  }

}
