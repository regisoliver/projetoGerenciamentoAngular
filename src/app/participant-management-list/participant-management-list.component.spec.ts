import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantManagementListComponent } from './participant-management-list.component';

describe('ParticipantManagementListComponent', () => {
  let component: ParticipantManagementListComponent;
  let fixture: ComponentFixture<ParticipantManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantManagementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
