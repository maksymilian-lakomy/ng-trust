class ClickEffectDirectiveWarnings {
  public static ColorWasNotProvided(): void {
    console.warn(
      `Click effect will not work. You have to set up color of the effect!`
    );
  }
}

class ClassBinderWarnings {
  public static ClassIsAlreadyBound(
    className: string,
    element: HTMLElement
  ): void {
    console.warn(`Class .${className} is already bound to element ${element}!`);
  }

  public static ClassIsNotBound(className: string, element: HTMLElement): void {
    console.warn(`${element} does not have class .${className}!`);
  }
}

export class WarningsUtils {
  public static ClassBinder = ClassBinderWarnings;

  public static ClickEffectDirective = ClickEffectDirectiveWarnings;
}
