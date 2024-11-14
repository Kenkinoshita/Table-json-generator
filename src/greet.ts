export class Greeter {
  constructor(private name: string) {}

  getMessage() {
    return `Hello ${this.name}`;
  }

  culc(a: number, b: number): number {
    return a + b;
  }
}
