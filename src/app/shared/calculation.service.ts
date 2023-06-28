import { ICalculationResult } from "./calculation-result.model";
import { BehaviorSubject } from "rxjs";

/**
 * Service for performing calculations and managing calculation results.
 */
export class CalculationService {
  resultsChanged$ = new BehaviorSubject<ICalculationResult[]>([]);
  noPrimeNumberMessage$ = new BehaviorSubject<string>('');
  private highestPrimeNumber = 0;
  private results: ICalculationResult[] = [];

  /**
   * Performs addition operation and stores the result.
   * @param {number} num1 - First operand.
   * @param {number} num2 - Second operand.
   */
  additionCalcOperation (num1: number, num2: number) {
    this.storeCalcResult('addition', num1 + num2);
  }

  /**
   * Performs division operation and stores the result.
   * @param {number} num1 - Numerator.
   * @param {number} num2 - Denominator.
   */
  divisionCalcOperation (num1: number, num2: number) {
    this.storeCalcResult('division', num1 / num2);
  }

  /**
   * Performs modulo operation and stores the result.
   * @param {number} num1 - Dividend.
   * @param {number} num2 - Divisor.
   */
  moduloCalcOperation (num1: number, num2: number) {
    this.storeCalcResult('modulo', num1 % num2);
  }

  /**
   * Finds the highest prime number between two given numbers and stores the result.
   * @param {number} num1 - First number.
   * @param {number} num2 - Second number.
   */
  highestPrimeCalcOperation (num1: number, num2: number) {
    const start = Math.ceil(Math.min(num1, num2));
    const end = Math.trunc(Math.max(num1, num2));

    for (let i = end; i >= start; i--) {
      if (this.isPrimeNumber(i)) {
        this.highestPrimeNumber = i;
        this.noPrimeNumberMessage$?.next('');
        this.storeCalcResult('highest prime number', this.highestPrimeNumber);
        return;
      }
    }
    this.noPrimeNumberMessage$?.next(`There is no highest prime number between ${num1} and ${num2}`);
  }

  /**
   * Stores the calculation result.
   * @param {string} curOp - Name of the operation.
   * @param {number} curResult - Result of the operation.
   */
  private storeCalcResult (curOp: string, curResult: number) {
    const currentResult: ICalculationResult = {
      name: curOp,
      result: curResult
    }
    this.results.push(currentResult);
    this.resultsChanged$.next(this.results.slice().reverse());
  }

  /**
   * Checks if a number is prime.
   * @param {number} num - The number to be checked.
   * @returns {boolean} Returns true if the number is prime, false otherwise.
   */
  private isPrimeNumber(num: number): boolean {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}