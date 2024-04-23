// Get user input and return

const prompt = require("prompt-sync")({ sigint: true });

module.exports = function() {
    this.input = function() {
        console.log("Enter day: "); // Monday, Tuesday, Wednesday, etc
        const day = prompt("> ");
        console.log(`Day ${day}`);
    
        console.log("Enter building: "); // SCI, ECSW, etc
        const building = prompt("> ");
        console.log(`Building ${building}`);
    
        console.log("Enter floor: "); // 1-5
        const floor = prompt("> ");
        console.log(`Floor ${floor}`);
    
        console.log("Enter starting time: "); // 12:00
        const time_start = prompt("> ");
        console.log(`Start Time ${time_start}`);
    
        console.log("Enter ending time: "); // 14:00
        const time_end = prompt(">" );
        console.log(`End Time ${time_end}`);
    
        return day, building, floor, time_start, time_end;
    }
    
}