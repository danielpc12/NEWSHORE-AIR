export class Transport {
    private flightCarrier: string;
    private flightNumber: string;

    constructor(flightCarrier: string, flightNumber: string) {
        this.flightCarrier = flightCarrier;
        this.flightNumber = flightNumber;
    }

    getFlightCarrier() {
        return this.flightCarrier;
    }

    setFlightCarrier(flightCarrier: string) {
        this.flightCarrier = flightCarrier;
    }

    getFlightNumber() {
        return this.flightNumber;
    }

    setFlightNumber(flightNumber: string) {
        this.flightNumber = flightNumber;
    }
}
