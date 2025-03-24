"use strict";
let lastClickedPosition = { x: 0, y: 0 };
function imageZoom(imgID, resultID) {
    var _a, _b;
    var img, lens, ghostLens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    ghostLens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    ghostLens.setAttribute("class", "img-zoom-lens");
    ghostLens.classList.add('red-border');
    /*insert lens:*/
    (_a = img.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(lens, img);
    (_b = img.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(ghostLens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    lens.onclick = (e) => { lastClickedPosition = getCursorPos(e); moveLens(e, true, true); };
    lens.onmouseout = (e) => { moveLens(e, true); };
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
        if (x > img.width - whichLens.offsetWidth) {
            x = img.width - whichLens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - whichLens.offsetHeight) {
            y = img.height - whichLens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /*set the position of the lens:*/
        whichLens.style.left = x + "px";
        whichLens.style.top = y + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
