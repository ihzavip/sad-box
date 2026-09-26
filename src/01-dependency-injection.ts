// Contract
interface Engine {
  start(): boolean;
}

class DieselEngine {
  start(): boolean {
    console.log("Vroom! Diesel engine started.");
    return true;
  }
}

class ElectricEngine {
  start(): boolean {
    console.log("Silent electric engine started.");
    return true;
  }
}

class BrokenEngine {
  start(): boolean {
    console.log("Engine won't start.");
    return false;
  }

  stop() {
    console.log("No !");
  }
}

class ManualCar {
  engineDiesel: DieselEngine;
  engineElectric: ElectricEngine;
  // TODO: How is this better than declaring class inside contructor?
  // So we can pass the engine in the class instanciate rather than below implementation
  constructor() {
    this.engineDiesel = new DieselEngine(); // Car creates its own engine
    this.engineElectric = new ElectricEngine(); // Car creates its own engine
  }

  drive() {
    this.engineDiesel.start();
    // this.engineElectric.start();
    console.log("Car is driving...");
  }
}

class DICar {
  constructor(private engine: Engine) {}

  drive() {
    const started = this.engine.start();

    if (!started) {
      console.log("Engine is broken!");
      return;
    }

    console.log("Car is driving...");
  }
}

const diCar = new DICar(new BrokenEngine());
diCar.drive();

// The benefit would be more apparent on bigger scale
