const inputslider = document.querySelector("[data_lengthslider]");
const lengthdisplay=document.querySelector("[data_lengthnumber]");
const passworddisplay=document.querySelector("[data_passworddisplay]");
const copymsg=document.querySelector("[data_copymsg]");
const copybtn=document.querySelector("[data_copy]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
const indicator=document.querySelector("[data_indicator]");
const generatebtn=document.querySelector(".generate_button");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
// it will give list of all checkbox 
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password=" ";
let passwordlength=10;
let checkcount=1;
handleslider();
// set circle colour to grey and change the colour to green for strength of the password
setindicator("#ccc");

function handleslider(){
    inputslider.value = passwordlength;
    
    
    lengthdisplay.innerText =   passwordlength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ((passwordlength-min)*100/(max-min))+ "% 100%";
}

function setindicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getrandinteger(min,max){
return Math.floor(Math.random()*(max-min))+min;
}

function generaterandnumber(){
    return getrandinteger(0,9);
}
function generatelowercase(){
    return String.fromCharCode(getrandinteger(97,123));
    // String.fromCharCode(): This is a built-in JavaScript method that takes a Unicode code point (an integer) as an argument and returns the corresponding string character.
}
function generateuppercase(){
    return String.fromCharCode(getrandinteger(65,91));  
}
function generatesymbol(){
    const randnum = getrandinteger(0,symbol.length);
    return symbol.charAt(randnum);
//     charAt is a method that returns the character at a specified index in the string.
//
}
function calcstrength(){
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassymbol = false;
    if(uppercase.checked) hasupper = true;
//     This line checks if the lowercaseCheck checkbox is checked.
// If it is, the hasLower variable is set to true.
    if(lowercase.checked) haslower = true;
    if(symbols.checked) hassymbol = true;
    if(numbers.checked) hasnum = true;

    if((hasupper && haslower) && (hasnum || hassymbol) && passwordlength >= 8){
        setindicator("#0f0");
    } else if ((haslower || hasupper) && (hasnum || hassymbol) && passwordlength>=6){
        setindicator("#ffo");
    }else {
        setindicator("#f00");
    }
}

async function copycontent(){
    try{
        navigator.clipboard.writeText(passworddisplay.value);
       const y= copymsg.innerText = "COPIED";
       console.log(y);
       
    }
    catch(e){
        copymsg.innerText= "FAILED";
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active")
    }, 2000);
}
// This JavaScript code defines an asynchronous function called copycontent. The purpose of this function is to copy the text from an HTML element with the id passworddisplay to the user's clipboard.

// navigator.clipboard.writeText(passworddisplay.value); it returns a promise that resolves when the text has been sucessfully copied to cliclboard . There may be error during execuation so we use try and catch block 

// setTimeout used because after 2s the copy msg was removed

// we use async because the function wait and check if the copied was successful done or not if yes then print "COPIED" else "FAILED"

function shufflePassword(passwordArray){
    // fishers yates method 

    // The Fisher-Yates shuffle is an algorithm for generating a random permutation of a finite sequence—in plain terms, the algorithm shuffles the elements of an array in a random order.

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = passwordArray[i];
        passwordArray[i] = passwordArray[j];
        passwordArray[j] = temp;
      }
    let str = "";
    passwordArray.forEach((el) => (str += el));
    return str;
} 
// The code uses the Fisher-Yates shuffle algorithm to randomly rearrange the elements of the passwordArray. This algorithm is an efficient and unbiased method for shuffling an array.

// Here's how it works:

// The loop starts from the last element of the array (i = passwordArray.length - 1) and moves towards the first element (i > 0).
// In each iteration, a random index j is generated between 0 and i (inclusive) using Math.floor(Math.random() * (i + 1)).
// The elements at indices i and j are swapped using a temporary variable temp.
// This process is repeated until the entire array has been shuffled.
// Converting the array to a string

// After shuffling the array, the code uses the forEach method to iterate over the elements of the array and concatenate them into a single string str.

// The forEach callback function takes each element el of the array and appends it to the str using the += operator.
// The resulting string str is returned as the output of the function.



inputslider.addEventListener('input',function(e){
    passwordlength = e.target.value;
    // e.target.value accesses the current value of the slider
    handleslider();
    // this function is called because to assign the value to the numberdisplay the current value of e i.e where you have slided the slider.
})

copybtn.addEventListener('click',() => {
    if(passworddisplay.value)
        copycontent();
    // it says if the passworddisplay value is non empty them call the copycontent function and this function helps to copy the msg to clipboard 
    //                 OR
    // if(password.length>0)
    //     copycontent();
})

// GENERATE PASSWORD

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox) =>{
        if(checkbox.checked)
            checkcount++;
    });

    if(passwordlength < checkcount){
        passwordlength = checkcount;
        handleslider();
    }
    }

//     checkcount = 0;: Initializes or resets the checkcount variable to 0 before counting the checked checkboxes.

// allcheckbox.forEach((checkbox) => {...});: Loops through all the checkboxes in the allcheckbox list (which is likely a collection of checkbox elements).

// if (checkbox.checked): Checks if the current checkbox is checked.

// checkcount++: Increments the checkcount by 1 each time a checkbox is found to be checked.
generatebtn.addEventListener('click',() =>{
    if(passwordlength < checkcount){
        passwordlength = checkcount;
        handleslider();
          // this means when you put password length = 1 but all  - 4 check box is checked then it will show 4 password length

    }
    //   new password
    //   remove old password
    password = "";

    // put the password values as mentioned in checked box 

        // if(uppercase.checked){
        //     password += generateuppercase();
        // }
        // if(lowercase.checked){
        //     password += generatelowercase();
        // }
        // if(numbers.checked){
        //     password += generatenumber();
        // }
        // if(symbol.checked){
        //     password += generateSymbol();
        // }
       
        let funcArr = [];
        if(uppercase.checked)
            funcArr.push(generateuppercase);
        if(lowercase.checked)
            funcArr.push(generatelowercase);
        if(numbers.checked)
            funcArr.push(generaterandnumber);
        if(symbols.checked)
            funcArr.push(generatesymbol);
        // compulsory addition
        // this means which checkbox is clicked should be their
        for(let i=0;i<funcArr.length;i++){
            password += funcArr[i]();
        }
        // remaining addation
        for (let i=0; i<passwordlength-funcArr.length;i++){
            // getting rest values
            let randindex = getrandinteger(0,funcArr.length)
            password+=funcArr[randindex]();
        }
        // shuffle password
        password = shufflePassword(Array.from(password));
        // sending as array array.from...

        // show in box
        passworddisplay.value = password;

        // claculate strength
        calcstrength();

}); 


