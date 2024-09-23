import { Injectable, signal } from '@angular/core';

const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators: string[] = ['+', '-', '/', '⨉', '=', '*'];
const specialOperators: string[] = [ '÷','+/-', 'C', '.', '=', 'Backspace', 'Delete', 'Enter'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');

  public constructNumber(value: string):void {

    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      console.log('Invalid input', value);
      return;
    };

    if(value === '='){
      this.calculateResult();
      this.subResultText.set('0');
      return;
    }

    if(value === 'C' || value === 'Delete'){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if(value === 'Backspace'){
      if(this.resultText() === '0') return;
      if(this.resultText().length === 1){
        this.resultText.set('0');
        return;
      }
      this.resultText.update(previousValue => previousValue.slice(0, -1));
      return;
    }

    if(operators.includes(value)){
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if(this.resultText().length >= 10){
      console.log('Max length reached');
      return;
    }

    if(value === '.' && !this.resultText().includes('.')){
      if(this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update(text => text + '.');
      return;
    }

    if(value === '+/-'){
      if(this.resultText().includes('-')){
        this.resultText.update(text => text.slice(1));
        return;
      }
      this.resultText.update(text => `-${text}`);
      return;
    }

    if(numbers.includes(value)){

      if(this.resultText() === '-0'){
        this.resultText.set(`-${value}`);
        return;
      }

      if(this.resultText() === '0'){
        this.resultText.set(value);
        return;
      }
    }

    if (value === '0' && this.resultText() === '0' || this.resultText() === '-0') {
      return;
    }

    this.resultText.update(text => text + value);
  }

  public calculateResult():void {
    const firstNumber = parseFloat(this.subResultText());
    const secondNumber = parseFloat(this.resultText());

    let result = 0;

    switch(this.lastOperator()){
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '÷':
        result = firstNumber / secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
    }

    this.resultText.set(result.toString());
  }

}
