

function createCountdown(array, index) { //   mm/dd/yyyy
    let dateStr, timeStr, d, m, y, h, min, eventDate
    dateStr = array[index].date
    timeStr = array[index].time
    m = Number(dateStr.substr(0, 2))
    d = Number(dateStr.substr(3, 2))
    y = Number(dateStr.substr(6, 4))
    if (timeStr != "hh:mm") {
        h = Number(timeStr.substr(0, 2))
        min = Number(timeStr.substr(3, 2))
    }
    else { h = 00, min = 00 };

    eventDate = new Date(y, m - 1, d, h, min)
    console.log(eventDate)



    let x = setInterval(function () {
        let now = new Date();
        let distance = eventDate.getTime() - now.getTime();

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        days = days.toLocaleString(undefined, { minimumIntegerDigits: 3 });
        hours = hours.toLocaleString(undefined, { minimumIntegerDigits: 2 });
        minutes = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
        seconds = seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });

        let d = "d "
        let h = "h "
        let m = "m "
        let s = "s "

        document.getElementById(`${index}countdown`).innerText = days + d + hours + h
            + minutes + m + seconds + s;

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(".event").innerText = "LIVE!";
        }

    }, 1000);
}

function createCountdownsList(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!['Title', '', null].includes(arr[i].title)) {
            let description
            $(`<div id="${i}cd-element" class="countdown-element" />`).appendTo(`.countdowns`);
            $(`<p id="${i}title" class="cd-title">${arr[i].title}</p>`).appendTo(`#${i}cd-element`);

            $(`<p id="${i}countdown" class="countdown">000d 00h 00m 00s</p>`).appendTo(`#${i}cd-element`);
            $(`<script>${createCountdown(arr, i)}</script>`).appendTo(`#${i}cd-element`);
            if (!['Description', '', null].includes(arr[i].description)) { description = arr[i].description }
            else { description = '&MediumSpace;' }
            $(`<p id="${i}description" class="cd-description">${description}</p>`).appendTo(`#${i}cd-element`);
        }
        else { continue }
    };
}
