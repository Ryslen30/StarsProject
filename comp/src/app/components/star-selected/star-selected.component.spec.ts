import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSelectedComponent } from './star-selected.component';

describe('StarSelectedComponent', () => {
  let component: StarSelectedComponent;
  let fixture: ComponentFixture<StarSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarSelectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
