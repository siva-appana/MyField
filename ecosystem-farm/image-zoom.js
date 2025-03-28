"use strict";
let lastClickedPosition = { x: 0, y: 0 };
const lens = document.createElement("DIV");
const ghostLens = document.createElement("DIV");
let imgElement;
let resultElement;
const closeUpCard = document.getElementById('close-up-card');
function imageZoom(imgID, resultID) {
    var _a, _b;
    var cx, cy;
    imgElement = document.getElementById(imgID);
    resultElement = document.getElementById(resultID);
    /*create lens:*/
    lens.setAttribute("class", "img-zoom-lens");
    ghostLens.setAttribute("class", "img-zoom-lens");
    //Find out if width or height is smaller, and make a square based on that
    const imgElementDimension = imgElement.width < imgElement.height ? imgElement.width / 2 : imgElement.height / 2;
    lens.style.width = imgElementDimension + "px";
    lens.style.height = imgElementDimension + "px";
    ghostLens.style.width = imgElementDimension + "px";
    ghostLens.style.height = imgElementDimension + "px";
    ghostLens.classList.add('red-border');
    /*insert lens:*/
    (_a = imgElement.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(lens, imgElement);
    (_b = imgElement.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(ghostLens, imgElement);
    /*calculate the ratio between result DIV and lens:*/
    cx = resultElement.offsetWidth / lens.offsetWidth;
    cy = resultElement.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    resultElement.style.backgroundImage = "url('" + imgElement.src + "')";
    resultElement.style.backgroundSize = (imgElement.width * cx) + "px " + (imgElement.height * cy) + "px";
    // closeUpCard.style.width = (imgElement.width * cx) + "px ";
    //Remove placeholders
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    imgElement.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    imgElement.addEventListener("touchmove", moveLens);
    lens.onclick = (e) => { lastClickedPosition = getCursorPos(e); moveLens(e, true, true); };
    lens.onmouseout = (e) => { moveLens(e, true); };
    console.debug('here');
    function moveLens(e, useLastClickedPosition, setGhostLens) {
        const whichLens = setGhostLens ? ghostLens : lens;
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = useLastClickedPosition ? lastClickedPosition : getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - (whichLens.offsetWidth / 2);
        y = pos.y - (whichLens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > imgElement.width - whichLens.offsetWidth) {
            x = imgElement.width - whichLens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > imgElement.height - whichLens.offsetHeight) {
            y = imgElement.height - whichLens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /*set the position of the lens:*/
        whichLens.style.left = x + "px";
        whichLens.style.top = y + "px";
        /*display what the lens "sees":*/
        resultElement.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        /*get the x and y positions of the image:*/
        a = imgElement.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
function resetImageZoom(imgID, resultID) {
    lens.remove();
    ghostLens.remove();
}
