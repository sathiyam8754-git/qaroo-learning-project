import { Component } from '@angular/core';
import { StudentDetailsDialogComponent, StudentDetailsDialogResult } from '../shared/components/student-details-dialog/student-details-dialog.component';

export interface ProgramCard {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-student-class-model',
  templateUrl: './student-class-model.component.html',
  styleUrls: ['./student-class-model.component.css']
})
export class StudentClassModelComponent {
  
  showStudentDialog: boolean = false;
  showDemoClassDialog: boolean = false;
  dialogData: any = {};
  demoClassData: any = {};
  
  // Program cards based on available assets
  programCards: ProgramCard[] = [
    {
      id: 1,
      title: 'Classes 4-10',
      description: 'Build a strong academic foundation with personalized learning',
      image: '../../assets/class 4-10.png',
      buttonText: 'Explore Now'
    },
    {
      id: 2,
      title: 'JEE Preparation',
      description: 'Complete JEE coaching with expert faculty and comprehensive study materials',
      image: '../../assets/jee.png',
      buttonText: 'Start Learning'
    },
    {
      id: 3,
      title: 'NEET Coaching',
      description: 'Medical entrance preparation with focused biology and chemistry coaching',
      image: '../../assets/neet.png',
      buttonText: 'Join Program'
    },
    {
      id: 4,
      title: 'LKG - 3 Foundation',
      description: 'Early childhood education with interactive and engaging learning methods',
      image: '../../assets/LKG - 3.webp',
      buttonText: 'Discover More'
    },
    {
      id: 5,
      title: 'IAS Preparation',
      description: 'Civil services preparation with comprehensive coverage and expert guidance',
      image: '../../assets/IAS.png',
      buttonText: 'Begin Journey'
    },
    {
      id: 6,
      title: 'Advanced Classes',
      description: 'Specialized coaching and advanced learning methods for class 4-10 students',
      image: '../../assets/classs 4 - 10.png',
      buttonText: 'Learn More'
    }
  ];

  // Handle card button clicks
  onCardClick(cardId: number): void {
    const card = this.programCards.find(c => c.id === cardId);
    if (card) {
      console.log(`Clicked: ${card.title}`);
      
      // Set dialog data and show dialog
      this.dialogData = {
        courseTitle: card.title,
        courseId: card.id
      };
      this.showStudentDialog = true;
    }
  }

  // Handle dialog close
  onDialogClose(): void {
    this.showStudentDialog = false;
  }

  // Handle dialog submit
  onDialogSubmit(result: any): void {
    console.log('Student details submitted:', result);
    // Here you can handle the submitted data
    // For example: send to backend, show success message, etc.
    this.showStudentDialog = false;
  }

  // Handle demo class dialog open
  onOpenDemoClass(result: StudentDetailsDialogResult): void {
    console.log('Opening demo class dialog for:', result);
    this.demoClassData = result;
    this.showStudentDialog = false;
    setTimeout(() => {
      this.showDemoClassDialog = true;
    }, 300);
  }

  // Handle demo class dialog close
  onDemoClassDialogClose(): void {
    this.showDemoClassDialog = false;
  }

  // Handle demo class dialog submit
  onDemoClassDialogSubmit(result: any): void {
    console.log('Demo class booking submitted:', result);
    // Here you can handle the demo class booking
    // For example: send to backend, show confirmation, etc.
    this.showDemoClassDialog = false;
  }

}
