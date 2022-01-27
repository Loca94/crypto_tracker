import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalAnimation} from "../../animations/modal.animation";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [],
  animations: [
    ModalAnimation.modalAnimation,
    ModalAnimation.waitEndModalAnimation,
    ModalAnimation.modalBackgroundAnimation
  ]
})
export class ModalComponent implements OnInit {
  @Input()
  set showModal(value: boolean) {
    this._showModal = value;
    this.showModalChange.emit(this._showModal);
  }
  get showModal() {
    return this._showModal;
  }
  
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() confirmInsertedInputs = new EventEmitter<{alias: string, targetPrice: number, tags: string[]}>();
  
  private _showModal: boolean;
  alias: string;
  targetPrice: number;
  tags: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  closeBtn() {
    this.resetValues();
    this.showModal = false;
  }
  
  confirmBtn() {
    if (this.inputIsValid()) {
      this.confirmInsertedInputs.emit({
        alias: this.alias,
        targetPrice: this.targetPrice,
        tags: this.tags.split(',').map(tag => tag.trim())
      });
      this.resetValues();
      this.showModal = false;
    }
  }
  
  private inputIsValid(): boolean {
    return this.alias && this.alias !== '' && this.targetPrice && this.tags && this.tags !== '';
  }
  
  private resetValues() {
    this.alias = undefined;
    this.targetPrice = undefined;
    this.tags = undefined;
  }
}
