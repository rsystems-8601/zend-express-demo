import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DzNotificationsComponent } from './dz-notifications.component';


describe('DzNotificationsComponent', () => {
  let component: DzNotificationsComponent;
  let fixture: ComponentFixture<DzNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DzNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DzNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
