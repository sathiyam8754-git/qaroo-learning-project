import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExpolringModelComponent } from './student-expolring-model.component';

describe('StudentExpolringModelComponent', () => {
  let component: StudentExpolringModelComponent;
  let fixture: ComponentFixture<StudentExpolringModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentExpolringModelComponent]
    });
    fixture = TestBed.createComponent(StudentExpolringModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
