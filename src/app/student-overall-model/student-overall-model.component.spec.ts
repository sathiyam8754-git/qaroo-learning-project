import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOverallModelComponent } from './student-overall-model.component';

describe('StudentOverallModelComponent', () => {
  let component: StudentOverallModelComponent;
  let fixture: ComponentFixture<StudentOverallModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentOverallModelComponent]
    });
    fixture = TestBed.createComponent(StudentOverallModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
