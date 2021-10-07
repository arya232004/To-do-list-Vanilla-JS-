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

document.getElementById('heading').innerHTML = getdate();

document.getElementById("submit").addEventListener("click", lists)
let taskarr = [];
let done = 0;
let rem_task = 0;
let digits = 0;

function lists() {

    var task = document.getElementById("num1");

    taskarr.push(task);
    var ul = document.getElementById("fields");
    var li = document.createElement("p");
    var ip = document.createElement("input");
    var divitem = document.createElement("div");
    var total = document.getElementById("total");
    var donedom = document.getElementById("done");
    var remaining = document.getElementById("remaining");
    var span = document.createElement("span");
    var icon = document.createElement("i");

    for (i = 0; i < taskarr.length; i++) {
        console.log(taskarr);
        divitem.setAttribute("class", "item");
        divitem.setAttribute("id", "removexdxdxd" + i);
        ip.setAttribute("type", "checkbox");
        divitem.appendChild(ip);
        ip.setAttribute("class", i);
        li.appendChild(document.createTextNode(taskarr[i].value));
        divitem.appendChild(li);
        ul.appendChild(divitem);
        icon.setAttribute("class", "fas fa-times");
        span.classList.add("closed");
        span.appendChild(icon);
        divitem.appendChild(span);
        task.value = "";
        task.setAttribute("placeholder", 'Enter task');
    }
    digits++;
    total.innerHTML = digits;
    icon.addEventListener("click", function() {
        if (divitem.parentNode.removeChild(divitem)) {
            setTimeout(function() {
                divitem.innerHTML += `.list-container {
                    transition: all 0.6s ease-out;
                }`;
            }, 0);
            digits--;
            total.innerHTML = digits;

            if (ip.checked == true) {
                done--;
                donedom.innerHTML = done;
            } else if (ip.checked == false) {
                rem_task--;
                remaining.innerHTML = rem_task;
            }
        }
    })

    rem_task++;
    remaining.innerHTML = rem_task;
    ip.addEventListener("change", function() {

        if (ip.checked == true) {
            done++;
            rem_task--;
            remaining.innerHTML = rem_task;
            donedom.innerHTML = done;
            console.log("incrementd " + done);
            console.log("Remainig " + rem_task);
            li.classList.add("checked");
        } else if (ip.checked == false) {
            done--;
            rem_task++;
            remaining.innerHTML = rem_task;
            donedom.innerHTML = done;
            console.log("Decremented " + done);
            console.log("Remainig " + rem_task);
            li.classList.remove("checked");
        }
    })
}

document.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        lists();
    }
})

/* document.getElementById("submit").addEventListener("click", function() {
    document.getElementById("change").classList.add("dark-mode");
}); */