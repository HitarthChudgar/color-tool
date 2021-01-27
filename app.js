//checking if the hex input is valid or not
const validHex = (hex) => {
    if (!hex) {
        return false;
    }
    const stripHex = hex.replace('#', '');
    return stripHex.length === 3 || stripHex.length === 6;
}

//modifying inputColor on the box div dynamically
const hexIn = document.getElementById('hexIn');
const inputColor = document.getElementById('inputColor');

hexIn.addEventListener('keyup', () => {
    const hex = hexIn.value; //whatever is inputted by the user
    if (!validHex(hex))
        return;
    const stripHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + stripHex; //auto adding # to it
})

//converting hex to rgb
const convertHexToRGB = (hex) => {
    if (!ValidHex(hex)) return null;

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