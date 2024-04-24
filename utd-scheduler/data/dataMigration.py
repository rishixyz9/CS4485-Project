import json
import datetime

def convert_time_format(time_interval):
    # Split the time interval into start and end times
    start_time, end_time = time_interval.split(' - ')
    
    # Convert start time to the desired format
    start_time_obj = datetime.datetime.strptime(start_time.strip(), "%I:%M%p")
    formatted_start_time = datetime.datetime.strftime(start_time_obj, "%I:%M %p").lstrip('0')
    
    # Convert end time to the desired format
    end_time_obj = datetime.datetime.strptime(end_time.strip(), "%I:%M%p")
    formatted_end_time = datetime.datetime.strftime(end_time_obj, "%I:%M %p").lstrip('0')
    
    # Return the new time interval
    return f"{formatted_start_time} - {formatted_end_time}"

def abbreviate_days(days):
    # Mapping of weekday names to their abbreviations
    day_abbreviations = {
        'Monday': 'M',
        'Tuesday': 'T',
        'Wednesday': 'W',
        'Thursday': 'Th',
        'Friday': 'F',
        'Saturday': 'S',
        'Sunday': 'Su'
    }

    # Split the input string by commas to handle multiple days
    day_list = days.split(', ')
    
    # Create a string of abbreviations by looking up each day
    abbreviated_days = ''.join(day_abbreviations[day] for day in day_list)
    
    return abbreviated_days

# Open the JSON file
with open("UGCS-class-data-2024.json") as file:
    data = json.load(file)

objs = []

# Iterate over each entry in the JSON data
for entry in data["report_data"]:
    # Extract the required fields

    if 'pm' not in entry["times_12h"] and 'am' not in entry["times_12h"]:
        continue

    name = entry["title"]
    course = f"{entry["course_number"]}.{entry["section"]}"
    time = entry["times_12h"]
    days = entry["days"]
    professor = entry["instructors"]
    location = entry["location"].replace("_", " ")

    # Create an object with the extracted data
    obj = {
        "name": name.strip(),
        "course": course.strip(),
        "time": convert_time_format(time).strip(),
        "days": abbreviate_days(days.strip()),
        "professor": professor.strip(),
        "location": location.strip(),
    }

    objs.append(obj)

json.dump(objs, open("class_data.json", "w"), indent=4)
    # Print the object (optional)



