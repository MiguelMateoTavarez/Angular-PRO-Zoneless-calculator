import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "w-1/4 border-r border-b border-indigo-400",
    '[class.w-2/4]': 'isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);

  public isCommand = input( false, {
    transform: (value: boolean | string) => this.transformBooleanProperties(value)
  });
  public isDoubleSize = input( false, {
    transform: (value: boolean | string) => this.transformBooleanProperties(value)
  });

  private transformBooleanProperties(value: boolean | string){
    return typeof value === 'string' ? value === '' : value;
  }

  handleClick(){
    if(!this.contentValue()?.nativeElement) return;
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public handleKeyboardPressedStyle(key:string){
    if(!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key)return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 200);
  }
}
