import {Policy} from '../src';

interface Cargo {
    weightInTons: number;
}
const getCargo = (): Cargo => ({
    weightInTons: 65
});

interface Ship {
    capacityInTons: number;
    usedCapacityInTons: number;
    loadedCargos: Cargo[];
}
const getShip = (): Ship => ({
    capacityInTons: 654,
    usedCapacityInTons: 134,
    loadedCargos: [
        /*
        ...some cargo objects already loaded onto the ship
         */
    ],
});

// noinspection JSUnusedLocalSymbols
function badPractice() {
    const cargo = getCargo();
    const ship = getShip();

    if (cargo.weightInTons > (ship.capacityInTons * 1.1 - ship.usedCapacityInTons)) {
        throw new Error('Cargo does not fit onto ship');
    }

    ship.loadedCargos.push(cargo);
    ship.usedCapacityInTons += cargo.weightInTons;
}


/**
 * Overbooking Policy which enables booking upto 110% of available ship capacity
 */
class OverbookingPolicy extends Policy {
    public static isAllowed(ship: Ship, cargo: Cargo) {
        return cargo.weightInTons <= (ship.capacityInTons * 1.1 - ship.usedCapacityInTons);
    }
}

/*
Extracting the Policy/Guard into a separate function/class makes this easily readable even to non-developers
 */
// noinspection JSUnusedLocalSymbols
function goodPractice() {
    const cargo = getCargo();
    const ship = getShip();

    if (!OverbookingPolicy.isAllowed(ship, cargo)) {
        throw new Error('Cargo does not fit onto ship');
    }

    ship.loadedCargos.push(cargo);
    ship.usedCapacityInTons += cargo.weightInTons;
}
