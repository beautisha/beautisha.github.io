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
    && (fieldCoord.top - 30 <= puzzleCoord.top) && (fieldCoord.bottom >= puzzleCoord.bottom));
}

function checkFigure(puzzles) {
    let eye1, eye2, head, ear1, ear2, part6 = null;
    for (let i = 0; i < puzzles.length; i++) {
        if (!(checkField(content, puzzles[i]) && checkRot(puzzles[i]))) {
            return;
        }
        
        switch (puzzles[i].className) {
            case "head puzzle":
                head = puzzles[i].getBoundingClientRect();
                break;
            case "eye1 eye puzzle":
                eye1 = puzzles[i].getBoundingClientRect();
                if (!((eye1.top > head.top) && (eye1.left > head.left) && (eye1.bottom < head.bottom) && (eye1.right < head.right))) {
                    return;
                }
                break;
            case "eye2 eye puzzle":
                eye2 = puzzles[i].getBoundingClientRect();
                if (!((eye2.top > head.top) && (eye2.left > head.left) && (eye2.bottom < head.bottom) && (eye2.right < head.right))) {
                    return;
                }
                if (!((eye1.top + 10 >= eye2.top) && (eye1.top - 10 <= eye2.top))) {
                    return;
                }
                break;
            case "part6 puzzle":
                part6 = puzzles[i].getBoundingClientRect();
                if (!(part6.top > head.top && part6.bottom < head.bottom && part6.left > head.left && part6.right < head.right)) {
                    return;
                }
                if (!(part6.top > eye1.bottom && part6.top > eye2.bottom)) {
                    return;
                }
                break;
            case "ear1 ear4 puzzle":
                ear1 = puzzles[i].getBoundingClientRect();
                if (!(ear1.bottom - 80 > head.top && ear1.left+120 < head.right && ear1.top + 100 < head.top && ear1.right > head.right)) {
                    return;
                }
                break;
            case "ear2 ear4 puzzle":
                ear2 = puzzles[i].getBoundingClientRect();
                if (!(ear2.bottom - 80 > head.top && ear2.right-120 > head.left && ear2.top + 100 < head.top && ear2.left < head.left)) {
                    return;
                }
                break;
            default:
                break;
        }
    }
    let eye = document.querySelectorAll(".pupil");
    for (let i = 0; i < eye.length; i++) {
        eye[i].style.animation = "an-pupils 1s infinite alternate-reverse";
    }
}