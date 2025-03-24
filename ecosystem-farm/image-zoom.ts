let lastClickedPosition = {x: 0, y: 0};

function imageZoom(imgID: string, resultID: string) {
  var img: HTMLImageElement, lens: HTMLDivElement, ghostLens: HTMLDivElement, result: HTMLImageElement, cx: number, cy: number;
  img = document.getElementById(imgID) as HTMLImageElement;
  result = document.getElementById(resultID) as HTMLImageElement;
  /*create lens:*/
  lens = document.createElement("DIV") as HTMLDivElement;
  ghostLens = document.createElement("DIV") as HTMLDivElement;
  lens.setAttribute("class", "img-zoom-lens");
  ghostLens.setAttribute("class", "img-zoom-lens");
  ghostLens.classList.add('red-border');
  /*insert lens:*/
  img.parentElement?.insertBefore(lens, img);
  img.parentElement?.insertBefore(ghostLens, img);
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
  lens.onclick = (e) => {lastClickedPosition = getCursorPos(e); moveLens(e, true, true);};
  lens.onmouseout = (e) => { moveLens(e, true) };
  
  function moveLens(e: MouseEvent | TouchEvent, useLastClickedPosition?: boolean, setGhostLens?: boolean) {
    const whichLens = setGhostLens ? ghostLens : lens;
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = useLastClickedPosition ? lastClickedPosition : getCursorPos(e as MouseEvent);
    /*calculate the position of the lens:*/
    x = pos.x - (whichLens.offsetWidth / 2);
    y = pos.y - (whichLens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - whichLens.offsetWidth) {x = img.width - whichLens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - whichLens.offsetHeight) {y = img.height - whichLens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    whichLens.style.left = x + "px";
    whichLens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  
  function getCursorPos(e: MouseEvent) {
    var a, x = 0, y = 0;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}