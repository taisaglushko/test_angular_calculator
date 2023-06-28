import { Component } from '@angular/core';

import { CalculationService } from '../../shared/calculation.service'

/**
 * Component for displaying calculation results.
 */
@Component({
  selector: 'app-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.css']
})
export class CalculationResultsComponent {
  results$ = this.calcService.resultsChanged$;

  constructor(private calcService: CalculationService) {}

}
