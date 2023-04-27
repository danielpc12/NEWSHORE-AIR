import { Flight } from "./Flight";

export class Journey {
  public flights: Flight[];
  private origin: string;
  private destination: string;
  private price: number;

  constructor(origin: string, destination: string, price: number, flights?: Flight[]) {
    this.origin = origin;
    this.destination = destination;
    this.price = price;
    this.flights = flights || [];
  }

  public setOrigin(origin: string): void {
    this.origin = origin;
}

public setDestination(destination: string): void {
    this.destination = destination;
}

public setPrice(price: number): void {
    this.price = price;
}

public getOrigin(): string {
    return this.origin;
}

public getDestination(): string {
    return this.destination;
}

public getPrice(): number {
    return this.price;
}
}
