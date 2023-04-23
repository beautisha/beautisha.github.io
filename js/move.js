let puzzles = document.querySelectorAll('.puzzle');

drag(puzzles);

function drag(puzzles) {
    for (let i = 0; i < puzzles.length; i++) {
        puzzles[i].onmousedown = function (event) {
            let shiftX = event.clientX - puzzles[i].getBoundingClientRect().left;
            let shiftY = event.clientY - puzzles[i].getBoundingClientRect().top;
            dragFlag = true;
            document.onmousemove = function (event) {
                dragFlag = false;
                puzzles[i].style.left = event.pageX - shiftX + 'px';
                puzzles[i].style.top = event.pageY - shiftY + 'px';
            }
            puzzles[i].onmouseup = function () {
                if (dragFlag) {
                    rotate(puzzles[i]);
                }
                puzzles[i].onmouseup = null;
                document.onmousemove = null;
            }
        }
        puzzles[i].ondragstart = function () {
            return false;
        }
    }
}
let dragFlag = true;
function rotate(element) {
    let deg = getDegree(element);
    deg += 90;
    deg = deg==360 ? 0 : deg;
    element.style.transform = 'rotate(' + deg + 'deg)'; 
}

function getDegree(element) {
    let style = window.getComputedStyle(element, null);
    let valueStyle = style.getPropertyValue("transform");
    if (valueStyle == 'none') return 0;
    let values = valueStyle.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    let cos = values[0];
    let sin = values[1];
    let degree = Math.round(Math.asin(sin) * (180 / Math.PI));
    if (cos < 0) {
        let addDegree = 90 - Math.round(Math.asin(sin) * (180 / Math.PI));
        degree = 90 + addDegree;
    }
    if (degree < 0) {
        degree = 360 + degree;
    }
    return degree;
}