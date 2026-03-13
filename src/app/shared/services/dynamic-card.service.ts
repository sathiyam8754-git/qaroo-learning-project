import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AssetCard {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  fileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicCardService {
  
  private assetPath = '../../assets/';
  
  // Card title mappings based on file names
  private cardTitleMap: { [key: string]: { title: string; description: string; buttonText: string } } = {
    'class 4-10.png': {
      title: 'Classes 4-10 Learning',
      description: 'Comprehensive educational programs for classes 4-10 with personalized learning approaches',
      buttonText: 'Explore Programs'
    },
    'classs 4 - 10.png': {
      title: 'Advanced Class Programs',
      description: 'Specialized coaching and advanced learning methods for class 4-10 students',
      buttonText: 'Learn More'
    },
    'LKG - 3.webp': {
      title: 'LKG - 3 Foundation',
      description: 'Early childhood education with interactive and engaging learning methods',
      buttonText: 'Discover'
    },
    'jee.png': {
      title: 'JEE Preparation',
      description: 'Complete JEE coaching with expert faculty and comprehensive study materials',
      buttonText: 'Start Prep'
    },
    'neet.png': {
      title: 'NEET Coaching',
      description: 'Medical entrance preparation with focused biology and chemistry coaching',
      buttonText: 'Join Now'
    },
    'IAS.png': {
      title: 'IAS Foundation',
      description: 'Civil services preparation with comprehensive coverage and expert guidance',
      buttonText: 'Begin Journey'
    }
  };

  constructor(private http: HttpClient) { }

  // Simulated dynamic asset loading (in real app, this would be an API call)
  getAvailableAssets(): Observable<string[]> {
    // In a real application, you would have an API endpoint that returns available assets
    // For now, we'll return the known asset files
    const knownAssets = [
      'class 4-10.png',
      'classs 4 - 10.png', 
      'LKG - 3.webp',
      'jee.png',
      'neet.png',
      'IAS.png'
    ];
    
    return of(knownAssets);
  }

  // Dynamically generate cards based on available assets
  generateDynamicCards(): Observable<AssetCard[]> {
    return this.getAvailableAssets().pipe(
      map(assets => {
        return assets.map((asset, index) => {
          const cardInfo = this.cardTitleMap[asset] || {
            title: this.generateTitleFromFileName(asset),
            description: 'Educational program with comprehensive learning approach',
            buttonText: 'Learn More'
          };

          return {
            id: index + 1,
            title: cardInfo.title,
            description: cardInfo.description,
            image: this.assetPath + asset,
            buttonText: cardInfo.buttonText,
            fileName: asset
          };
        });
      })
    );
  }

  // Generate title from file name if not in mapping
  private generateTitleFromFileName(fileName: string): string {
    const nameWithoutExtension = fileName.split('.')[0];
    return nameWithoutExtension
      .split(/[-\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Get cards by category (based on file name patterns)
  getCardsByCategory(category: 'school' | 'competitive'): Observable<AssetCard[]> {
    return this.generateDynamicCards().pipe(
      map(cards => {
        if (category === 'school') {
          return cards.filter(card => 
            card.fileName.toLowerCase().includes('class') || 
            card.fileName.toLowerCase().includes('lkg')
          );
        } else {
          return cards.filter(card => 
            card.fileName.toLowerCase().includes('jee') || 
            card.fileName.toLowerCase().includes('neet') || 
            card.fileName.toLowerCase().includes('ias')
          );
        }
      })
    );
  }

  // Get specific number of cards
  getCardsSlice(startIndex: number, count: number): Observable<AssetCard[]> {
    return this.generateDynamicCards().pipe(
      map(cards => cards.slice(startIndex, startIndex + count))
    );
  }

  // Get cards by specific file names
  getCardsByFileNames(fileNames: string[]): Observable<AssetCard[]> {
    return this.generateDynamicCards().pipe(
      map(cards => cards.filter(card => fileNames.includes(card.fileName)))
    );
  }

}
