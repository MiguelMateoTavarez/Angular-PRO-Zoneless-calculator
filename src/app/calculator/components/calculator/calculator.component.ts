import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log({key});
  }

  handleKeyboardEvent(event: KeyboardEvent){
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      '+': '+',
      '-': '-',
      '=': '=',
      '/': '÷',
      '*': '⨉',
      '7': '7',
      '8': '8',
      '9': '9',
      '4': '4',
      '5': '5',
      '6': '6',
      '1': '1',
      '2': '2',
      '3': '3',
      '0': '0',
      '.': '.',
      'Backspace': 'C',
      'Delete': 'C',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach( button => {
      button.handleKeyboardPressedStyle(keyValue);
    });
  }
}
