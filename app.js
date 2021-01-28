//manipulating the slider
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');

//modifying inputColor on the box div dynamically
const hexIn = document.getElementById('hexIn');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('outputColor');
const alteredColorText = document.getElementById('outputColorText')

//toggle
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

//checking if the hex input is valid or not
const validHex = (hex) => {
    if (!hex) {
        return false;
    }
    const stripHex = hex.replace('#', '');
    return stripHex.length === 3 || stripHex.length === 6;
}

hexIn.addEventListener('keyup', () => {
    const hex = hexIn.value; //whatever is inputted by the user
    if (!validHex(hex))
        return;
    const stripHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + stripHex; //auto adding # to it
    reset()
})

//converting hex to rgb
const convertHexToRGB = (hex) => {
    if (!validHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0] +
            strippedHex[1] + strippedHex[1] +
            strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return {
        r,
        g,
        b
    }
}

const convertRGBtoHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

console.log(convertRGBtoHex(255, 255, 255)); //testing

slider.addEventListener('input', () => {
    if (!validHex(hexIn.value)) return;
    sliderText.textContent = `${slider.value}%`;
    const valueAddition =
        toggleBtn.classList.contains('toggled') ?
        -slider.value :
        slider.value; //stays same and positive
    //get the altered hex value
    const alteredHex = alterColor(hexIn.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
})

//make sure it doesn't cross 255
const increaseWithin0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
}

const alterColor = (hex, percentage) => {
    const {
        r,
        g,
        b
    } = convertHexToRGB(hex);
    const amount = Math.floor((percentage / 100) * 255); //preventing decimal
    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount)
    console.log(newR, newG, newB);
    return convertRGBtoHex(newR, newG, newB);
}

console.log(alterColor('000', 10)); //testing the amount reduction

//toggle functionality
toggleBtn.addEventListener('click', () => {
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
})


//reset color after toggle switch

const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`;
    outputColorText.style.backgroundColor = hexIn.value;
    outputColorText.innerText = `New Color: ${hexIn.value}`;
}