import { Transport } from "./Transport";

export class Flight {
    public transport: Transport;
    private origin: string;
    private destination: string;
    private price: number;

    constructor(transport: Transport, origin: string, destination: string, price: number) {
        this.transport = transport;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
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
