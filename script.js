const showSheetBtn = document.querySelector(".show-sheet");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetContent = document.querySelector(".content");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const dragIcon = document.querySelector(".drag-icon");


let isDrag = false, startY, startHeight;

const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    updateSheetHeight(50);
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show")
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`
    bottomSheet.classList.toggle("fullscreen", height === 100)
}

const dragStart = (e) => {
    console.log(e)
    isDrag = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}
const dragging = (e) => {
    if (!isDrag) return;
    const delta = startY - e.pageY || e.touches?.[0].pageY;
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

const dragStop = () => {
    isDrag = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);

    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
// for touch
document.addEventListener("touchend", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);

sheetOverlay.addEventListener("click", hideBottomSheet);
showSheetBtn.addEventListener("click", showBottomSheet);

