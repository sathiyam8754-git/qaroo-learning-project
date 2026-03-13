import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContactModelComponent } from './student-contact-model.component';

describe('StudentContactModelComponent', () => {
  let component: StudentContactModelComponent;
  let fixture: ComponentFixture<StudentContactModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentContactModelComponent]
    });
    fixture = TestBed.createComponent(StudentContactModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
