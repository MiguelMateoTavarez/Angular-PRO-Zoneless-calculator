import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  //Help me know if the component can be mounted
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('shold render router-outlet wrapped with css class', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    expect(divElement).not.toBeNull();

    const divClasses = divElement?.classList.value.split(' ');

    mustHaveClasses.forEach(className => {
      expect(divClasses).toContain(className);
    })
  });

  it("should contain the 'Buy me a beer' link", () =>{
    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toEqual('Buy me a beer');
    expect(anchorElement?.href).not.toBeNull();
    expect(anchorElement?.href).toContain('buymeacoffee.com');
    expect(anchorElement?.href).toContain('scottwindon');
  })
});
