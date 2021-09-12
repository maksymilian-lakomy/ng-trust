export class WarningsUtils {
  public static ClassBinder: typeof ClassBinderWarnings;
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
