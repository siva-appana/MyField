//@ts-nocheck
const map = document.getElementById('map') as HTMLDivElement;
const img = document.getElementById('img') as HTMLImageElement;
const farmImage = document.getElementById('farm-image') as HTMLImageElement;
const mapCardBody = document.getElementById('map-card-body') as HTMLDivElement;
const mapCard = document.getElementById('map-card') as HTMLDivElement;
const mapDotContainer = document.getElementById('map-dot-container') as HTMLDivElement;

// mapCard.style.width = (farmImage.getBoundingClientRect().width + 50) + "px";
console.log("img.getBoundingClientRect().width + 'px'", farmImage.getBoundingClientRect().width + "px");

//@ts-ignore
function createMapDots(data: Data) {
	const latitudeRange = data.maxLatitude - data.minLatitude;
	const longitudeRange = data.maxLongitude - data.minLongitude;
	let previousLatitudePercentage = Number.MIN_VALUE;
	let previousLongitudePercentage = Number.MIN_VALUE;

	for (let point of data.frames) {
		const div = document.createElement('div');
		div.onclick = () => {
			sliderMove(point.frameNumber!);
		};
		const latitudePercentage = Math.abs((data.maxLatitude - point.latitude!)/latitudeRange);
		const longitudePercentage = Math.abs((data.maxLongitude - point.longitude!)/longitudeRange);

		if (latitudePercentage == previousLatitudePercentage && longitudePercentage == previousLongitudePercentage)
			continue;

		if (point.frameCnt > 1873)
			break;
		
		div.style.setProperty('right', `${latitudePercentage * 100}%`);
		div.style.setProperty('bottom', `${longitudePercentage * 100}%`);
		div.classList.add('shadow-sm');
		
		previousLatitudePercentage = latitudePercentage;
		previousLongitudePercentage = longitudePercentage;
		
		mapDotContainer.appendChild(div)
	}

	// Set map width and height to match the videos
	map.style.width = farmImage.getBoundingClientRect().width + "px";
	// map.style.height = img.getBoundingClientRect().height + "px";
	// map.style.setProperty('background-size', `${img.getBoundingClientRect().width}px ${img.getBoundingClientRect().height}px`);
	// map.style.height = img.getBoundingClientRect().height + "px";
	// mapCardBody.style.height = img.getBoundingClientRect().height + "px";
}