 // Load the Google APIs client library
function loadClientLibrary() {
	gapi.load('client', initGoogleCalendarAPI);
}

// Initialize Google Calendar API
function initGoogleCalendarAPI() {
	// Get API key and client ID from Google Sign-In
	var auth2 = gapi.auth2.getAuthInstance();
	var userProfile = auth2.currentUser.get().getBasicProfile();
	var apiKey = userProfile.getAuthResponse().id_token; // Use id_token as API key
	var clientId = userProfile.getId(); // Use user ID as client ID

	gapi.client.init({
		apiKey: apiKey,
		discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
		clientId: clientId,
		scope: 'https://www.googleapis.com/auth/calendar.readonly',
	}).then(function () {
		console.log('Google Calendar API initialized');
		// Now you can make API calls
		listUpcomingEvents();
	}).catch(function (error) {
		console.error('Error initializing Google Calendar API:', error);
	});
}

// Function to list upcoming events
function listUpcomingEvents() {
	gapi.client.calendar.events.list({
		'calendarId': 'primary', // Use 'primary' for the user's primary calendar
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'orderBy': 'startTime'
	}).then(function (response) {
		var events = response.result.items;
		console.log('Upcoming events:');
		if (events.length > 0) {
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				var start = event.start.dateTime || event.start.date;
				var summary = event.summary;
				var eventObj = {
					start: start,
					summary: summary
				};
				console.log(eventObj);
			}
		} else {
			console.log('No upcoming events found.');
		}
	}).catch(function (error) {
		console.error('Error listing upcoming events:', error);
	});
}