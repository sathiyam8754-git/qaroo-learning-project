import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntryModelComponent } from './student-entry-model.component';

describe('StudentEntryModelComponent', () => {
  let component: StudentEntryModelComponent;
  let fixture: ComponentFixture<StudentEntryModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEntryModelComponent]
    });
    fixture = TestBed.createComponent(StudentEntryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
