// Searching functions based on indexed rooms

require("./items.js")();

function checkIfDay(days, findDay) {
    for (let day of days) {
        if(day == findDay) {
            return true
        }
    }
    return false;
}

function checkClassTime(day, stringStart, stringEnd, ourClass) {
    let start = stringStart.replace(':','');
    let end = stringEnd.replace(':','');

    let class_start = ourClass.time_start.replace(':','');
    let class_end = ourClass.time_end.replace(':','');
    
    // To check if valid time -- end before class start, start after class end
    if(!checkIfDay(ourClass.days, day)) { // If not on current day
        return true;
    } else if( (end < class_start) || (start > class_end)  ) { // Already checked day, now check times
        return true;
    }

    return false;
}

function getFloor(building, floor) {
    let foundBuilding = findBuild(building);
    let foundFloor = foundBuilding.findFloor(floor);
    return foundFloor;
}

function formatDate (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

function returnClassUse(ourClass) {
    let abbDays = "";
    for(let day of ourClass.days) {
        abbDays = abbDays + day.substring(0,3) + " ";
    }
    let string = "(In use between " + formatDate(ourClass.time_start) + " and " + formatDate(ourClass.time_end) + " on " + abbDays.slice(0,-1) 
    + " [" + ourClass.prefix + " " + ourClass.course_number + "." + ourClass.section.slice(0,-1)  + "])";
    return string;
}

module.exports = function() {
    this.search = function(day, building, floor, startTime, endTime) {
        /*console.log("[UTD Room Search]")
        console.log("  [Day]: " + day);
        console.log("  [Building]: " + building);
        console.log("  [Floor]: " + floor);
        console.log("  [Start Time]: " + startTime);
        console.log("  [End Time]: " + endTime);
        console.log("Searching for available rooms...\n")*/

        let foundFloor = getFloor(building, floor);
        let goodClass = [];
        let badClass = [];

        Object.entries(foundFloor.rooms).forEach(([roomNum,classObjArray]) => {
            // roomNum = room number
            // Loop through classObjArray to see if any
            let passed = true;
            let faultClass = undefined;

            Object.entries(classObjArray).forEach(([index,classObj]) => {
                if (checkClassTime(day, startTime, endTime, classObj) == true) {
                    // none
                } else {
                    faultClass = classObj;
                    passed = false;
                }
            })

            if(passed) {
                goodClass.push([roomNum,classObjArray]);
            }else{
                badClass.push([roomNum, faultClass])
            }
        })
        
        /*console.log("Found " + goodClass.length + " rooms:");
        for(let pair of goodClass) {
            console.log(pair[0]);
        }
        console.log("----------");
    
        console.log("Threw " + badClass.length + " rooms:");
        for(let pair of badClass) {
            console.log(pair[0] + " " + returnClassUse(pair[1]));
        }
        console.log("----------");*/

        return goodClass
    }
}
