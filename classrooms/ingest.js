// Ingesting class data json files and starting classification process

const fs = require('fs');
const path = require('path');

require("./items.js")();

function ingest() {
    let ingested = 0;
    const jsonsInDir = fs.readdirSync('./ClassData/22_Spring').filter(file => path.extname(file) === '.json');
    jsonsInDir.forEach(file => {
        const fileData = fs.readFileSync(path.join('./ClassData/22_Spring', file));
        const json = JSON.parse(fileData.toString());
        //console.log(json);
        json.report_data.forEach(obj => {
            if(obj.activity_type != "Laboratory" || obj.activity_type != "Laboratory - No Lab Fee") { // Remove lab sections
                let prefix = obj.course_prefix;
                let course_number = obj.course_number;
                let section = obj.section;
                //console.log(prefix + "-" + course_number + "-" + section);

                let raw_location = obj.location;
                let raw_time = obj.times;
                let raw_days = obj.days;
            
                // building parts
                let building = raw_location.substring(0, raw_location.indexOf(" "));
                let room = raw_location.substring(raw_location.indexOf(" ")+1, raw_location.length);
                let floor = (room.substr(0, room.indexOf('.'))).substr(-1); // take only last digit because double digit floors exist for some reason but only last digit matters
                //console.log(building + "-" + room + "-" + floor);
            
                // time parts
                raw_days = raw_days.replace(/ /g,'');
                raw_days = raw_days.replace(/&/g, ',');
                let days = raw_days.split(",");
                //console.log(days);

                raw_time = raw_time.replace(/ /g,'');
                let startTime = raw_time.substring(0, raw_time.indexOf("-"));
                let endTime = raw_time.substring(raw_time.indexOf("-")+1,raw_time.length);
                //console.log(startTime + "-" + endTime);
                let currClass = new Class(prefix, course_number, section, building, floor, room, days, startTime, endTime);
                masteraddClass(currClass);

                ingested++
            }
            
        });
    });

    //console.log("Ingested a total of " + ingested + " classes")
}

module.exports = function() {
    this.ingest = ingest;
}