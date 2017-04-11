class Person {
    constructor(name, contactInfo) {
        this.name = name;
        this.contactInfo = contactInfo;
    }
}

class Manager extends Person {
    constructor(name, contactInfo) {
        super(name, contactInfo);
    }
}

// Create the Tenant class

// class Tenant's constructor should take two parameters: name and contactInfo
// Tenant should inherit from Person
// Tenant should have a property "references" initialized to a blank array
// Tenant should have a function "addReference(reference)", which adds to its "references" array.

class Tenant extends Person {
    constructor(name, contactInfo) {
        super(name, contactInfo);
        this.references = [];
    }

    addReference(reference) {
        if (reference instanceof Person) {
            this.references.push(reference);
        }
    }
}


class Apartment {
    constructor(address) {
        this.manager = null;
        this.units = [];
        this.address = address;
    }

    setManager(manager) {
        if (manager instanceof Manager) {
            this.manager = manager;
        }
    }

    getManager() {
        return this.manager;
    }

    addTenant(unit, tenant) {
        if (this.manager && unit.available() && tenant.references.length >= 2 && tenant instanceof Tenant) {
            unit.occupied = true;
        }
    }

}

class Unit {
    // create constructor with these parameters: (number, building, sqft, rent)
    // constructor should also have property "occupied"

    constructor(number, building, sqft, rent) {
        this.number = number;
        this.building = building;
        this.sqft = sqft;
        this.rent = rent;
        this.occupied = false;
    }

    // available()
    //  - return true if no tenant, false if tenant
    available() {
        return !this.occupied;
    }
}

// Create a variable `terraces`. It should be an instance of `Apartment`.
// The address for terraces is '66 7th Street'

var terraces = new Apartment("66 7th Street");

// Create a variable `unit1`. It should be an instance of `Unit`.
// The number is `564`, the building is `terraces`, the square feet is `700` and the rent is `2000`
var unit1 = new Unit(564, terraces, 700, 2000);

// Create a variable `unit2`. It should be an instance of `Unit`.
// The number is `332`, the building is `terraces`, the square feet is `600` and the rent is `1800`
var unit2 = new Unit(332, terraces, 600, 1800);

// Push unit1 and unit2 to the units array in the terraces object.
terraces.units.push(unit1);
terraces.units.push(unit2);

// Use console.log to check to make sure that each unit has been added to terraces
console.log(terraces);

// Create an instance of the Manager object - `bob`.
// His name is 'Bob Brannan' and his contact info is '555-555-555'
// Use console.log to check your work.

var bob = new Manager("Bob Brannan", "555-555-555");
console.log(bob);

// Create an instance of the Tenant object - `jane`.
// Her name is 'Jane Davis' and her contact info is '555-555-555'
// Use console.log to check your work.

var jane = new Tenant("Jane Davis", "555-555-555");
console.log(jane);

// Create two instances of the Person object - `jill` and `carl`
// jill: Name: 'Jill Taylor', Contact Info '555-555-5555'
// carl: Name: 'Carl Jones', Contact Info '555-555-5555'
// Use console.log to check your work.

var jill = new Person("Jill Taylor", "555-555-5555");
var carl = new Person("Carl Jones", "555-555-5555");

console.log(jill);
console.log(carl);

// Use the setManager() method to set bob as the manager of terraces
terraces.setManager(bob);

// Use console.log to make sure that bob has been set as manager
// Use console.log to access the getManager() method for the terraces object.

console.log("Manager is", terraces.getManager());


// Use the addReference() method to set jill and carl as the references for jane
jane.addReference(jill);
jane.addReference(carl);

// Use the addTenant() method to set jane as the tenant for unit1
// Use console.log to check your work.

terraces.addTenant(unit1, jane);
console.log(unit1);

// BONUS:
var displayUnits = function() {
    // Use jQuery to append each available unit in the terraces apartment on the page.
    // For each available unit, the following info should be shown:
    // Number: (unit number)
    // Rent: (rent for unit)
    // (square footage) sqft
    // Contact Info: (manager name) - (manager contact info)

    for (var i = 0; i < terraces.units.length; i++) {
        var unit = terraces.units[i];

        if (unit.available()) {
            $("<div>")
                .append(`<p>Unit: ${unit.number}</p>`)
                .append(`<p>Rent: ${unit.rent}</p>`)
                .append(`<p>Sqft: ${unit.sqft}</p>`)
                .append(`<p>Contact Info: ${terraces.getManager().name} - ${terraces.getManager().contactInfo}</p>`)
                .appendTo($("body"));
        }
    }
};

displayUnits();
