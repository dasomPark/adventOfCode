const input = `Time:        58     99     64     69
Distance:   478   2232   1019   1071`;

const getNewRecords = (time, distance) => {
    var count = 0;

    for(let holdTime = 0; holdTime <= time; holdTime++) {
        const timeLeft = time - holdTime;
        const speed = holdTime;
        const newDistance = speed * timeLeft;
        if(newDistance > distance) {
            count++;
        }
    }

    return count;
}

const inputArray = input.split(`\n`).map(item => item.replace(/.+:\s+/g, '').replace(/\s+/g, ''));
const time = Number(inputArray[0]);
const distance = Number(inputArray[1]);

console.log(getNewRecords(time, distance))
