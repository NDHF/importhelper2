console.log(
    "THE IMPORT HELPER \n" +
    "By Nicholas Bernhard \n" +
    "\u00A9 2019 \n" +
    "VERSION 2.0 \n" +
    "IN DEVELOPMENT: NOT FOR USE \n" +
    "UPDATES FROM 1.1: \n" +
    "Take two spreadsheets and merges them."
);

document.addEventListener("DOMContentLoaded", function () {

    // QUALITY-OF-LIFE FUNCTIONS START

    function getById(id) {
        return document.getElementById(id);
    }

    function whenClicked(id, functionToRun) {
        return getById(id).addEventListener("click", functionToRun);
    }

    function confirmBeforeRunning() {

        let arrayOfInputs = [
            getById("folderSpreadsheetInput"),
            getById("adminSpreadsheetInput")
        ];

        function inputParser(inputItem, inputIndex) {
            let selectedFile = inputItem.files[0];
            let reader = new FileReader();
            reader.onload = function(event) {
                let fileToText = event.target.result;
                let testSlice = fileToText.slice(0, 9);
                if (testSlice === "\"Order #\"") {
                    fileToText = fileToText.replace(/"/g, "");
                    arrayOfInputs[inputIndex] = fileToText.split("\n");
                    arrayOfInputs[inputIndex] = arrayOfInputs[inputIndex].slice(1, arrayOfInputs[inputIndex].length - 1);
                    function splitEachItem(item, index) {
                        arrayOfInputs[inputIndex][index] = arrayOfInputs[inputIndex][index].split(",");
                    }
                    arrayOfInputs[inputIndex].forEach(splitEachItem);
                } else if (testSlice === "<VFPData>") {
                    arrayOfInputs[inputIndex] = fileToText;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(arrayOfInputs[inputIndex], "text/xml");
                    console.log("XML DATA, HOPEFULLY:");
                    let startingXMLData = xmlDoc.getElementsByTagName("VFPData")[0].children;
                    console.log(startingXMLData);
                    arrayOfInputs[inputIndex] = Array.from(xmlDoc.getElementsByTagName("VFPData")[0].children);
                    let dataFromXML = [];
                    function extractValuesFromXML(item, index) {
                        let xmlItemDataArray = Array.from(startingXMLData[index].children);
                        xmlItemDataArray.forEach(function (item) {
                            dataFromXML.push(item.innerHTML);
                        });
                        arrayOfInputs[inputIndex][index] = dataFromXML;
                        dataFromXML = [];
                    }
                    arrayOfInputs[inputIndex].forEach(extractValuesFromXML);
                }
            };
            reader.readAsText(selectedFile, "UTF-8");
        };

        arrayOfInputs.forEach(inputParser);
        console.log(arrayOfInputs);

//         parser = new DOMParser();
// xmlDoc = parser.parseFromString(text,"text/xml");
    }



    whenClicked("submitButton", confirmBeforeRunning);

});