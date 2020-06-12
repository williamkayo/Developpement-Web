function getLocation(){

}
window.onload = getLocation;
if (Modernizr.geolocation ) {
	navigator.geolocation.getCurrentPosition (geoSuccess, geoError);
}
function geoSuccess (positionInfo) {
	document.getElementById("longitude").innerHTML = positionInfo.coords.longitude;
	document.getElementById("latitude").innerHTML = positionInfo.coords.latitude;
	document.getElementById("precision").innerHTML = positionInfo.coords.accuracy;
	document.getElementById("altitude").innerHTML = positionInfo.coords.altitude;
	document.getElementById("precisionAltitude").innerHTML = positionInfo.coords.altitudeAccuracy;
	document.getElementById("cap").innerHTML = positionInfo.coords.heading;
	document.getElementById("vitesse").innerHTML = positionInfo.coords.speed;
	var postESIREM = {
        latitude: 47.3121519,
        longitude: 5.0039326
    };
	document.getElementById("distance").innerHTML = calculDistance(positionInfo.coords, postESIREM)+" km";
}

function geoError (positionError) {
	if (errorInfo.code == 1)
		alert("L'utilisateur ne souhaite pas partager sa position");
	else if (errorInfo.code == 2)
		alert("Impossible de determiner une position");
	else if (errorInfo.code == 3)
		alert("Delai de recherche de position trop long");
}

function calculDistance (startCoords, destCoords) {
	var startLatRads = degreesEnRadians (startCoords.latitude);
	var startLongRads = degreesEnRadians (startCoords.longitude);
	var destLatRads = degreesEnRadians (destCoords.latitude);
	var destLongRads = degreesEnRadians (destCoords.longitude);

	var Radius = 6371; // rayon de la Terre en km
	var distance = Math.acos(Math.sin(startLatRads) * Math
		.sin(destLatRads) + Math.cos(startLatRads) * Math
		.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;

}

function degreesEnRadians (degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}
