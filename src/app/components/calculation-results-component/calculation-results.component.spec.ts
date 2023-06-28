import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationResultsComponent } from './calculation-results.component';
import {CalculationService} from "../../shared/calculation.service";

describe('CalculationResultsComponent', () => {
  let component: CalculationResultsComponent;
  let fixture: ComponentFixture<CalculationResultsComponent>;
  let resultsTable: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationResultsComponent ],
      providers: [CalculationService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationResultsComponent);
    component = fixture.componentInstance;
    resultsTable = fixture.debugElement.nativeElement.querySelector('.table');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "tbody"', () => {
    expect(resultsTable.querySelector('tbody')).toBeTruthy();
  });
});
