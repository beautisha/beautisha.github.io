let mas1 = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", 
"Per aspera ad astra", "Clavus clavo pellitur", "Repetitio est mater studiorum",
"Mens sana in corpore sano", "Citius, altius, fortius", "Veni, vidi, vici",
"Si vis pacem, para bellum", "Qui tacet, consentire videtur"];
let mas2 = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", 
"Через тернии к звёздам", "Клин клином вышибают", "Повторенье - мать ученья",
"В здоровом теле здоровый дух", " Быстрее, выше, сильнее", "Пришел, увидел, победил",
"Хочешь мира, готовься к войне", "Молчание - знак согласия"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
let creareBut = document.getElementById("create");
let random = document.getElementById("rand");
let k = 0;
let rand = 0;
creareBut.onclick = function () {
    if (mas1.length > 0) {
        let elem = document.createElement('p');
        if (k % 2 == 1) {
            elem.classList.add("class1")
        }
        else {elem.classList.add("class2")}
        rand = getRandomInt(mas1.length);
        let elem1 = document.createElement('span');
        elem1.textContent = "n=" + k;
        elem1.style.textDecoration = "underline";
        elem.append(elem1);
        let elem2 = document.createElement('span');
        elem2.textContent = ' "' + mas1[rand] + '"';
        elem2.style.fontStyle = "italic";
        elem.append(elem2);
        let elem3 = document.createElement('span');
        elem3.textContent = ' "' + mas2[rand] + '"';
        elem.append(elem3);
        random.append(elem);
        mas1.splice(rand, 1);
        mas2.splice(rand, 1);
    }
    else {alert("Фразы закончились")}
    k++;
}

let perekButton = document.getElementById("perekr");
perekButton.onclick = function () {
    let pars = document.querySelectorAll('#rand p:nth-child(even)');
    for (let par=0; par < pars.length; par++) {
        pars[par].classList.add('per');
    }
}