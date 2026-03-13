import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SimpleCard {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-two-card-row',
  templateUrl: './two-card-row.component.html',
  styleUrls: ['./two-card-row.component.css']
})
export class TwoCardRowComponent {
  
  @Input() cards: SimpleCard[] = [];
  @Output() cardButtonClick = new EventEmitter<number>();

  onCardClick(cardId: number): void {
    this.cardButtonClick.emit(cardId);
  }

}
