function GetTypedElement<T extends HTMLElement>(
  el: HTMLElement,
  ctor: new (...args: any[]) => T
): T {
  if (!(el instanceof ctor)) {
    throw new TypeError(`Expected ${ctor.name}`);
  }
  return el;
}

export { GetTypedElement };