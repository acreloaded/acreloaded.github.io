jQuery(function($){
	// timeago
	$.timeago.settings.refreshMillis = 5000;
	$.timeago.settings.strings = {
		prefixAgo: null,
		prefixFromNow: null,
		suffixAgo: "ago",
		suffixFromNow: "from now",
		seconds: "%d seconds",
		minute: "a minute",
		minutes: "%d minutes",
		hour: "an hour",
		hours: "%d hours",
		day: "a day",
		days: "%d days",
		month: "a month",
		months: "%d months",
		year: "a year",
		years: "%d years",
		wordSeparator: " ",
		numbers: []
	};
	// Invoke timeago
	$(".timeago").timeago();
	// Check latest version
	$.getJSON("https://api.github.com/repos/acreloaded/acr/releases?callback=?", function(data) {
		var latest_release = data.data[0].name;
		if(latest_release.substr(0, 8) == "Release ")
			latest_release = latest_release.substr(8);
		$('#latest-version').text('ACR ' + latest_release);
	});
});