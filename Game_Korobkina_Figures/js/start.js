let btnRate = document.querySelector('.btnRate');
let pageRate = document.querySelector('.pageRate');
let pageStart = document.querySelector('.pageStart');
let divRate = document.querySelector('.divRate');

btnRate.onclick = function() {
    pageStart.classList.toggle('activePage');
    pageRate.classList.toggle('activePage');
    divRate.innerHTML = '';
    let localStorageSize = localStorage.length;
    let massUsers = [];
    if (localStorageSize > 0) {
        for (let i = 0; i < localStorageSize; i++) {
            let us = JSON.parse(localStorage.getItem(localStorage.key(i)));
            massUsers.push(us);
        }
        massUsers.sort((prev, next) => prev.points - next.points).reverse();
        for (let i = 0; i<massUsers.length; i++) {
            let pName = document.createElement('p');
            pName.textContent = massUsers[i].name;
            divRate.append(pName);
            let pPoints = document.createElement('p');
            pPoints.textContent = massUsers[i].points;
            divRate.append(pPoints);
        }
    }
}

let btnBack = document.querySelector('.btnBack');

btnBack.onclick = function() {
    pageRate.classList.toggle('activePage');
    pageStart.classList.toggle('activePage');
}

