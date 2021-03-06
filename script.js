function getdate() {
    let d = new Date();
    let day = d.getDate();
    let dayname = d.getDay();
    let month = d.getMonth();
    let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthname = monthArr[month];
    let daynamexd = dayArr[dayname];
    return daynamexd + ", " + monthname + " " + day;
}

document.getElementById('heading').textContent = getdate();

let done = 0;
let rem_task = 0;
let digits = 0;
i = 0;
let taskarr = [];
var statusofitems = [];
var arrivaltimearr = [];
var deadlinetime = [];

document.getElementById("submit").addEventListener("click", lists);
document.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        lists();
    }
})
let time = new Date();
let hour = time.getHours();
console.log(hour);

if (hour >= 5 && hour < 12) {
    swal({
        title: "Good Morning!",
        text: "Have a great day ahead",
        icon: "success",
        button: "Okay",
    });
} else if (hour >= 12 && hour < 17) {
    swal({
        title: "Good Afternoon!",
        text: "Let's Go",
        icon: "success",
        button: "Okay",
    });
} else {
    swal({
        title: "Good Evening!",
        text: "End the day by completing all your task",
        icon: "success",
        button: "Okay",
    });
}
var donedom = document.getElementById("done");

function lists() {
    let rem_count = 0;
    var task = document.getElementById("num1");
    var testing = document.getElementById("num1").value;
    var ul;
    var li;
    var ip;
    var divitem;
    var total;
    var remaining;
    var span;
    var tasktime = new Date();
    var timericon;
    var icon;

    if (testing !== "") {
        taskarr.push(testing);
        ul = document.getElementById("fields");
        li = document.createElement("p");
        ip = document.createElement("input");
        divitem = document.createElement("div");
        total = document.getElementById("total");
        remaining = document.getElementById("remaining");
        span = document.createElement("span");
        icon = document.createElement("i");
        timericon = document.createElement("i");

        for (i; i < taskarr.length; i++) {
            divitem.classList.add("item");
            divitem.classList.add(i);
            divitem.setAttribute("id", "key");
            divitem.setAttribute("name", "key" + i);
            ip.setAttribute("type", "checkbox");
            ip.setAttribute("id", "unchecked" + i);
            divitem.appendChild(ip);
            ip.setAttribute("class", i);
            li.textContent = taskarr[i];
            divitem.appendChild(li);
            ul.appendChild(divitem);
            icon.setAttribute("class", "fas fa-times");
            span.classList.add("closed");
            span.appendChild(icon);
            divitem.appendChild(span);
            timericon.setAttribute("class", "far fa-clock");
            timericon.classList.add("timer");
            divitem.appendChild(timericon);
            divitem.setAttribute("arrivaltime", tasktime.getTime());
            task.value = "";
            task.setAttribute("placeholder", 'Enter task');
            console.log(taskarr[i]);
        }

        statusofitems.push(Boolean(false));
        console.log("Arrival time array at index " + i);
        arrivaltimearr.push(tasktime.getTime());
        console.log(arrivaltimearr);
        deadlinetime.push('NULL');
        console.log("Deadline array: " + deadlinetime);

        localStorage.setItem("arrivaltask", JSON.stringify(arrivaltimearr));
        localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));

        console.log("Checking if false added " + statusofitems);
        console.log(taskarr);
        localStorage.setItem("alltask", JSON.stringify(taskarr));
        console.log(document.getElementsByClassName("item"));
        digits = document.getElementsByClassName("item").length;
        total.innerHTML = digits
        donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
        rem_count = digits - donedom.innerHTML;
        remaining.textContent = rem_count;

        icon.addEventListener("click", function removeelemnt() {
            var removekey = this.parentElement.parentElement;
            var removeint = parseInt(removekey.className.slice(5, 6));
            taskarr.splice(removeint, 1);
            statusofitems.splice(removeint, 1);

            arrivaltimearr.splice(removeint, 1);
            deadlinetime.splice(removeint, 1);
            console.log(deadlinetime);

            console.log(removekey);
            console.log(removeint);
            removekey.remove();
            total.innerHTML = document.getElementsByClassName("item").length;
            donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
            rem_count = total.innerHTML - donedom.innerHTML;
            remaining.textContent = rem_count;
            testingfornow = Number(this.parentElement.parentElement.classList[1]);
            console.log(divitem.classList[1]);
            console.log("span :" + this.parentElement);
            let a = document.getElementsByClassName("item");

            console.log("index of deleted element :" + removeint);
            if (!(removeint == a.length)) {
                for (i = removeint; i < a.length; i++) {
                    console.log(a[i].classList[1]);
                    a[i].classList.add(i);
                    a[i].classList.remove(i + 1);
                    console.log(a[i].classList[1]);
                    total.innerHTML = document.getElementsByClassName("item").length;
                    donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                    rem_count = total.innerHTML - donedom.innerHTML;
                    remaining.textContent = rem_count;
                }
            }
            localStorage.setItem("check", JSON.stringify(statusofitems));
            localStorage.setItem("alltask", JSON.stringify(taskarr));

            localStorage.setItem("arrivaltask", JSON.stringify(arrivaltimearr));
            localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));
        })
        timericon.addEventListener("click", function() {
            var input = parseInt(prompt("Enter the time in Minutes at what you want to complete the task"));
            tasktime.setMinutes(new Date().getMinutes() + input);
            this.parentElement.setAttribute("deadline", tasktime.getTime());
            deadlinetime[this.parentElement.classList[1]] = tasktime.getTime();
            localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));
            console.log(tasktime.getTime());
            setInterval(function() {
                var taskobjects = document.getElementsByClassName("item");
                for (i = 0; i < taskobjects.length; i++) {
                    if (taskobjects[i].hasAttribute("deadline")) {
                        var deadline = taskobjects[i].getAttribute("deadline");
                        if (deadline < new Date().getTime() && taskobjects[i].children[0].checked == false) {
                            taskobjects[i].style.backgroundColor = "#488B95";
                        } else if (taskobjects[i].children[0].checked == true) {
                            taskobjects[i].style.backgroundColor = "white";
                        } else {
                            taskobjects[i].style.backgroundColor = "white";
                        }
                    }
                }
            }, 1000);
        });

        ip.addEventListener("change", function checkelement() {
            var getclass = this.parentElement.className.slice(5, 6);
            console.log("List inside ip.addEvent: " + getclass);
            if (this.checked == true) {
                total.innerHTML = document.getElementsByClassName("item").length;
                donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                rem_count = total.innerHTML - donedom.innerHTML;
                remaining.textContent = rem_count;
                this.setAttribute("id", "checked" + i);
                li.classList.add("checked");

            } else if (this.checked == false) {
                total.innerHTML = document.getElementsByClassName("item").length;
                donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                rem_count = total.innerHTML - donedom.innerHTML;
                remaining.textContent = rem_count;
                console.log("List inside ip.addEvent list (false): " + statusofitems);
                statusofitems[getclass] = ip.checked.toString();
                this.setAttribute("id", "unchecked" + i);
                li.classList.remove("checked");
            }
            console.log("List inside ip.addEvent list (true): " + statusofitems);
            statusofitems[getclass] = this.checked;
            console.log("Lists: " + statusofitems);
            localStorage.setItem("check", JSON.stringify(statusofitems));
            var interval = setInterval(function() {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                if (checkboxes && document.getElementById("remaining").innerHTML == 0) {
                    confetiii();
                    clearInterval(interval);
                }

            }, 1000);
            interval;
        });
    } else {
        swal({
            title: "Please enter task!",
            text: "Task cannot be empty",
            icon: "warning",
            button: "Okay",
        });
    }
}

function doconload() {
    let rem_count = 0;
    var loading = JSON.parse(localStorage.getItem("alltask"));
    var taskstatus = JSON.parse(localStorage.getItem("check"));
    var arrivaltask = JSON.parse(localStorage.getItem("arrivaltask"));
    var deadline = JSON.parse(localStorage.getItem("deadlineoftask"));
    for (i = 0; i < loading.length; i++) {
        taskarr[i] = loading[i];
    }
    for (i = 0; i < taskstatus.length; i++) {
        statusofitems.push(taskstatus[i]);
    }
    for (i = 0; i < arrivaltask.length; i++) {
        arrivaltimearr[i] = arrivaltask[i];
    }
    for (i = 0; i < deadline.length; i++) {
        deadlinetime.push(deadline[i]);
    }
    console.log("Task array onload: " + taskarr);
    console.log("Status of items onload: " + statusofitems);
    console.log("Arrival time array onload: " + arrivaltimearr);
    console.log("Deadline array onload: " + deadlinetime);

    var divitem;
    var total = document.getElementById("total");
    var donedom = document.getElementById("done");
    var remaining = document.getElementById("remaining");
    for (i = 0; i < taskarr.length; i++) {
        console.log(taskarr[i]);
        var ul = document.getElementById("fields");
        var li = document.createElement("p");
        var ip = document.createElement("input");
        divitem = document.createElement("div");
        var span = document.createElement("span");
        var icon = document.createElement("i");
        var tasktime = new Date();
        var timericon = document.createElement("i");
        divitem.classList.add("item");
        divitem.classList.add(i);
        divitem.setAttribute("id", "key");
        divitem.setAttribute("name", "key" + i);
        ip.setAttribute("type", "checkbox");
        ip.checked = Boolean(statusofitems[i]);
        ip.setAttribute("class", i);
        divitem.appendChild(ip);
        li.textContent = taskarr[i];
        divitem.appendChild(li);
        ul.appendChild(divitem);
        icon.setAttribute("class", "fas fa-times");
        span.classList.add("closed");
        span.appendChild(icon);
        timericon.setAttribute("class", "far fa-clock");
        timericon.classList.add("timer");
        divitem.appendChild(timericon);
        divitem.appendChild(span);
        divitem.setAttribute("deadline", deadlinetime[i]);

        divitem.setAttribute("arrivaltime", arrivaltimearr[i]);

        if (divitem.getAttribute("deadline") == undefined) {
            alert("No deadline");
            divitem.setAttribute("deadline", "0");
        } else {
            setInterval(function() {
                var taskobjects = document.getElementsByClassName("item");
                for (i = 0; i < taskobjects.length; i++) {
                    if (taskobjects[i].hasAttribute("deadline")) {
                        var deadline = taskobjects[i].getAttribute("deadline");
                        if (deadline < new Date().getTime() && taskobjects[i].children[0].checked == false) {
                            taskobjects[i].style.backgroundColor = "#488B95";
                        } else if (taskobjects[i].children[0].checked == true) {
                            taskobjects[i].style.backgroundColor = "white";
                        } else {
                            taskobjects[i].style.backgroundColor = "white";
                        }
                    }
                }
            }, 1000);
        }
        arrivaltimearr[i] = (divitem.getAttribute("arrivaltime"));
        deadlinetime[i] = (divitem.getAttribute("deadline"));
        console.log(arrivaltimearr);
        localStorage.setItem("arrivaltask", JSON.stringify(arrivaltimearr));
        localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));

        setInterval(function() {
            total.innerHTML = document.getElementsByClassName("item").length;
            donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
            rem_count = total.innerHTML - donedom.innerHTML;
            remaining.textContent = rem_count;
        }, 100);

        icon.addEventListener("click", function removeelemnt() {
            total.innerHTML = document.getElementsByClassName("item").length;
            donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
            rem_count = total.innerHTML - donedom.innerHTML;
            remaining.textContent = rem_count;
            var removekey = this.parentElement.parentElement;
            var removeint = parseInt(removekey.className.slice(5, 6));
            this.parentElement.parentElement.remove();
            taskarr.splice(removeint, 1);
            statusofitems.splice(removeint, 1);
            arrivaltimearr.splice(removeint, 1);
            deadlinetime.splice(removeint, 1);
            console.log(taskarr);
            console.log(removekey);
            let a = document.getElementsByClassName("item");


            console.log("index of deleted element :" + removeint);
            if (!(removeint == a.length)) {
                for (i = removeint; i < a.length; i++) {
                    console.log(a[i].classList[1]);
                    a[i].classList.add(i);
                    a[i].classList.remove(i + 1);
                    console.log(a[i].classList[1]);
                    total.innerHTML = document.getElementsByClassName("item").length;
                    donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                    rem_count = total.innerHTML - donedom.innerHTML;
                    remaining.textContent = rem_count;
                }
            }
            localStorage.setItem("check", JSON.stringify(statusofitems));
            localStorage.setItem("alltask", JSON.stringify(taskarr));

            localStorage.setItem("arrivaltask", JSON.stringify(arrivaltimearr));
            localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));
        });

        timericon.addEventListener("click", function() {
            var input = parseInt(prompt("Enter the time in Minutes at what you want to complete the task"));
            tasktime.setMinutes(new Date().getMinutes() + input);
            this.parentElement.setAttribute("deadline", tasktime.getTime());
            deadlinetime[this.parentElement.classList[1]] = tasktime.getTime();
            console.log(deadlinetime);
            setInterval(function() {
                var taskobjects = document.getElementsByClassName("item");
                for (i = 0; i < taskobjects.length; i++) {
                    if (taskobjects[i].hasAttribute("deadline")) {
                        var deadline = taskobjects[i].getAttribute("deadline");
                        if (deadline < new Date().getTime() && taskobjects[i].children[0].checked == false) {
                            taskobjects[i].style.backgroundColor = "#488B95";
                        } else if (taskobjects[i].children[0].checked == true) {
                            taskobjects[i].style.backgroundColor = "white";
                        } else {
                            taskobjects[i].style.backgroundColor = "white";
                        }
                    }
                }
            }, 1000);
            localStorage.setItem("deadlineoftask", JSON.stringify(deadlinetime));
        });

        ip.addEventListener("click", function checkelement() {
            var getclass = this.parentElement.className.slice(5, 6);
            console.log(this.checked);
            console.log(getclass);
            if (this.checked == true) {
                total.innerHTML = document.getElementsByClassName("item").length;
                donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                rem_count = total.innerHTML - donedom.innerHTML;
                remaining.textContent = rem_count;
                console.log("List inside ip.addEvent onload (true): " + statusofitems);
                this.setAttribute("id", "checked" + i);
                li.classList.add("checked");

            } else if (this.checked == false) {
                total.innerHTML = document.getElementsByClassName("item").length;
                donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
                rem_count = total.innerHTML - donedom.innerHTML;
                remaining.textContent = rem_count;
                console.log("List inside ip.addEvent onload (false): " + statusofitems);
                this.setAttribute("id", "unchecked" + i);
                li.classList.remove("checked");

            }
            console.log("onload:" + statusofitems);
            statusofitems[getclass] = this.checked;
            localStorage.setItem("check", JSON.stringify(statusofitems));
            donedom.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;

            var interval = setInterval(function() {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                if (checkboxes && document.getElementById("remaining").innerHTML == 0) {
                    confetiii();
                    clearInterval(interval);
                }

            }, 1000);
            interval;
        });
    }
}
document.addEventListener("DOMContentLoaded", doconload);

function confetiii() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

var interval = setInterval(function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes && document.getElementById("remaining").innerHTML == 0 && document.querySelectorAll('input[type="checkbox"]').length > 0) {
        confetiii();
        clearInterval(interval);
    }

}, 1000);
interval;

var transparency = true;
document.getElementById("menu").addEventListener("click", function() {
    if (transparency === true) {
        document.getElementById("player").style.transition = "all 1s";
        document.getElementById("player").style.visibility = "visible";
        transparency = false
    } else if (transparency === false) {
        document.getElementById("player").style.transition = "all 1s";
        document.getElementById("player").style.visibility = "hidden";
        transparency = true;
    }
})

const data = [{
    artist: 'Shawn Mendes',
    songname: 'Mercy',
    songimg: 'data:image/jpeg;base64,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',
    song: 'musics/Shawn-Mendes-Mercy (mp3cut.net).mp3',
    backgroundcolor: '#20bf55',
    backgroundimage: 'linear-gradient(315deg, #20bf55 0%, #01baef 74%)',
}, {
    artist: 'lil nas x',
    songname: 'Thats what i want',
    songimg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYGMzJlwcrijWaDEAX3pwnFkbx1OFWUtJJg&usqp=CAU',
    song: 'musics/Lil_Nas_X_-_Thats_What_I_Want.mp3',
    backgroundcolor: '#eec0c6',
    backgroundimage: 'linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)',
}, {
    artist: 'Kid laroi & Justin bieber',
    songname: 'Stay',
    songimg: 'data:image/jpeg;base64,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',
    song: 'musics/Stay_320(PagalWorld) (mp3cut (mp3cut.net) (1).mp3',
    backgroundcolor: '#63a4ff',
    backgroundimage: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)',

}, {
    artist: 'Ed Sheeran',
    songname: 'Shivers',
    songimg: 'data:image/jpeg;base64,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',
    song: 'musics/Ed Sheeran - Shivers [Official] (mp3cut.net).mp3',
    backgroundcolor: '#f7b42c',
    backgroundimage: 'linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)',
}, {
    artist: 'Taylor Swift',
    songname: 'All to well',
    songimg: 'data:image/jpeg;base64,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',
    song: 'musics/All Too Well - Taylor Swift (10 Minute Version)(AllDjsMashup (mp3cut.net).mp3',
    backgroundcolor: '#acabb0',
    backgroundimage: 'linear-gradient(315deg, #acabb0 0%, #e01c34 74%)',
}, {
    artist: 'The weekend & Ariana Grande',
    songname: 'Save your tears(Remix)',
    songimg: 'data:image/jpeg;base64,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',
    song: 'musics/The_Weeknd_Ft_Ariana_Grande_-_Save_Your_Tears_Remix_ (mp3cut.net).mp3',
    backgroundcolor: '#f5f5f1',
    backgroundimage: 'linear-gradient(315deg, #f5f5f1 0%, #e50914 74%)',
}, ];


function fetch() {

    let player
    let dynamic
    let dynamicimg
    let dynamicsongname
    let dynamicartistname
    let dynamicpeoplediv
    var dynamicplay
    let dynamicrevers;
    var dynamicaudio;
    var i;
    let dynamicsource;
    var domsong;

    for (i = 0; i < data.length; i++) {

        player = document.getElementById("player");
        dynamic = document.createElement("div");
        dynamicimg = document.createElement("img");
        dynamicsongname = document.createElement("p");
        dynamicartistname = document.createElement("p");
        dynamicpeoplediv = document.createElement("div");
        dynamicplay = document.createElement("i");
        dynamicrevers = document.createElement("i");
        dynamicsource = document.createElement("source");
        dynamicaudio = document.createElement("audio");
        let audioplaying = false;
        var songitems = document.getElementById("player");

        dynamicimg.setAttribute("src", data[i].songimg);
        dynamicimg.classList.add("imgmani");
        dynamic.appendChild(dynamicimg);

        dynamicsongname.appendChild(document.createTextNode(data[i].songname));
        dynamic.appendChild(dynamicsongname);
        songitems.appendChild(dynamic);

        dynamicartistname.appendChild(document.createTextNode(data[i].artist));
        dynamic.appendChild(dynamicartistname);
        songitems.appendChild(dynamic);

        dynamicpeoplediv.appendChild(dynamicsongname);
        dynamicpeoplediv.appendChild(dynamicartistname);

        dynamic.appendChild(dynamicpeoplediv);
        songitems.appendChild(dynamic);
        dynamicpeoplediv.style.display = 'inline-block';
        dynamicsongname.style.display = 'block';
        dynamicsongname.classList.add("songname");
        dynamicartistname.classList.add("artistname");
        dynamicartistname.style.display = 'block';

        dynamicplay.classList.add('fas', 'fa-play');
        dynamicplay.setAttribute("id", "playing");
        dynamicplay.classList.add("playing");
        dynamicrevers.classList.add('fas', 'fa-reply');
        dynamicrevers.classList.add("reverse");

        dynamicplay.classList.add("event");
        dynamicaudio.classList.add("uefa")

        dynamicsource.setAttribute("src", data[i].song);
        dynamicaudio.appendChild(dynamicsource);
        dynamicplay.appendChild(dynamicaudio);

        dynamic.appendChild(dynamicrevers);
        dynamic.appendChild(dynamicplay);
        dynamic.style.backgroundColor = data[i].backgroundcolor;
        dynamic.style.backgroundImage = data[i].backgroundimage;

        player.appendChild(dynamic);

        dynamicplay.addEventListener("click", function() {
            domsong = this.firstChild;
            console.log(domsong);
            if (audioplaying === true) {
                domsong.pause();
                this.classList.remove('fas', 'fa-pause');
                this.classList.add('fas', 'fa-play');
            } else {
                domsong.play();
                this.classList.remove('fas', 'fa-play');
                this.classList.add('fas', 'fa-pause');
            }
            domsong.onplaying = function() {
                audioplaying = true;
            };
            domsong.onpause = function() {
                audioplaying = false;
            };
        })
        dynamicrevers.addEventListener("click", function() {
            if (audioplaying == false) {
                swal({
                    title: "Please Play the song first",
                    text: "No song found",
                    icon: "warning",
                    button: "Okay",
                });
            }
            domsong.currentTime = 0;
        })
    }
}
document.addEventListener("DOMContentLoaded", fetch);


var imagemai = document.getElementById("climate");
var tempreature = document.getElementById("temp");
var description = document.getElementById("decr");
var humidity = document.getElementById("humidity");
var feelslike = document.getElementById("Feellike");

function weather() {
    var lat;
    var long;
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat, long);
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long);
        oReq.send();
        oReq.addEventListener("readystatechange", function retrive() {
            const curr = (JSON.parse(this.responseText));
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                if (imagemai.src = "undefined") {
                    setInterval(1, retrive);
                }
                imagemai.setAttribute("src", curr.weather[0].icon);
                tempreature.innerHTML = Math.round(curr.main.temp) + "??C";
                description.innerHTML = curr.weather[0].description;
                humidity.innerHTML = curr.main.humidity + "%";
                feelslike.innerHTML = Math.round(curr.main.feels_like) + "??C";
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", weather);