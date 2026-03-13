import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

export interface Advantage {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ExploreItem {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-student-expolring-model',
  templateUrl: './student-expolring-model.component.html',
  styleUrls: ['./student-expolring-model.component.css']
})
export class StudentExpolringModelComponent implements OnInit, OnDestroy {
  
  // Advantages using advantages1,2,3 images
  advantages: Advantage[] = [
    {
      id: 1,
      title: 'Expert Faculty',
      description: 'Learn from experienced teachers and industry experts who bring real-world knowledge and practical insights to help you succeed in your educational journey.',
      image: '../../assets/advantages1.png'
    },
    {
      id: 2,
      title: 'Flexible Learning',
      description: 'Study at your own pace with flexible schedules that adapt to your lifestyle. Access courses anytime, anywhere with our user-friendly online platform.',
      image: '../../assets/advantages2.png'
    },
    {
      id: 3,
      title: 'Career Support',
      description: 'Get comprehensive guidance and support for your career growth with personalized mentoring, resume building, and job placement assistance.',
      image: '../../assets/advantages3.png'
    }
  ];

  // Exploring section using other asset images
  exploreItems: ExploreItem[] = [
    {
      id: 1,
      title: 'Interactive Learning',
      description: 'Engage with interactive lessons and hands-on activities for better understanding and retention of concepts.',
      image: '../../assets/class 4-10.png',
      buttonText: 'Start Learning'
    },
    {
      id: 2,
      title: 'Virtual Labs',
      description: 'Experience science experiments and practical learning in virtual environments with advanced simulation tools.',
      image: '../../assets/jee.png',
      buttonText: 'Explore Labs'
    },
    {
      id: 3,
      title: 'Study Groups',
      description: 'Collaborate with peers and learn together in virtual study groups facilitated by expert moderators.',
      image: '../../assets/neet.png',
      buttonText: 'Join Groups'
    },
    {
      id: 4,
      title: 'Progress Tracking',
      description: 'Monitor your learning progress with detailed analytics and insights to optimize your study plan.',
      image: '../../assets/LKG - 3.webp',
      buttonText: 'Track Progress'
    },
    {
      id: 5,
      title: 'Expert Mentors',
      description: 'Connect with experienced mentors for personalized guidance and support throughout your learning journey.',
      image: '../../assets/IAS.png',
      buttonText: 'Find Mentors'
    },
    {
      id: 6,
      title: 'Resource Library',
      description: 'Access comprehensive study materials, notes, and reference resources to enhance your learning experience.',
      image: '../../assets/classs 4 - 10.png',
      buttonText: 'Browse Resources'
    }
  ];

  // Scroll functionality
  currentExploreIndex: number = 0;
  @ViewChild('scrollableCards') scrollableCards!: ElementRef;

  // Handle explore item clicks
  onExploreClick(itemId: number): void {
    const item = this.exploreItems.find(i => i.id === itemId);
    if (item) {
      console.log(`Clicked: ${item.title}`);
      // Add navigation logic here
    }
  }

  // Scroll methods
  scrollLeft(): void {
    const container = document.querySelector('.scrollable-cards') as HTMLElement;
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
      this.updateCurrentIndex();
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.scrollable-cards') as HTMLElement;
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
      this.updateCurrentIndex();
    }
  }

  scrollToCard(index: number): void {
    const container = document.querySelector('.scrollable-cards') as HTMLElement;
    const cards = document.querySelectorAll('.explore-card');
    if (container && cards[index]) {
      const card = cards[index] as HTMLElement;
      const scrollLeft = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      this.currentExploreIndex = index;
    }
  }

  updateCurrentIndex(): void {
    const container = document.querySelector('.scrollable-cards') as HTMLElement;
    const cards = document.querySelectorAll('.explore-card');
    if (container && cards.length > 0) {
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      this.currentExploreIndex = closestIndex;
    }
  }

  // Auto-scroll functionality
  autoScrollInterval: any;

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      if (this.currentExploreIndex < this.exploreItems.length - 1) {
        this.scrollRight();
      } else {
        this.scrollToCard(0);
      }
    }, 4000);
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

}
