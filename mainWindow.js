const {
    exec
} = require('child_process');
const os = require('os');
const userInfo = os.userInfo();
const username = userInfo.username;

const htmlDisplay = document.querySelector('.html-display');
const inputFile = document.querySelector('#input-file');
const convertButton = document.querySelector('#convert-btn');

// Event listener for when the convert button is clicked
convertButton.addEventListener('click', async () => {
    // Take in user's file input and split it into name and extension
    let input = inputFile.value.trim();
    let inputName = input.slice(0, -4);
    let inputExtension = input.split('.').pop();

    // Check for proper extension type
    if (inputExtension == 'tex') {
        await convertTex(inputName).then((result) => {
            // console.log(result);
            let html = result;
            displayHTML(html);
        }).catch((err) => {
            console.error(err);
            alert(err);
        });
    } else {
        alert('Incorrect file extension');
    }
})


function convertTex(inputName) {
    return new Promise((resolve, reject) => {
        // exec(`pandoc ${inputName}.tex -f latex -t html -s -o ${inputName}.html --mathjax`, (error, stdout, stderr) => {
        // exec(`pandoc C:/Users/"${username}"/Desktop/${inputName}.tex -f latex -t html -s -o ${inputName}.html --mathjax`, (error, stdout, stderr) => {
        exec(`pandoc C:/Users/"${username}"/Desktop/${inputName}.tex -f latex -t html --mathjax`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);

                reject(stderr);
            }
            // console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}

// The function that takes the full converted html and adds to DOM
function displayHTML(html) {
    let outputText = document.createTextNode(html);

    // Add to DOM after clearing old html
    if (htmlDisplay.innerHTML != '') {
        htmlDisplay.innerHTML = '';
    }
    htmlDisplay.appendChild(outputText);
}