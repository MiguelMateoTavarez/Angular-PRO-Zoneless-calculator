import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
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
      'Delete': 'C',
      'Enter': '=',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach( button => {
      button.handleKeyboardPressedStyle(keyValue);
    });
  }
}
