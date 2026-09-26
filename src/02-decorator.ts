export {}; // makes this file a module, so class names do not clash with 01-dependency-injection.ts

// Contract
interface Engine {
  power(): number; // horsepower
  describe(): string;
}

class DieselEngine implements Engine {
  power(): number {
    return 150;
  }
  describe(): string {
    return "Diesel engine";
  }
}

class ElectricEngine implements Engine {
  power(): number {
    return 200;
  }
  describe(): string {
    return "Electric engine";
  }
}

// Decorator: IS an Engine and HAS an Engine.
// A turbo is bolted onto an engine, and the result is still an engine.
class Turbo implements Engine {
  constructor(private inner: Engine) {}

  power(): number {
    return Math.round(this.inner.power() * 1.3); // +30% of whatever is inside
  }
  describe(): string {
    return `${this.inner.describe()} + Turbo`;
  }
}

// Decorator: adds a fixed boost
class Nitrous implements Engine {
  constructor(private inner: Engine, private boost: number) {}

  power(): number {
    return this.inner.power() + this.boost;
  }
  describe(): string {
    return `${this.inner.describe()} + Nitrous`;
  }
}

class Car {
  constructor(private engine: Engine) {}

  drive() {
    console.log(`${this.engine.describe()}: ${this.engine.power()} hp`);
  }
}

// TODO: Invent other way to do Decorator

console.log("--- 1. Plain engine ---");
new Car(new DieselEngine()).drive();

console.log("\n--- 2. One decorator ---");
new Car(new Turbo(new DieselEngine())).drive();

console.log("\n--- 3. Two decorators, stacked ---");
new Car(new Nitrous(new Turbo(new DieselEngine()), 50)).drive();

console.log("\n--- 4. Same decorators, other order ---");
new Car(new Turbo(new Nitrous(new DieselEngine(), 50))).drive();

console.log("\n--- 5. Same decorators, other engine ---");
new Car(new Nitrous(new Turbo(new ElectricEngine()), 50)).drive();


// TIP: If I write it functionally
// Isn't this just a Higher-Order Function?
// Here we add 30% to the original(turbo) by wrapping the original with turbo
// 

const power = () => 150;
const turbo = (fn: () => number) => {
  return () => Math.round(fn() * 1.3); // call the original, then add 30%
}

const turboPower = turbo(power);

console.log(power());
console.log("turboPower", turboPower());
