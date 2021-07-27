const { exec } = require('child_process');
const os = require('os');
const userInfo = os.userInfo();
const username = userInfo.username;

const htmlDisplay = document.querySelector('.html-display');
const inputFile = document.querySelector('#input-file');
const convertButton = document.querySelector('#convert-btn');

// Event listener for when the convert button is clicked
convertButton.addEventListener('click', () => {
    let input = inputFile.value;
    let inputName = input.slice(0, -4);
    let inputExtension = input.split('.').pop();

    convertTex(inputName).then((result) => {
        // console.log(result);
        let html = result;
        displayHTML(html);
    }).catch((err) => {
        console.error(err);
    });
})


function convertTex(inputName) {
    return new Promise((resolve, reject) => {
        // exec(`pandoc ${inputName}.tex -f latex -t html -s -o ${inputName}.html --mathjax`, (error, stdout, stderr) => {
        exec(`pandoc C:/Users/"${username}"/Desktop/${inputName}.tex -f latex -t html -s ${inputName}.html --mathjax`, (error, stdout, stderr) => {
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

// The function that takes the full converted html and cleans it up and adds to DOM
function displayHTML(html) {
    const regExp = /<body>([\s\S]*)<\/body>/;
    const match = html.match(regExp);
    const output = match[1];

    let outputText = document.createTextNode(output);
    htmlDisplay.appendChild(outputText);
}