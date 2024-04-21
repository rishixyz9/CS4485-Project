// Objects for storage and exported classmaster functions

let Class = class { // Class object
    constructor(prefix, course_number, section, building, floor, room, days, time_start, time_end) {
        this.prefix = prefix;
        this.course_number = course_number;
        this.section = section;

        this.building = building;
        this.floor = floor;
        this.room = room;

        this.days = days;
        this.time_start = time_start;
        this.time_end = time_end;
    }    
};

let Floor = class { // Floor object
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    checkChildren() { // List all rooms on floor
        console.log("Showing rooms on floor " + this.name);
        Object.entries(this.rooms).forEach(([roomNum,classObjArray]) => {
            console.log("Room " + roomNum + " exists");
        });
        console.log("----------");
    }

    addClass(toAdd) { // Add class to floor (add to room)
        if (typeof(this.rooms[toAdd.room]) == "undefined") { // If class array is not initialized
            this.rooms[toAdd.room] = [];
        }
        this.rooms[toAdd.room].push(toAdd); // Push to dictionary
        
        //console.log("Assigned class to " + this.name);
    }
}

let Building = class { // Building object
    constructor(name) {
        this.name = name;
        this.floors = [];
        //console.log("Created new building " + name)
    }

    seeIfFloorExists(findFloor) { // Check if floor exists
        for (let floor of this.floors) {
            if(floor.name == findFloor) {
                return true;
            }
        }
        return false;
    }

    findFloor(floorNumber) { // Find floor from floor number
        for (let floor of this.floors) {
            if(floor.name == floorNumber) {
                return floor;
            }
        }
        return false;
    }

    checkChildren() { // Prompt floor check
        console.log("Showing results for building " + this.name);
        this.floors.forEach(function (item, index) {
            item.checkChildren();
        });
        console.log("----------");
    }

    addClass(toAdd) { // Add class to building
        if(this.seeIfFloorExists(toAdd.floor) == false) { // If floor doesn't exist then create new floor and add
            let newFloor = new Floor(toAdd.floor);
            this.floors.push(newFloor);
            newFloor.addClass(toAdd);
        } else { // If floor exists then push to existing floor
            let newFloor = this.findFloor(toAdd.floor);
            newFloor.addClass(toAdd);
        }
        //this.floors.push(newObject);
    }
}

buildings = [];

module.exports = function() {
    this.buildings = buildings;
    this.Class = Class;
    this.Floor = Floor;
    this.Building = Building;

    this.seeIfBuildingExists = function(buildName) { // Check if building exists
        for (let building of this.buildings) {
            if(building.name == buildName) {
                return true;
            }
        }
        return false;;
    }
    
    this.findBuild = function(buildName) { // Find building
        for (let building of this.buildings) {
            if(building.name == buildName) {
                return building;
            }
        }
        console.log("NONE FOUND " + buildName);
        return false;
    }
    
    this.checkBuildings = function() {
        console.log("Checking child tree [CLASS MASTER]")
        console.log("----------");
        this.buildings.forEach(function (item, index) {
            item.checkChildren();
        });
        console.log("----------");
    }
    
    this.masteraddClass = function(toAdd) {
        if (seeIfBuildingExists(toAdd.building) == false) {
            let newBuilding = new Building(toAdd.building);
            this.buildings.push(newBuilding);
            newBuilding.addClass(toAdd);
            
        } else {
            let ourBuilding = findBuild(toAdd.building);
            ourBuilding.addClass(toAdd);
        }
    }
}

