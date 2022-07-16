var popupLink = document.querySelector('.search');
var popupCloseIcon = document.querySelector('.popup_close');
var popupActive = document.querySelector('.popup');

var unlock = true;

popupLink.addEventListener("click", function (e) {
    popupOpen(popupActive);
    ajaxPost();
    myNode = document.getElementById('lines');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    e.preventDefault();
});

popupCloseIcon.addEventListener("click", function (e) {
    popupClose(popupActive);
    e.preventDefault();
});

function popupOpen(currentPopup) {
    currentPopup.classList.add('open');
}

popupActive.addEventListener("click", function (e) {
    if (!e.target.closest('.popup_content')) {
        popupClose(popupActive);
    }
});

function popupClose(popupActive) {
    if (unlock) {
        popupActive.classList.remove('open');
    }
}

document.querySelector('#arrbut').addEventListener("click", function (e) {
    document.querySelector('#anno').classList.toggle('active');
    e.preventDefault();
});

document.querySelector('#arrbut2').addEventListener("click", function (e) {
    document.querySelector('#anno2').classList.toggle('active');
    e.preventDefault();
});



function timesplit(str) {
    mas = str.split(',');

    for (i = 0; i < mas.length; i++) {
        if (mas[i].length == 4) {
            mas[i] = '0' + mas[i];
        }
    }

    return mas
}

String.prototype.replaceAt = function (index, replacement) {
    if (replacement.length == 1) {
        replacement = '0' + replacement;
    }
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}



function getOptionFrom() {
    key = document.getElementById('from').value;
    document.getElementById('from').value = key.toLowerCase();
    var request = new XMLHttpRequest();
    request.open('POST', "search.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var keys = "key=" + key;
    var ind = 0;
    var limit = 6;
    var limcount = 0;


    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var text = this.responseText;

            myNode = document.getElementById('stantions');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            for (ind = 0; ind < text.length; ind++) {
                var p1 = text.indexOf('{', ind);
                var p2 = text.indexOf('}', ind);
                ind = p2;
                limcount++;

                if (limcount < limit) {

                    name = JSON.parse(text.substring(p1, p2 + 1))["name"];


                    option = document.createElement('option');
                    option.innerHTML = name;
                    document.getElementById('stantions').append(option);
                } else {
                    break;
                }

            }
        }
    }
    request.send(keys);
}

function getOptionTo() {
    key = document.getElementById('to').value;
    document.getElementById('to').value = key.toLowerCase();
    var request = new XMLHttpRequest();
    request.open('POST', "search.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var keys = "key=" + key;
    var ind = 0;
    var limit = 6;
    var limcount = 0;

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var text = this.responseText;

            myNode = document.getElementById('stantions');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            for (ind = 0; ind < text.length; ind++) {
                var p1 = text.indexOf('{', ind);
                var p2 = text.indexOf('}', ind);
                ind = p2;

                limcount++;
                if (limcount < limit) {

                    name = JSON.parse(text.substring(p1, p2 + 1))["name"];


                    option = document.createElement('option');
                    option.innerHTML = name;
                    document.getElementById('stantions').append(option);
                } else {
                    break;
                }
            }
        }
    }
    request.send(keys);
}

var d = new Date;
var curday = d.getDate() + '.' + (d.getMonth() + 1);
var weekday = d.getDay();
var isFree = false;
var isBusy = false;
var freedays = ['01.01', '02.01', '01.05', '02.05', '03.05', '04.05'];
var busydays = ['29.12', '30.12', '31.12', '09.05', '31.05', '01.06', '31.08', '01.09'];

var date = new Date;
var curdate;

if (date.getHours() < 10) {
    curdate = '0' + date.getHours() + ':';

} else {
    curdate = date.getHours() + ':';
}
if (date.getMinutes() < 10) {
    curdate = curdate + '0' + date.getMinutes();

} else {
    curdate = curdate + date.getMinutes();
}

if (d.getDate() < 10) {
    curday = '0' + d.getDate() + '.';

} else {
    curday = d.getDate() + '.';
}
if ((d.getMonth() + 1) < 10) {
    curday = curday + '0' + (d.getMonth() + 1);

} else {
    curday = curday + (d.getMonth() + 1);
}

document.querySelector('#timeinput').value = curdate;
document.querySelector('#dateinput').value = curday;

if ((weekday == 0) || (weekday == 6)) {
    isFree = true;
}
for (i = 0; i < freedays.length; i++) {
    if (curday == freedays[i]) {
        isFree = true;
    }
}
for (i = 0; i < busydays.length; i++) {
    if (curday == busydays[i]) {
        isBusy = true;
    }
}



var nums;
var num;

function ajaxPost() {
    var request = new XMLHttpRequest();
    request.open('POST', "server.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var first = document.getElementById('from').value;
    var second = document.getElementById('to').value;
    curday = document.getElementById('dateinput').value;

    for (i = 0; i < freedays.length; i++) {
        if (curday == freedays[i]) {
            isFree = true;
        }
    }
    
    for (i = 0; i < busydays.length; i++) {
        if (curday == busydays[i]) {
            isBusy = true;
        }
    }

    var params = "first=" + first + "&second=" + second;

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var text = this.responseText;

            var ind = 0;
            num = '';
            nums = [];

            for (ind = 0; ind < text.length; ind++) {
                var p1 = text.indexOf('{', ind);
                var p2 = text.indexOf('}', ind);
                ind = p2;
                num = JSON.parse(text.substring(p1, p2 + 1))["number"];

                nums.push(num);
            }


            nums = nums.filter(function (item, pos) {
                return nums.indexOf(item) != pos;
            });
            nums = nums.filter(function (item, pos) {
                return nums.indexOf(item) == pos;
            });



            if (nums.length == 0) {
                //alert(nums.length);
                document.querySelector('.popup_title').innerHTML = "Ничего не найдено";
            } else {
                document.querySelector('.popup_title').innerHTML = "Результат поиска";
            }


            for (ind = 0; ind < text.length; ind++) {
                var p1 = text.indexOf('{', ind);
                var p2 = text.indexOf('}', ind);

                ind = p2;

                number = JSON.parse(text.substring(p1, p2 + 1))["number"];

                for (i = 0; i < nums.length; i++) {
                    if (number == nums[i]) {



                        div = document.createElement('div');
                        div.className = "line";
                        div.setAttribute('id', number);
                        document.getElementById('lines').append(div);
                        nums[i] = '';



                        trans = document.createElement('img');
                        trans.className = "transport";


                        if (JSON.parse(text.substring(p1, p2 + 1))["type"] == "1") {
                            trans.setAttribute('src', './img/bus.svg');
                        } else if (JSON.parse(text.substring(p1, p2 + 1))["type"] == "2") {
                            trans.setAttribute('src', './img/marsh.svg');

                        } else {
                            trans.setAttribute('src', './img/tram.svg');
                        }
                        document.getElementById(number).append(trans);



                        curnum = document.createElement('div');
                        curnum.className = "num";
                        curnum.innerHTML = number;
                        document.getElementById(number).append(curnum);


                        curdate = document.querySelector('#timeinput').value;


                        batt = document.createElement('img');
                        batt.className = "battery";

                        rushhours = JSON.parse(text.substring(p1, p2 + 1))["rushhours"];
                        rushhours = timesplit(rushhours);
                        if (rushhours == '') {
                            batt.setAttribute('src', './img/green.svg');
                        } else {

                            for (i = 0; i < rushhours.length; i = i + 2) {
                                yel1 = rushhours[i];
                                yel1 = yel1.replaceAt(0, String(parseInt(yel1.substr(0, 2)) - 1));


                                yel2 = rushhours[i + 1];
                                yel2 = yel2.replaceAt(0, String(parseInt(yel2.substr(0, 2)) + 1));


                                if ((curdate > rushhours[i]) && (curdate < rushhours[i + 1])) {
                                    if (isFree) {
                                        batt.setAttribute('src', './img/green.svg');
                                    } else {
                                        batt.setAttribute('src', './img/red.svg');
                                    }
                                } else if ((curdate > yel1) && (curdate < yel2)) {
                                    if (isFree) {
                                        batt.setAttribute('src', './img/green.svg');
                                    } else if (isBusy) {
                                        batt.setAttribute('src', './img/red.svg');
                                    } else {
                                        batt.setAttribute('src', './img/yellow.svg');
                                    }
                                } else {
                                    if (isBusy) {
                                        batt.setAttribute('src', './img/yellow.svg');
                                    } else {
                                        batt.setAttribute('src', './img/green.svg');
                                    }
                                }

                            }
                        }


                        document.getElementById(number).append(batt);



                        block = document.createElement('div');
                        block.className = "timing";
                        block.setAttribute('id', number + 'w');
                        document.getElementById(number).append(block);

                        clock = document.createElement('img');
                        clock.setAttribute('src', './img/clock.svg');
                        document.getElementById(number + 'w').append(clock);



                        time = document.createElement('div');
                        time.className = "time";

                        timetable = JSON.parse(text.substring(p1, p2 + 1))["timetable"];
                        interval = timesplit(timetable)[0];



                        if ((curdate > timesplit(timetable)[1]) && (curdate < timesplit(timetable)[2])) {
                            time.innerHTML = "каждые " + interval + " мин";
                        } else {
                            time.innerHTML = "не ходит";
                            bats = document.querySelectorAll('.battery');
                            bats[bats.length - 1].setAttribute('src', './img/grey.svg');
                        }

                        document.getElementById(number + 'w').append(time);


                        break;

                    }
                }

            }

        }
    }

    request.send(params);
}

$("#timeinput").mask("99:99", {
    placeholder: " "
});
$("#dateinput").mask("99.99", {
    placeholder: " "
});
