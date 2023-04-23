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
                checkFigure(puzzles)
            }
        }
        puzzles[i].ondragstart = function () {
            return false;
        }
    }
}
let dragFlag = true;
let content = document.getElementById('content');

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

function checkRot(el) {
    let item = document.getElementById('head');
    item.style.transform = 'rotate(0deg)';
    return (getDegree(el) == 0);
}

function checkField(content, puzzle) {
    let fieldCoord = content.getBoundingClientRect();
    let puzzleCoord = puzzle.getBoundingClientRect();
    return ((fieldCoord.left <= puzzleCoord.left) && (fieldCoord.right >= puzzleCoord.right) 
    && (fieldCoord.top <= puzzleCoord.top) && (fieldCoord.bottom >= puzzleCoord.bottom));
}

function checkFigure(puzzles) {
    for (let i = 0; i < puzzles.length; i++) {
        if (!(checkField(content, puzzles[i]) && checkRot(puzzles[i]))) {
            return;
        }
    }
    let eye = document.querySelectorAll(".pupil");
    for (let i = 0; i < eye.length; i++) {
        eye[i].style.animation = "an-pupils 1s infinite alternate-reverse";
    }
}