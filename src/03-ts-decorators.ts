export {};

// Same Turbo and Nitrous as 02-decorator.ts, but with the @ syntax.
// A method decorator is a function that gets the original method and returns a new method.

type PowerMethod<This> = (this: This) => number;

function turbo<This>(original: PowerMethod<This>, _context: ClassMethodDecoratorContext<This, PowerMethod<This>>) {
  return function (this: This): number {
    return Math.round(original.call(this) * 1.3); // .call(this) keeps `this`, see the lesson in 01
  };
}

// Decorator factory: a function that RETURNS a decorator, so it can take arguments
function nitrous(boost: number) {
  return function <This>(original: PowerMethod<This>, _context: ClassMethodDecoratorContext<This, PowerMethod<This>>) {
    return function (this: This): number {
      return original.call(this) + boost;
    };
  };
}

// Every TunedDieselEngine gets Turbo and Nitrous. The caller cannot choose.
class TunedDieselEngine {
  @nitrous(50) // applied second (outer)
  @turbo       // applied first (inner)
  power(): number {
    return 150;
  }
}

class Car {
  constructor(private engine: { power(): number }) {}

  drive() {
    console.log(`${this.engine.power()} hp`);
  }
}

new Car(new TunedDieselEngine()).drive(); // same as new Nitrous(new Turbo(new DieselEngine()), 50) in 02
