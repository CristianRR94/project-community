import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEventoComponent } from './mod-evento.component';

describe('ModEventoComponent', () => {
  let component: ModEventoComponent;
  let fixture: ComponentFixture<ModEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
