import { Component } from '@angular/core';

import { CalculationService } from '../../shared/calculation.service'

/**
 * Component for performing calculation actions.
 */
@Component({
  selector: 'app-calculation-actions',
  templateUrl: './calculation-actions.component.html',
  styleUrls: ['./calculation-actions.component.css']
})
export class CalculationActionsComponent {
  firstOperand = 0;
  secondOperand = 0;
  hasError = false;
  secondOpError = false;
  errorMessage = '';
  noPrimeNumberMessage$ = this.calcService.noPrimeNumberMessage$;
  constructor(private calcService: CalculationService) {}

  /**
   * Validates the input values for a calculation operation.
   * @param {string} operation - The type of calculation operation.
   * @returns {boolean} Returns `true` if the inputs are valid, otherwise `false`.
   */
  validateInputs(operation: string): boolean {
    this.clearErrorMessage();
    if (this.firstOperand == null || this.secondOperand == null) {
      this.createErrorMessage('Both operands are required!', true, false);
      return false;
    }

    if (
        (operation === 'divide' || operation === 'modulo') &&
        this.secondOperand === 0
    ) {
      this.createErrorMessage('Second operand should not be 0!', true, true);
      return false;
    } else if (
        operation === 'highestPrime' &&
        this.firstOperand >= this.secondOperand
    ) {
      this.createErrorMessage('Second operand should be greater than First operand!', true, true);
      return false;
    }

    return true;
  }

  /**
   * Creates an error message and updates the error-related properties in the component.
   *
   * @param {string} text - The error message text.
   * @param {boolean} hasError - Indicates whether there is a general error.
   * @param {boolean} secondOpError - Indicates whether there is a specific error related to the second operand.
   */
  createErrorMessage(text: string, hasError: boolean, secondOpError: boolean) {
    this.hasError = hasError;
    this.secondOpError = secondOpError;
    this.errorMessage = text;
  }

  /**
   * Clears the error messages and error-related properties in the component.
   */
  clearErrorMessage() {
    this.hasError = false;
    this.secondOpError = false;
    this.errorMessage = '';
    this.noPrimeNumberMessage$?.next('');
  }

  /**
   * Performs the addition calculation operation.
   */
  addCalcOp() {
    if (this.validateInputs('add')) {
      this.calcService.additionCalcOperation(this.firstOperand, this.secondOperand);
    }
  }

  /**
   * Performs the division calculation operation.
   */
  divideCalcOp() {
    if (this.validateInputs('divide')) {
      this.calcService.divisionCalcOperation(this.firstOperand, this.secondOperand);
    }
  }

  /**
   * Performs the modulo calculation operation.
   */
  moduloCalcOp() {
    if (this.validateInputs('modulo')) {
      this.calcService.moduloCalcOperation(this.firstOperand, this.secondOperand);
    }
  }

  /**
   * Performs the highest prime calculation operation.
   */
  highestPrimeCalcOp() {
    if (this.validateInputs('highestPrime')) {
      this.calcService.highestPrimeCalcOperation(this.firstOperand, this.secondOperand);
    }
  }
}
