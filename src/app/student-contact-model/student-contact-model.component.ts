import { Component } from '@angular/core';

interface Pillar {
  icon: string;
  title: string;
  description: string;
}

interface Feature {
  text: string;
}

@Component({
  selector: 'app-student-contact-model',
  templateUrl: './student-contact-model.component.html',
  styleUrls: ['./student-contact-model.component.css']
})
export class StudentContactModelComponent {

  pillars: Pillar[] = [
    {
      icon: '🎯',
      title: 'Personalised Learning Journeys',
      description: 'Using knowledge graphs, the program adapts and creates personalised learning journeys. It provides comprehensive coverage of over 1 lakh concepts with animated videos, fun quizzes and flashcards.'
    },
    {
      icon: '💻',
      title: 'Technology Enabled Learning',
      description: 'We leverage technology to merge best practices like use of videos, engaging content and quizzes with the best teachers so that every child has access to the best learning experiences.'
    },
    {
      icon: '👨‍🏫',
      title: 'Best Teachers & Engaging Content',
      description: 'Students across regions can access the best teachers and see concepts come to life through well-crafted lessons, assessments, and personalised recommendations.'
    }
  ];

  features: Feature[] = [
    { text: 'Interactive and engaging learning modules' },
    { text: 'Visually rich content for conceptual clarity and long-term retention' },
    { text: 'Personalised learning programs enabled by data science' },
    { text: 'Maths, Physics, Chemistry and Biology for CBSE and ISC (Classes 1-12)' },
    { text: 'Competitive Exams — JEE, NEET, IAS preparation courses' }
  ];

  
}
