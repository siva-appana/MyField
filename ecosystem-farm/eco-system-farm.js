"use strict";
//@ts-nocheck
const map = document.getElementById('map');
const img = document.getElementById('img');
const farmImage = document.getElementById('farm-image');
const mapCardBody = document.getElementById('map-card-body');
const mapCard = document.getElementById('map-card');
const mapDotContainer = document.getElementById('map-dot-container');
// mapCard.style.width = (farmImage.getBoundingClientRect().width + 50) + "px";
console.log("img.getBoundingClientRect().width + 'px'", farmImage.getBoundingClientRect().width + "px");
//@ts-ignore
function createMapDots(data) {
    const latitudeRange = data.maxLatitude - data.minLatitude;
    const longitudeRange = data.maxLongitude - data.minLongitude;
    let previousLatitudePercentage = Number.MIN_VALUE;
    let previousLongitudePercentage = Number.MIN_VALUE;
    for (let point of data.frames) {
        const div = document.createElement('div');
        div.onclick = () => {
            sliderMove(point.frameNumber);
        };
        const latitudePercentage = Math.abs((data.maxLatitude - point.latitude) / latitudeRange);
        const longitudePercentage = Math.abs((data.maxLongitude - point.longitude) / longitudeRange);
        if (latitudePercentage == previousLatitudePercentage && longitudePercentage == previousLongitudePercentage)
            continue;
        if (point.frameCnt > 1873)
            break;
        div.style.setProperty('right', `${latitudePercentage * 100}%`);
        div.style.setProperty('bottom', `${longitudePercentage * 100}%`);
        div.classList.add('shadow-sm');
        previousLatitudePercentage = latitudePercentage;
        previousLongitudePercentage = longitudePercentage;
        mapDotContainer.appendChild(div);
    }
    // Set map width and height to match the videos
    map.style.width = farmImage.getBoundingClientRect().width + "px";
    // map.style.height = img.getBoundingClientRect().height + "px";
    // map.style.setProperty('background-size', `${img.getBoundingClientRect().width}px ${img.getBoundingClientRect().height}px`);
    // map.style.height = img.getBoundingClientRect().height + "px";
    // mapCardBody.style.height = img.getBoundingClientRect().height + "px";
}
onresize = () => {
    mapDotContainer.replaceChildren();
    createMapDots(data);
    resetImageZoom();
    imageZoom("farm-image", "img");
};
function loadImage() {
    const imageToLoad = new Image();
    imageToLoad.onload = function () {
        farmImage.src = imageToLoad.src;
        function rendered() {
            //Render complete
            console.log("image rendered");
            imageZoom("farm-image", "img-bg");
            imageZoom("farm-image", "img");
        }
        function startRender() {
            //Rendering start
            requestAnimationFrame(rendered);
        }
        function loaded() {
            requestAnimationFrame(startRender);
        }
        requestAnimationFrame(loaded);
    };
    farmImage.style.setProperty("background-image", "url(drone_scan_complete_stitch_vertical_low_res.png)");
    imageToLoad.src = "drone_scan_complete_stitch_vertical.jpg";
}
imageZoom("farm-image", "img-bg");
loadImage();
farmImage.onchange = () => { console.log("hello"); };
// farmImage.onload = () => {console.debug("fully loaded")}
// farmImage.src = "drone_scan_complete_stitch_vertical.png";
