const { exec } = require('child_process');
const os = require('os');
const userInfo = os.userInfo();
const username = userInfo.username;

const htmlDisplay = document.querySelector('.html-display');

convertTex('test').then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});

function convertTex(inputName) {
    return new Promise((resolve, reject) => {
        // exec(`pandoc ${inputName}.tex -f latex -t html -s -o ${inputName}.html --mathjax`, (error, stdout, stderr) => {
        exec(`pandoc C:/Users/"${username}"/Desktop/${inputName}.tex -f latex -t html -s -o ${inputName}.html --mathjax`, (error, stdout, stderr) => {
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