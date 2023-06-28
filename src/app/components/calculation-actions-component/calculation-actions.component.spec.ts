import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationActionsComponent } from './calculation-actions.component';
import { CalculationService } from "../../shared/calculation.service";
import { BehaviorSubject } from "rxjs";

describe('CalculationActionsComponent', () => {
  let component: CalculationActionsComponent;
  let fixture: ComponentFixture<CalculationActionsComponent>;
  let calcService: CalculationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculationActionsComponent],
      providers: [CalculationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    calcService = jasmine.createSpyObj('CalculationService', [
      'additionCalcOperation',
      'divisionCalcOperation',
      'moduloCalcOperation',
      'highestPrimeCalcOperation'
    ]);
    component = new CalculationActionsComponent(calcService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set firstOperand and secondOperand to 0', () => {
    component.firstOperand = 10;
    component.secondOperand = 5;

    component.clearInputFields();

    expect(component.firstOperand).toBe(0);
    expect(component.secondOperand).toBe(0);
  });

  it('should call clearErrorMessage', () => {
    spyOn(component, 'clearErrorMessage');

    component.clearInputFields();

    expect(component.clearErrorMessage).toHaveBeenCalled();
  });

  it('should reset hasError, secondOpError, and errorMessage', () => {
    component.hasError = true;
    component.secondOpError = true;
    component.errorMessage = 'Some error message';

    component.clearInputFields();

    expect(component.hasError).toBe(false);
    expect(component.secondOpError).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should return true when inputs are valid', () => {
    component.firstOperand = 5;
    component.secondOperand = 10;

    const result = component.validateInputs('add');

    expect(result).toBeTrue();
  });

  it('should return false when operands are null', () => {
    // @ts-ignore
    component.firstOperand = null;
    // @ts-ignore
    component.secondOperand = null;

    const result = component.validateInputs('add');

    expect(result).toBeFalse();
    expect(component.hasError).toBeTrue();
    expect(component.errorMessage).toEqual('Both operands are required!');
  });

  it('should return false when second operand is 0 for divide operation', () => {
    component.firstOperand = 5;
    component.secondOperand = 0;

    const result = component.validateInputs('divide');

    expect(result).toBeFalse();
    expect(component.hasError).toBeTrue();
    expect(component.secondOpError).toBeTrue();
    expect(component.errorMessage).toEqual('Second operand should not be 0!');
  });

  it('should return false when second operand is not greater than first operand for highestPrime operation', () => {
    component.firstOperand = 10;
    component.secondOperand = 5;

    const result = component.validateInputs('highestPrime');

    expect(result).toBeFalse();
    expect(component.hasError).toBeTrue();
    expect(component.secondOpError).toBeTrue();
    expect(component.errorMessage).toEqual('Second operand should be greater than First operand!');
  });

  it('should clear error messages and error-related properties in the component', () => {
    component.hasError = true;
    component.errorMessage = 'Some error message';
    component.noPrimeNumberMessage$ = new BehaviorSubject<string>('No Prime number was found');

    component.clearErrorMessage();

    expect(component.hasError).toBeFalse();
    expect(component.secondOpError).toBeFalse();
    expect(component.errorMessage).toEqual('');
    expect(component.noPrimeNumberMessage$.value).toEqual('');
  });

  it('should call additionCalcOperation when addCalcOp is called and validation passes', () => {
    component.firstOperand = 5;
    component.secondOperand = 10;

    component.addCalcOp();

    expect(calcService.additionCalcOperation).toHaveBeenCalledWith(5, 10);
  });

  it('should not call additionCalcOperation when addCalcOp is called and validation fails', () => {
    // @ts-ignore
    component.firstOperand = null;
    // @ts-ignore
    component.secondOperand = null;

    component.addCalcOp();

    expect(calcService.additionCalcOperation).not.toHaveBeenCalled();
  });

  it('should call divisionCalcOperation when divideCalcOp is called and validation passes', () => {
    component.firstOperand = 5;
    component.secondOperand = 10;

    component.divideCalcOp();

    expect(calcService.divisionCalcOperation).toHaveBeenCalledWith(5, 10);
  });

  it('should not call divisionCalcOperation when divideCalcOp is called and validation fails', () => {
    component.firstOperand = 5;
    component.secondOperand = 0;

    component.divideCalcOp();

    expect(calcService.divisionCalcOperation).not.toHaveBeenCalled();
  });

  it('should call divisionCalcOperation when moduloCalcOp is called and validation passes', () => {
    component.firstOperand = 10;
    component.secondOperand = 5;

    component.moduloCalcOp();

    expect(calcService.moduloCalcOperation).toHaveBeenCalledWith(10, 5);
  });

  it('should not call divisionCalcOperation when moduloCalcOp is called and validation fails', () => {
    component.firstOperand = 10;
    component.secondOperand = 0;

    component.moduloCalcOp();

    expect(calcService.moduloCalcOperation).not.toHaveBeenCalled();
  });

  it('should call highestPrimeCalcOperation when highestPrimeCalcOp is called and validation passes', () => {
    component.firstOperand = 5;
    component.secondOperand = 10;

    component.highestPrimeCalcOp();

    expect(calcService.highestPrimeCalcOperation).toHaveBeenCalledWith(5, 10);
  });

  it('should not call highestPrimeCalcOperation when highestPrimeCalcOp and validation fails', () => {
    component.firstOperand = 10;
    component.secondOperand = 5;

    component.highestPrimeCalcOp();

    expect(calcService.highestPrimeCalcOperation).not.toHaveBeenCalled();
  });
});
