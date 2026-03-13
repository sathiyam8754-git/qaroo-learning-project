import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface DynamicCard {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface DynamicSection {
  id: number;
  title: string;
  subtitle: string;
  cards: DynamicCard[];
}

@Component({
  selector: 'app-dynamic-card-section',
  templateUrl: './dynamic-card-section.component.html',
  styleUrls: ['./dynamic-card-section.component.css']
})
export class DynamicCardSectionComponent {
  
  @Input() sections: DynamicSection[] = [];
  @Output() cardButtonClick = new EventEmitter<{sectionId: number, cardId: number}>();

  onCardClick(sectionId: number, cardId: number): void {
    this.cardButtonClick.emit({ sectionId, cardId });
  }

}
