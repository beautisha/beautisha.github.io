let form1 = document.querySelector('form');
let input1 = document.querySelector('input');
let page1 = document.querySelector('.page1');
let page2 = document.querySelector('.page2');
let user = {
    name: '',
    points: 0
}

form1.addEventListener('submit', (event) => {
    event.preventDefault();
    let boolFindName = false;
    let userName = input1.value;
    user.name = userName;
    let localStorageSize = localStorage.length;
    if (localStorageSize > 0) {
        for (let i = 0; i < localStorageSize; i++) {
            let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (userName == us.name) {
                boolFindName = true;
                break;
            }
        }
    }
    if (!boolFindName) {
        localStorage.setItem('user' + localStorageSize, JSON.stringify(user));
    }
    page1.classList.toggle('activePage');
    page2.classList.toggle('activePage');
});

let btnIndo = document.querySelector('.btnIndo');
let page3 = document.querySelector('.page3');
let timer;
let timerOutput = document.querySelector('#count1');
let timeCount = 60;
let minutes = 0;
let seconds = 0;
let btnAgain = document.querySelector('.btnAgain');
let page4loose = document.querySelector('.page4loose');

btnIndo.onclick = function () {
    page2.classList.toggle('activePage');
    page3.classList.toggle('activePage');
    timerOutput.textContent = '01:00';
    timeCount = 60;
    timer = setInterval(function () {
        minutes = Math.floor(timeCount / 60);
        seconds = timeCount % 60;
        if (timeCount <= 0) {
            user.points = Number(scoreNumb.textContent);
            let localStorageSize = localStorage.length;
            if (localStorageSize > 0) {
                for (let i = 0; i < localStorageSize; i++) {
                    let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    if ((user.name == us.name) && (user.points > us.points)) {
                        let key = localStorage.key(i);
                        localStorage.removeItem(localStorage.key(i));
                        localStorage.setItem(key, JSON.stringify(user));
                        break;
                    }
                }
            }
            clearInterval(timer);
            page3.classList.toggle('activePage');
            page4loose.classList.toggle('activePage');
        }
        let str = '0'+minutes+':';
        if (seconds >= 10) {
            str += seconds;
        } else {
            str += '0'+seconds;
        }
        timerOutput.innerHTML = str;
        timeCount--;
    }, 1000)
    setFigureType();
}

let scoreNumb = document.querySelector('.scoreNumb');

btnAgain.onclick = function() {
    page4loose.classList.toggle('activePage');
    page2.classList.toggle('activePage');
    scoreNumb.textContent = '0';
}

let btnExit = document.querySelector('.btnExit');
btnExit.onclick = function () {
    user.points = Number(scoreNumb.textContent);
    let localStorageSize = localStorage.length;
    if (localStorageSize > 0) {
        for (let i = 0; i < localStorageSize; i++) {
            let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if ((user.name == us.name) && (user.points > us.points)) {
                let key = localStorage.key(i);
                localStorage.removeItem(localStorage.key(i));
                localStorage.setItem(key, JSON.stringify(user));
                break;
            }
        }
    }
    location.href = 'index.html';
}

let figure1 = document.querySelector('.figure1');
let figure2 = document.querySelector('.figure2');
let figure3 = document.querySelector('.figure3');
let figure4 = document.querySelector('.figure4');

let figures = [figure1, figure2, figure3, figure4];
let figureType = [0, 1, 2, 3];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getRandomInt(max) {
    return Math.round(Math.random() * max);
}

let rightText = document.querySelector('.right');
let wrongText = document.querySelector('.wrong');
let rightVar = getRandomInt(3);

function setFigureType() {
    for (let i = 0; i < figures.length; i++) {
        figures[i].style.display = 'block';
    }
    shuffle(figureType);
    rightText.style.display = 'none';
    wrongText.style.display = 'none';
    for (let i = 0; i < figures.length; i++) {
        if (figureType[i] == 0) {
            figures[i].className = '';
            figures[i].classList.add('square');
            figures[i].textContent = 'Квадрат';
            if (rightVar == 0) {
                figures[i].classList.add('transformFigure');
            }
        }
        if (figureType[i] == 1) {
            figures[i].className = '';
            figures[i].classList.add('rectangle');
            figures[i].textContent = 'Прямоугольник';
            if (rightVar == 1) {
                figures[i].classList.add('transformFigure');
            }
        }
        if (figureType[i] == 2) {
            figures[i].className = '';
            figures[i].classList.add('circle');
            figures[i].textContent = 'Круг';
            if (rightVar == 2) {
                figures[i].classList.add('transformFigure');
            }
        }
        if (figureType[i] == 3) {
            figures[i].className = '';
            figures[i].classList.add('ellipse');
            figures[i].textContent = 'Овал';
            if (rightVar == 3) {
                figures[i].classList.add('transformFigure');
            }
        }
    }
}

let page4 = document.querySelector('.page4');

for (let i = 0; i < figures.length; i++) {
    figures[i].onclick = function () {
        if (figures[i].classList.contains('transformFigure')) {
            rightText.style.display = 'block';
            for (let i = 0; i < figures.length; i++) {
                figures[i].style.display = 'none';
            }
            scoreNumb.textContent = Number(scoreNumb.textContent) + 1;
        } else {
            wrongText.style.display = 'block';
            for (let i = 0; i < figures.length; i++) {
                figures[i].style.display = 'none';
            }
            scoreNumb.textContent = Number(scoreNumb.textContent) - 1;
        }
        if (Number(scoreNumb.textContent) == 10) {
            setTimeout(() => {
                clearInterval(timer);
                page3.classList.toggle('activePage');
                page4.classList.toggle('activePage');
            }, 500)
        }
        rightVar = getRandomInt(3);
        setTimeout(setFigureType, 600);
    }
}
//level2
let page5 = document.querySelector('.page5');
let scoreNumb2 = document.querySelector('.scoreNumb2');
let btnNext = document.querySelector('.btnNext');

let timer2;
let timerOutput2 = document.querySelector('#count2');
let timeCount2 = 60;
let minutes2 = 0;
let seconds2 = 0;
let page6loose = document.querySelector('.page6loose');
let btnAgain2 = document.querySelector('.btnAgain2');

btnNext.onclick = function () {
    page4.classList.toggle('activePage');
    page5.classList.toggle('activePage');
    scoreNumb2.textContent = scoreNumb.textContent;
    timerOutput2.textContent = '01:00';
    timeCount2 = 60;
    timer2 = setInterval(function () {
        minutes2 = Math.floor(timeCount2 / 60);
        seconds2 = timeCount2 % 60;
        if (timeCount2 <= 0) {
            user.points = Number(scoreNumb2.textContent);
            let localStorageSize = localStorage.length;
            if (localStorageSize > 0) {
                for (let i = 0; i < localStorageSize; i++) {
                    let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    if ((user.name == us.name) && (user.points > us.points)) {
                        let key = localStorage.key(i);
                        localStorage.removeItem(localStorage.key(i));
                        localStorage.setItem(key, JSON.stringify(user));
                        break;
                    }
                }
            }
            clearInterval(timer2);
            page5.classList.toggle('activePage');
            page6loose.classList.toggle('activePage');
        }
        let str = '0'+minutes2+':';
        if (seconds2 >= 10) {
            str += seconds2;
        } else {
            str += '0'+seconds2;
        }
        timerOutput2.innerHTML = str;
        timeCount2--;
    }, 1000)
    setFigureType2();
}

btnAgain2.onclick = function() {
    page6loose.classList.toggle('activePage');
    page2.classList.toggle('activePage');
    scoreNumb.textContent = '0';
}

let btnExit2 = document.querySelector('.btnExit2');
btnExit2.onclick = function () {
    user.points = Number(scoreNumb2.textContent);
    let localStorageSize = localStorage.length;
    if (localStorageSize > 0) {
        for (let i = 0; i < localStorageSize; i++) {
            let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if ((user.name == us.name) && (user.points > us.points)) {
                let key = localStorage.key(i);
                localStorage.removeItem(localStorage.key(i));
                localStorage.setItem(key, JSON.stringify(user));
                break;
            }
        }
    }
    location.href = 'index.html';
}

let figure21 = document.querySelector('.figure21');
let figure22 = document.querySelector('.figure22');
let figure23 = document.querySelector('.figure23');
let figure24 = document.querySelector('.figure24');

let figures2 = [figure21, figure22, figure23, figure24];
let figType = [0, 1, 2, 3];
let firstSpan = document.querySelector('.first');
let secondSpan = document.querySelector('.second');
let right2 = document.querySelector('.right2');

let callId;

function setFigureType2() {
    for (let i = 0; i < figures2.length; i++) {
        figures2[i].style.display = 'block';
    }
    callId = setTimeout(setFigureType2, 10000);
    shuffle(figType);
    right2.style.display = 'none';
    for (let i = 0; i < figures2.length; i += 2) {
        if (figType[i] == 0) {
            figures2[i].className = '';
            figures2[i].classList.add('square');
            figures2[i + 1].className = '';
            figures2[i + 1].classList.add('square');
        }
        if (figType[i] == 1) {
            figures2[i].className = '';
            figures2[i].classList.add('rectangle');
            figures2[i + 1].className = '';
            figures2[i + 1].classList.add('rectangle');
        }
        if (figType[i] == 2) {
            figures2[i].className = '';
            figures2[i].classList.add('circle');
            figures2[i + 1].className = '';
            figures2[i + 1].classList.add('circle');
        }
        if (figType[i] == 3) {
            figures2[i].className = '';
            figures2[i].classList.add('ellipse');
            figures2[i + 1].className = '';
            figures2[i + 1].classList.add('ellipse');
        }
    }
    if (figures2[0].classList.contains('square')) {
        firstSpan.textContent = 'квадраты';
    }
    if (figures2[0].classList.contains('rectangle')) {
        firstSpan.textContent = 'прямоугольники';
    }
    if (figures2[0].classList.contains('circle')) {
        firstSpan.textContent = 'круги';
    }
    if (figures2[0].classList.contains('ellipse')) {
        firstSpan.textContent = 'овалы';
    }
    if (figures2[2].classList.contains('square')) {
        secondSpan.textContent = 'квадраты';
    }
    if (figures2[2].classList.contains('rectangle')) {
        secondSpan.textContent = 'прямоугольники';
    }
    if (figures2[2].classList.contains('circle')) {
        secondSpan.textContent = 'круги';
    }
    if (figures2[2].classList.contains('ellipse')) {
        secondSpan.textContent = 'овалы';
    }
    shuffle(figType);
    figures2[figType[0]].style.position = 'absolute';
    figures2[figType[0]].style.top = '40vh';
    figures2[figType[0]].style.left = '30vw';
    figures2[figType[0]].style.right = '65vw';
    figures2[figType[0]].style.bottom = '55vh';
    figures2[figType[1]].style.position = 'absolute';
    figures2[figType[1]].style.top = '60vh';
    figures2[figType[1]].style.right = '35vw';
    figures2[figType[1]].style.left = '60vw';
    figures2[figType[1]].style.bottom = '35vh';
    figures2[figType[2]].style.position = 'absolute';
    figures2[figType[2]].style.top = '40vh';
    figures2[figType[2]].style.right = '35vw';
    figures2[figType[2]].style.left = '60vw';
    figures2[figType[2]].style.bottom = '55vh';
    figures2[figType[3]].style.position = 'absolute';
    figures2[figType[3]].style.top = '60vh';
    figures2[figType[3]].style.left = '30vw';
    figures2[figType[3]].style.right = '65vw';
    figures2[figType[3]].style.bottom = '35vh';
}

drag(figures2);

function drag(figs) {
    for (let i = 0; i < figs.length; i++) {
        figs[i].onmousedown = function (event) {
            figs[i].style.position = 'absolute';
            let shiftX = event.clientX - figs[i].getBoundingClientRect().left;
            let shiftY = event.clientY - figs[i].getBoundingClientRect().top;
            document.onmousemove = function (event) {
                figs[i].style.left = event.pageX - shiftX + 'px';
                figs[i].style.top = event.pageY - shiftY + 'px';
            }
            figs[i].onmouseup = function () {
                figs[i].onmouseup = null;
                document.onmousemove = null;
                checkGame(figs);
            }
        }
        figs[i].ondragstart = function () {
            return false;
        }
    }
}

let container1 = document.querySelector('.container1');
let container2 = document.querySelector('.container2');
let page6 = document.querySelector('.page6');

function checkGame(figs) {
    let fig1 = figs[0].getBoundingClientRect();
    let fig2 = figs[1].getBoundingClientRect();
    let fig3 = figs[2].getBoundingClientRect();
    let fig4 = figs[3].getBoundingClientRect();
    let cont1 = container1.getBoundingClientRect();
    let cont2 = container2.getBoundingClientRect();
    if ((fig1.right < cont1.right) && (fig1.top > cont1.top) && (fig1.left > cont1.left) && (fig1.bottom < cont1.bottom) &&
        (fig2.right < cont1.right) && (fig2.top > cont1.top) && (fig2.left > cont1.left) && (fig2.bottom < cont1.bottom) &&
        (fig3.right < cont2.right) && (fig3.top > cont2.top) && (fig3.left > cont2.left) && (fig3.bottom < cont2.bottom) &&
        (fig4.right < cont2.right) && (fig4.top > cont2.top) && (fig4.left > cont2.left) && (fig4.bottom < cont2.bottom)
    ) {
        clearTimeout(callId);
        for (let i = 0; i < figs.length; i++) {
            figs[i].style.display = 'none';
        }
        right2.style.display = 'block';
        scoreNumb2.textContent = Number(scoreNumb2.textContent) + 1;
        if (Number(scoreNumb2.textContent) == 15) {
            setTimeout(() => {
                clearInterval(timer2);
                page5.classList.toggle('activePage');
                page6.classList.toggle('activePage');
            }, 600)
        }
        setTimeout(setFigureType2, 800);
    }
}
//level3
let btnNext1 = document.querySelector('.btnNext1');
let page7 = document.querySelector('.page7');
let scoreNumb3 = document.querySelector('.scoreNumb3');

btnNext1.onclick = function () {
    page6.classList.toggle('activePage');
    page7.classList.toggle('activePage');
    scoreNumb3.textContent = scoreNumb2.textContent;
}

let btnExit3 = document.querySelector('.btnExit3');
btnExit3.onclick = function () {
    user.points = Number(scoreNumb3.textContent);
    let localStorageSize = localStorage.length;
    if (localStorageSize > 0) {
        for (let i = 0; i < localStorageSize; i++) {
            let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if ((user.name == us.name) && (user.points > us.points)) {
                let key = localStorage.key(i);
                localStorage.removeItem(localStorage.key(i));
                localStorage.setItem(key, JSON.stringify(user));
                break;
            }
        }
    }
    location.href = 'index.html';
}