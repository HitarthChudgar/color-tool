//checking if the hex input is valid or not
const validHex = (hex) => {
    if(!hex){
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
    if(!validHex(hex)) 
        return;
    const stripHex = hex.replace('#', '');  
    inputColor.style.backgroundColor = "#" + stripHex; //auto adding # to it
})