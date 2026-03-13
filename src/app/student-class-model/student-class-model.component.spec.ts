import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassModelComponent } from './student-class-model.component';

describe('StudentClassModelComponent', () => {
  let component: StudentClassModelComponent;
  let fixture: ComponentFixture<StudentClassModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentClassModelComponent]
    });
    fixture = TestBed.createComponent(StudentClassModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
