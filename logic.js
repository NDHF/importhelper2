console.log(
    "MOM'S LITTLE HELPER \n" +
    "By Nicholas Bernhard \n" +
    "\u00A9 2020 \n" +
    "VERSION 2.0 \n" +
    "IN DEVELOPMENT: NOT FOR USE \n" +
    "UPDATES FROM 1.4: \n" +
    " * The program takes the bizsync spreadsheet and merges it with a Magento spreadsheet. \n" +
    " * "
);

document.addEventListener("DOMContentLoaded", function () {

    // QUALITY-OF-LIFE FUNCTIONS START

    function getById(id) {
        return document.getElementById(id);
    }

    function whenClicked(id, functionToRun) {
        return getById(id).addEventListener("click", functionToRun);
    }

    function makeANode(element, elementContent, idOfElementToAppendTo, elementID, otherFunctionToRun) {
        let newElement = document.createElement(element);
        newElement.id = elementID;
        let newElementContent = document.createTextNode(elementContent);
        let elementToAppendTo = getById(idOfElementToAppendTo);
        newElement.appendChild(newElementContent);
        elementToAppendTo.appendChild(newElement);
        otherFunctionToRun;
    }

    function toggleClassForID(id, class1, class2) {
        let byID = getById(id);
        if (byID.classList.contains(class1)) {
            byID.classList.remove(class1);
            byID.classList.add(class2);
        } else if (byID.classList.contains(class2)) {
            byID.classList.remove(class2);
            byID.classList.add(class1);
        }
    }

    let arrayOfFileInputs = [
        getById("folderFileInput"),
        getById("adminFileInput")
    ];

    // QUALITY-OF-LIFE FUNCTIONS END

    function masterParsingLogic() {

        let arrayOfInputs = [
            getById("folderSpreadsheetInput").value,
            getById("adminSpreadsheetInput").value
        ];
        let finalArray = [];
        let duplicateCheckArray = [];

        function generateTable(array) {
            let propertiesForTable = [{
                    name: "orderNumber",
                    heading: "ORDER #"
                },
                {
                    name: "billingName",
                    heading: "BILLING NAME"
                },
                {
                    name: "shippingName",
                    heading: "SHIPPING NAME"
                },
                {
                    name: "lastName",
                    heading: "LAST NAME"
                },
                {
                    name: "firstName",
                    heading: "FIRST NAME"
                },
                {
                    name: "company",
                    heading: "COMPANY"
                },
                {
                    name: "address",
                    heading: "ADDRESS"
                },
                {
                    name: "city",
                    heading: "CITY"
                },
                {
                    name: "state",
                    heading: "STATE"
                },
                {
                    name: "orderTotal",
                    heading: "ORDER TOTAL"
                },
                {
                    name: "shippingCost",
                    heading: "SHIPPING COST"
                },
                {
                    name: "shipVia",
                    heading: "SHIPPING METHOD"
                },
                {
                    name: "fraudRiskString",
                    heading: "FRAUD RISK SCORE"
                },
                {
                    name: "ipAddress",
                    heading: "IP ADDRESS"
                },
                {
                    name: "alertArray",
                    heading: "ALERTS"
                }
            ];
            let firstItemOfFinalArray = finalArray[0];

            function appendTH(propertiesForTableItem) {
                if (firstItemOfFinalArray[propertiesForTableItem.name] !== undefined) {
                    makeANode("TH", propertiesForTableItem.heading, "tableHeaderRow");
                }
            }
            propertiesForTable.forEach(appendTH);

            function appendRows(finalArrayItem, index) {
                makeANode("TR", "", "resultsTable", ("tableRow" + (index + 1)));

                function makeTableRowContent(propertiesForTableItem) {
                    if (firstItemOfFinalArray[propertiesForTableItem.name] !== undefined) {
                        if (propertiesForTableItem.name === "alertArray") {
                            makeANode("TD", "", ("tableRow" + (index + 1)), ("alertArray" + (index + 1)));

                            function buildAlertList(alertArrayItem) {
                                makeANode("LI", alertArrayItem, ("alertUL" + (index + 1)));
                            }
                            makeANode("UL", "", ("alertArray" + (index + 1)), ("alertUL" + (index + 1)));
                            finalArrayItem.alertArray.forEach(buildAlertList);
                        } else {
                            makeANode("TD", finalArrayItem[propertiesForTableItem.name], ("tableRow" + (index + 1)));
                        }
                    }
                    if (finalArrayItem.alertActive === true) {
                        if (getById("tableRow" + (index + 1)).classList.contains("alert") === false) {
                            getById("tableRow" + (index + 1)).classList.add("alert");
                        }
                    }
                    if (finalArrayItem.riskyButIPMatches === true) {
                        if (getById("tableRow" + (index + 1)).classList.contains("alert") === true) {
                            getById("tableRow" + (index + 1)).classList.remove("alert");
                            getById("tableRow" + (index + 1)).classList.add("greenAlert");
                        }
                    }
                    if (finalArrayItem.nameAlreadyExists === true) {
                        if (getById("tableRow" + (index + 1)).classList.contains("alert") === true) {
                            getById("tableRow" + (index + 1)).classList.remove("alert");
                            getById("tableRow" + (index + 1)).classList.add("purpleAlert");
                        } else {
                            getById("tableRow" + (index + 1)).classList.add("purpleAlert");
                        }
                    }
                }
                propertiesForTable.forEach(makeTableRowContent);
            }
            finalArray.forEach(appendRows);

            function displayNumberOfOrders() {
                let randomMessagesArray = [
                    "Gentlemen, start your engines.",
                    "Let's do this.",
                    "Just like old times...",
                    "Let's get dangerous.",
                    "Let's get into character.",
                    "Little hand says it's time to rock and roll.",
                    "It's time to d-d-d-d-d-duel!",
                    "It's on now...",
                    "It would seem your hour has... come again..."
                ];
                let numberOfResults = (getById("resultsTable").children.length - 1);
                let randomMessage = randomMessagesArray[Math.floor(Math.random() * randomMessagesArray.length)];
                alert("Now working with " + numberOfResults + " orders. " + randomMessage);
            }
            displayNumberOfOrders();
        };

        function cleanAndEvaluateObjects(finalArrayItem, finalArrayIndex) {
            function cleanUpObject() {
                if (finalArrayItem.orderTotal !== undefined) {
                    let noDollarSign = finalArrayItem.orderTotal.slice(1);
                    let noCommas = noDollarSign.replace(/,/g, "");
                    finalArrayItem.orderTotal = parseFloat(noCommas);
                }
                if (finalArrayItem.shippingCost !== undefined) {
                    finalArrayItem.shippingCost = parseFloat(finalArrayItem.shippingCost);
                }

                function parseFraudRiskScore() {
                    let fraudRiskScore = finalArrayItem.fraudRiskString;
                    let firstGreaterThan = fraudRiskScore.indexOf(">");
                    fraudRiskScore = fraudRiskScore.slice(firstGreaterThan + 1);
                    fraudRiskScore = fraudRiskScore.replace("</span>", "");
                    if (fraudRiskScore === "") {
                        fraudRiskScore = "0";
                    }
                    fraudRiskScore = parseInt(fraudRiskScore);
                    finalArrayItem.fraudRiskString = fraudRiskScore;
                }
                if (finalArrayItem.fraudRiskString !== undefined) {
                    parseFraudRiskScore();
                }
            }

            function evaluateObject() {
                function activateAlertStatus() {
                    if (finalArrayItem.alertActive !== true) {
                        finalArrayItem.alertActive = true;
                    }
                }

                function checkIfNameAlreadyExists() {
                    if (finalArrayIndex > 0) {
                        let finalArrayItemName = "Jack Example";
                        if (finalArrayItem.shippingName !== undefined) {
                            finalArrayItemName = finalArrayItem.shippingName;
                        } else {
                            finalArrayItemName = finalArrayItem.firstName + " " + finalArrayItem.lastName;
                        }
                        if (duplicateCheckArray.includes(finalArrayItemName)) {
                            finalArrayItem.nameAlreadyExists = true;
                            finalArrayItem.alertArray.push("An earlier order with " +
                                "the name ***" + finalArrayItemName +
                                "*** exists. " + "Check to see if these orders " +
                                "can be combined.");
                        } else {
                            finalArrayItem.nameAlreadyExists = false;
                        }
                        duplicateCheckArray.push(finalArrayItemName);
                    }
                }

                function checkForHighRiskOrder() {
                    if (finalArrayItem.fraudRiskString >= specificValues.highRiskThreshold) {
                        finalArrayItem.highRiskOrder = true;
                        finalArrayItem.alertArray.push("High fraud risk.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.highRiskOrder = false;
                    }
                }

                function checkForSignatureRequired() {
                    if (finalArrayItem.orderTotal >= 200) {
                        finalArrayItem.signatureRequired = true;
                        finalArrayItem.alertArray.push("Signature may be required. Invesitgate further.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.signatureRequired = false;
                    }
                }

                function checkIfInsuranceRequired() {
                    if (finalArrayItem.orderTotal >= 500) {
                        finalArrayItem.insuranceRequired = true;
                        finalArrayItem.alertArray.push("Insurance may be required. Investigate further.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.insuranceRequired = false;
                    }
                }

                function checkForHighValueOrder() {
                    if (finalArrayItem.orderTotal >= specificValues.highValueOrderThreshold) {
                        finalArrayItem.highValueOrder = true;
                        finalArrayItem.alertArray.push("High-value order.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.highValueOrder = false;
                    }
                }
                
                function checkForHighRiskANDHighValue() {
                    if ((finalArrayItem.highValueOrder === true) &&
                    (finalArrayItem.highRiskOrder === true)) {
                        finalArrayItem.highRiskANDHighValue = true;
                        let highRiskANDHighValueMessage = "DANGER: This order meets or exceeds the threshold for " +
                        "a high-risk order AND a high-value order. Please check the order in Magento " +
                        "to see if the billing address and shipping adress match, otherwise you may not be protected."; 
                        finalArrayItem.alertArray.push(highRiskANDHighValueMessage);
                    }
                }

                function validateIPAddress() {
                    let ourIPAddress = specificValues.companyIPAddress;
                    let noIPAddress = "";
                    let ipMatches1 = (finalArrayItem.ipAddress === ourIPAddress);
                    let ipMatches2 = (finalArrayItem.ipAddress === noIPAddress);
                    let ipMatchConfirmed = (ipMatches1 || ipMatches2);
                    if ((finalArrayItem.ipAddress !== undefined) && ipMatchConfirmed) {
                        finalArrayItem.ipMatch = true;
                    } else {
                        finalArrayItem.ipMatch = false;
                    }
                }

                function checkForHighValueAndIPMatch() {
                    let orderIsHighValue = (finalArrayItem.highValueOrder === true);
                    let orderIPMatches = (finalArrayItem.ipMatch === true);
                    let orderIsHighRisk = (finalArrayItem.highRiskOrder === true);
                    let riskyOrderButMadeByUs = ((orderIsHighValue || orderIsHighRisk) && orderIPMatches);
                    if (riskyOrderButMadeByUs) {
                        finalArrayItem.riskyButIPMatches = true;
                        finalArrayItem.alertArray.push("This order is considered risky, but was made by an employee.");
                    } else {
                        finalArrayItem.riskyButIPMatches = false;
                    }
                }

                function checkForOneInPhoneNumber() {
                    let firstDigitOfPhoneNumber = finalArrayItem.phoneNumber.charAt(0);
                    let firstDigitIsOne = (firstDigitOfPhoneNumber === "1");
                    if (firstDigitIsOne) {
                        finalArrayItem.alertArray.push("WARNING: First digit of phone number is '1'. " +
                            "Check Admin or MOM spreadsheet for correct phone number.");
                        activateAlertStatus();
                    }
                }

                function evaluateShipVia() {
                    function checkForPOBox() {
                        let lowerCaseAddress = finalArrayItem.address.toLowerCase();
                        let addressIsProbablyPOBox = (lowerCaseAddress.includes("box"));
                        let shipViaIsUSPS = ((finalArrayItem.shipVia === "PM") || (finalArrayItem.shipVia === "FC"));
                        let shipViaIsNOTUSPS = (!shipViaIsUSPS);
                        if (addressIsProbablyPOBox && shipViaIsNOTUSPS) {
                            finalArrayItem.alertArray.push("You will probably need to change shipping method to United States Postal Service.");
                            activateAlertStatus();
                        }
                    }

                    function checkForCommercialAddress() {
                        let probablyCommercialAddress = (finalArrayItem.company !== "");
                        let shipViaIsUPR = (finalArrayItem.shipVia === "UPR");
                        if (probablyCommercialAddress && shipViaIsUPR) {
                            finalArrayItem.alertArray.push("Possible commercial address. This order's shipping method might need to be updated to UPC.");
                            activateAlertStatus();
                        }
                    }

                    function checkForPossibleExcessShipping() {
                        let oneDayZone = specificValues.oneDayZoneArray;
                        let shipIsSAV = (finalArrayItem.shipVia === "SAV");
                        let shipIsUPN = (finalArrayItem.shipVia === "UPN");
                        let overnightShipping = (shipIsSAV || shipIsUPN);
                        let twoDayAir = (finalArrayItem.shipVia === "U2R");
                        let threeDayAir = (finalArrayItem.shipVia === "U3R");
                        let twoOrThreeDayShipping = (twoDayAir || threeDayAir);
                        let oneTwoOrThreeDayShipping = (twoOrThreeDayShipping || overnightShipping);

                        function oneDayZoneCheck(oneDayState) {
                            if (oneTwoOrThreeDayShipping && (finalArrayItem.state === oneDayState)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push("Expedited shipping. Address might be inside one-day zone.");
                                activateAlertStatus();
                            }
                        }
                        let twoDayZone = oneDayZone.concat(specificValues.twoDayZoneArray);

                        function twoDayZoneCheck(twoDayState) {
                            if (twoOrThreeDayShipping && (finalArrayItem.state === twoDayState)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push("Expedited shipping. Address might be inside two-day zone.");
                                activateAlertStatus();
                            }
                        }

                        let outsideStates = ["HI", "AK", "PR", "GU", "AS", "FM", "MH", "MP", "PW", "VI"];

                        function upsOutsideLower48Check() {
                            if (outsideStates.includes(finalArrayItem.state)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push("Order is UPS, outside of lower 48 states. I suggest you update shipping to FC or PM");
                                activateAlertStatus();
                            }
                        }

                        let wholeUS = twoDayZone.concat(specificValues.restOfContiguousUS, outsideStates);
                        let orderIsInUS = (wholeUS.includes(finalArrayItem.state));
                        let orderIsNotInUS = (!orderIsInUS);

                        function checkForInternationalOrder() {
                            if (orderIsNotInUS) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push("This is likely an international order. I suggest you update shipping to MIP. " +
                                    "IN ADDITION, check phone number in MOM for a '1' at the beginning.");
                                activateAlertStatus();
                            }
                        }
                        oneDayZone.forEach(oneDayZoneCheck);
                        twoDayZone.forEach(twoDayZoneCheck);
                        upsOutsideLower48Check();
                        checkForInternationalOrder();
                    }
                    checkForPOBox();
                    checkForCommercialAddress();
                    checkForPossibleExcessShipping();
                }

                function checkForLabor() {
                    if (finalArrayItem.labor === true) {
                        finalArrayItem.alertArray.push("This order includes AT LEAST one labor.");
                        activateAlertStatus();
                    }
                }

                function checkForSpecialPackingRequirement() {
                    if (finalArrayItem.specialPackingRequired === true) {
                        finalArrayItem.alertArray.push("This order will require special packing. " +
                            "Additional boxes may be required, or item might have shipping method restrictions.");
                    }
                }

                function checkForSpecialOrder() {
                    if (finalArrayItem.specialOrder === true) {
                        finalArrayItem.alertArray.push("This order contains a special order. Please review order in admin and copy over to MOM instructions.");
                        activateAlertStatus();
                    }
                }

                function runChecks() {
                    checkIfNameAlreadyExists()
                    checkForHighRiskOrder();
                    checkForSignatureRequired();
                    checkIfInsuranceRequired();
                    checkForHighValueOrder();
                    checkForHighRiskANDHighValue();
                    validateIPAddress();
                    checkForHighValueAndIPMatch();
                    checkForSpecialPackingRequirement();
                    if (finalArrayItem.shipVia !== undefined) {
                        evaluateShipVia();
                    }
                    if (finalArrayItem.labor !== undefined) {
                        checkForLabor();
                    }
                    if (finalArrayItem.specialOrder !== undefined) {
                        checkForSpecialOrder();
                    }
                    if (finalArrayItem.phoneNumber !== undefined) {
                        checkForOneInPhoneNumber();
                    }
                }
                runChecks();
            }
            cleanUpObject();
            evaluateObject();
        }

        function mergeArrays() {
            function coreMergeLogic() {
                function loopThroughAdminArray(adminArrayItem) {
                    function loopThroughFolderArray(folderArrayItem) {
                        let matchDetected = (adminArrayItem.orderNumber === folderArrayItem.orderNumber);
                        if (matchDetected) {
                            folderArrayItem.orderTotal = adminArrayItem.orderTotal;
                            folderArrayItem.fraudRiskString = adminArrayItem.fraudRiskString;
                            folderArrayItem.ipAddress = adminArrayItem.ipAddress;
                            finalArray.push(folderArrayItem);
                        }
                    }
                    arrayOfInputs[0].forEach(loopThroughFolderArray)
                }
                arrayOfInputs[1].forEach(loopThroughAdminArray);
            }
            let firstArrayIsEmpty = (arrayOfInputs[0] === "");
            let secondArrayIsEmpty = (arrayOfInputs[1] === "");
            if (firstArrayIsEmpty && !secondArrayIsEmpty) {
                finalArray = arrayOfInputs[1];
            } else if (!firstArrayIsEmpty && secondArrayIsEmpty) {
                finalArray = arrayOfInputs[0].reverse();
            } else if (firstArrayIsEmpty && secondArrayIsEmpty) {
                alert("Both arrays are empty. Nothing will be processed.");
            } else if ((!firstArrayIsEmpty) && (!secondArrayIsEmpty)) {
                coreMergeLogic();
            }
        }

        function buildObject(array, arrayIndex) {
            if (array !== "") {
                function buildAdminArrayObject(subArray, subArrayIndex) {
                    let cleanOrderNumber;

                    function cleanUpOrderNumberForMerge() {
                        if (subArray[0].charAt(0) === " ") {
                            cleanOrderNumber = subArray[0].slice(1);
                        } else {
                            cleanOrderNumber = subArray[0];
                        }
                    }
                    cleanUpOrderNumberForMerge();
                    let adminArrayObject = {
                        orderNumber: cleanOrderNumber,
                        billingName: subArray[2],
                        shippingName: subArray[3],
                        orderTotal: subArray[4],
                        fraudRiskString: subArray[8],
                        ipAddress: subArray[9],
                        alertArray: []
                    }
                    arrayOfInputs[arrayIndex][subArrayIndex] = adminArrayObject;
                }

                function buildFolderArrayObject(subArray, subArrayIndex) {
                    let folderArrayObject = {
                        shipVia: subArray[28],
                        orderNumber: subArray[33],
                        lastName: subArray[44],
                        firstName: subArray[45],
                        company: subArray[46],
                        address: subArray[47],
                        city: subArray[49],
                        state: subArray[50],
                        zipCode: subArray[51],
                        shippingCost: subArray[69],
                        phoneNumber: subArray[75],
                        alertArray: [],
                        shippingAlert: false
                    }
                    let laborCounter = 0;
                    specificValues.specialLaborCodes.forEach(function (laborArrayItem) {
                        if (subArray.includes(laborArrayItem)) {
                            laborCounter++;
                        }
                    });
                    if (laborCounter > 0) {
                        folderArrayObject.labor = true;
                    } else {
                        folderArrayObject.labor = false;
                    }
                    arrayOfInputs[arrayIndex][subArrayIndex] = folderArrayObject;
                }

                function buildObjectDecisionTree(subArray, subArrayIndex) {
                    if (subArray.length === 10) {
                        buildAdminArrayObject(subArray, subArrayIndex);
                    } else {
                        buildFolderArrayObject(subArray, subArrayIndex);
                    }
                }
                array.forEach(buildObjectDecisionTree);
            }
        }

        function parsingChain(inputElement, inputIndex) {
            function parseInput() {

                let firstSplit = inputElement.split("splitHere");

                let secondSplit = [];

                function createSubArrays(arrayItem) {
                    let subArray = arrayItem.split("|\\|");

                    function dateSieve(hours, startHour, endHour) {
                        let hoursAboveMin = (hours >= startHour);
                        let hoursBelowMax = (hours < endHour);
                        let hoursAreInRange = (hoursAboveMin && hoursBelowMax);
                        if (hoursAreInRange) {
                            secondSplit.push(subArray);
                        }
                    }

                    function checkForMultiLineOrder() {
                        if (secondSplit.length === 0) {
                            secondSplit.push(subArray);
                        } else if (secondSplit.length > 0) {
                            if (subArray[31] !== "X") {
                                secondSplit.push(subArray);
                            } else if (subArray[31] === "X") {
                                secondSplit[secondSplit.length - 1] = secondSplit[secondSplit.length - 1].concat(subArray);
                            }
                        }
                    }

                    function fixDates(indexOfDateString, needToAddUTC) {
                        if (subArray[31] !== "X") {
                            let dateString = subArray[indexOfDateString];
                            if (needToAddUTC === true) {
                                dateString = dateString.concat(" UTC");
                            }
                            let dateInMilliseconds = Date.parse(dateString);
                            let standardDate = new Date(dateInMilliseconds);
                            let dateToHours = standardDate.getHours();
                            subArray[indexOfDateString] = dateToHours;
                            if (subArray.length === 11) {
                                dateSieve(dateToHours, 0, 23);
                            } else {
                                checkForMultiLineOrder();
                            }
                        } else {
                            checkForMultiLineOrder();
                        }
                    }

                    function fixDatesCallLogic() {
                        if (subArray.length === 127) {
                            fixDates(32, true);
                        } else if (subArray.length === 10) {
                            fixDates(1, false);
                        }
                    }
                    fixDatesCallLogic();
                }
                firstSplit.forEach(createSubArrays);
                arrayOfInputs[inputIndex] = secondSplit;
            }
            if (inputElement !== "") {
                parseInput();
            } 
        }

        arrayOfInputs.forEach(parsingChain);
        arrayOfInputs.forEach(buildObject);
        mergeArrays();
        finalArray.forEach(cleanAndEvaluateObjects);
        generateTable(finalArray);
        getById("inputDiv").style.display = "none";
    }

    function buildInputsFromUpload(inputFileItem, inputFileIndex) {
        let selectedFile = inputFileItem.files[0];
        let reader = new FileReader();
        reader.onloadend = function (event) {
            let fileToText = event.target.result;
            let testSlice = fileToText.slice(0, 9);
            if (testSlice === "\"Order #\"") {
                fileToText = fileToText.replace(/, 20/g, " 20");
                fileToText = fileToText.replace(/"/g, "");
                arrayOfFileInputs[inputFileIndex] = fileToText.split("\n");
                arrayOfFileInputs[inputFileIndex] = arrayOfFileInputs[inputFileIndex].slice(1, arrayOfFileInputs[inputFileIndex].length - 1);

                function splitEachItem(item, index) {
                    arrayOfFileInputs[inputFileIndex][index] = arrayOfFileInputs[inputFileIndex][index].split(",");
                    arrayOfFileInputs[inputFileIndex][index] = arrayOfFileInputs[inputFileIndex][index].join("|\\|");
                }
                arrayOfFileInputs[inputFileIndex].forEach(splitEachItem);
                arrayOfFileInputs[inputFileIndex] = arrayOfFileInputs[inputFileIndex].join("splitHere");
                getById("adminHeading").innerHTML = "IMPORT FILE READY:"
                toggleClassForID("adminSpreadsheetInput", "standby", "active");
                getById("adminFileInput").style.display = "none";
                getById("adminSpreadsheetInput").value = arrayOfFileInputs[inputFileIndex];
            } else if (testSlice === "<VFPData>") {
                arrayOfFileInputs[inputFileIndex] = fileToText;
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(arrayOfFileInputs[inputFileIndex], "text/xml");
                let startingXMLData = xmlDoc.getElementsByTagName("VFPData")[0].children;
                arrayOfFileInputs[inputFileIndex] = Array.from(xmlDoc.getElementsByTagName("VFPData")[0].children);
                let dataFromXML = [];

                function extractValuesFromXML(item, index) {
                    let xmlItemDataArray = Array.from(startingXMLData[index].children);
                    xmlItemDataArray.forEach(function (item) {
                        dataFromXML.push(item.innerHTML);
                    });
                    dataFromXML = dataFromXML.join("|\\|");
                    arrayOfFileInputs[inputFileIndex][index] = dataFromXML;
                    dataFromXML = [];
                }
                arrayOfFileInputs[inputFileIndex].forEach(extractValuesFromXML);
                arrayOfFileInputs[inputFileIndex] = arrayOfFileInputs[inputFileIndex].join("splitHere");
                getById("adminHeading").innerHTML = "IMPORT FILE READY:"
                toggleClassForID("folderSpreadsheetInput", "standby", "active");
                getById("folderFileInput").style.display = "none";
                getById("folderSpreadsheetInput").value = arrayOfFileInputs[inputFileIndex];
                getById("specificValuesFieldsetToggle").style.display = "none";
            }
        }
        reader.readAsText(selectedFile, "UTF-8");
    }

    function generateMessages() {
        getById("messagesDiv").classList.remove("standby");
        getById("messagesDiv").classList.add("active");
        getById("inputDiv").classList.remove("active");
        getById("inputDiv").classList.add("standby");
        //  FUNCTIONS FOR GENERATING MOM MESSAGES		
        function generateMOMMessage(startOrEnd) {
            let time;

            function generateOutput() {
                let message;
                if (startOrEnd === "start") {
                    getById("momMessageStartInput").classList.remove("black");
                    getById("momMessageStartInput").classList.remove("white");
                    message = specificValues.companyName + " Importing " + time;
                    getById("momMessageStartInput").value = message;
                    getById("momMessageStartInput").classList.add("white");
                    getById("copiedMessageForStart").classList.remove("whiteText");
                    getById("copiedMessageForStart").classList.remove("blackText");
                    getById("copiedMessageForStart").classList.add("whiteText");
                } else if (startOrEnd === "end") {
                    getById("momMessageEndInput").classList.remove("black");
                    getById("momMessageEndInput").classList.remove("white");
                    message = specificValues.companyName + " Import Complete " + time;
                    getById("momMessageEndInput").value = message;
                    getById("momMessageEndInput").classList.add("white");
                    getById("copiedMessageForEnd").classList.remove("whiteText");
                    getById("copiedMessageForEnd").classList.remove("blackText");
                    getById("copiedMessageForEnd").classList.add("whiteText");
                }
            }

            function createCurrentTime() {
                let date = new Date();
                let hours = date.getHours();
                let amOrPM = " AM";
                if (hours >= 12) {
                    amOrPM = " PM";
                }
                if (hours > 12) {
                    hours = (hours - 12);
                } else if (hours === 0) {
                    hours = 12;
                }
                let minutes = date.getMinutes(1);
                if (minutes.toString().length === 1) {
                    minutes = "0" + minutes;
                }
                time = hours + ":" + minutes + amOrPM;
            }
            createCurrentTime();
            generateOutput();
        }
        whenClicked("momMessageStartButton", function () {
            generateMOMMessage("start");
        });
        whenClicked("momMessageEndButton", function () {
            generateMOMMessage("end");
        });

        function generateCopyListeners() {
            let momMessageInputs = document.getElementsByClassName("momInput");
            let momMessageInputArray = Array.from(momMessageInputs);

            function createListener(momInputItem) {
                function whatToDoWhenClicked() {
                    if (getById(momInputItem.id).value !== "") {
                        if (momInputItem.classList.contains("mip") === false) {
                            getById(momInputItem.id).classList.remove("white");
                            getById(momInputItem.id).classList.remove("black");
                            getById(momInputItem.id).classList.add("black");
                        }
                        getById(momInputItem.id).select();
                        document.execCommand("copy");
                        let span = momInputItem.nextElementSibling;
                        if (momInputItem.classList.contains("mip") === false) {
                            getById(span.id).classList.remove("whiteText");
                            getById(span.id).classList.remove("blackText");
                            getById(span.id).classList.add("blackText");
                        }
                    }
                }
                whenClicked(momInputItem.id, whatToDoWhenClicked);
            }
            momMessageInputArray.forEach(createListener);
        };
        generateCopyListeners();
    }

    // FUNCTION FOR CALCULATING INSURANCE

    function calculateInsurance() {
        let wholesaleCost = parseInt(getById("insuranceCalcInput").value);
        // Insurance is 2/3 of wholesale cost, rounded up 
        // to the nearest hundred, minus one
        // For example, the insurance on $516 will be $399
        let twoThirdsOfWholesale = (wholesaleCost * (2 / 3));
        let roundedUpToNearestHundred = Math.ceil(twoThirdsOfWholesale / 100) * 100;
        getById("insuranceCalcInput").value = roundedUpToNearestHundred - 1;
        getById("insuranceCalcInput").select();
        document.execCommand('copy');
        getById("copiedMessageForInsuranceCalc").classList.remove("whiteText");
        getById("copiedMessageForInsuranceCalc").classList.add("blackText");

        function resetInsuranceCalc() {
            getById("insuranceCalcInput").value = "";
            getById("copiedMessageForInsuranceCalc").classList.remove("blackText");
            getById("copiedMessageForInsuranceCalc").classList.add("whiteText");
        }
        setTimeout(resetInsuranceCalc, 5000);
    }


    function confirmBeforeRunning() {
        let confirmMessage = "STOP!!! cried the archdeacon." +
            " The import might not be in yet!";
        alert(confirmMessage);
        let confirmation = confirm("Please confirm the import" +
            " is in before proceeding. Click 'OK' to run the program.");
        if (confirmation === true) {
            generateMessages();
            masterParsingLogic();

            function pauseBeforeScrollingDown() {
                function scrollToBottom() {
                    window.scrollTo(0, document.body.scrollHeight);
                }
                setTimeout(scrollToBottom, 3500);
            }
            pauseBeforeScrollingDown();
        }
    }

    function loadValues() {
        if (localStorage.getItem("importHelperValues") === null) {
            let noValuesMessage = "WARNING: No saved values detected. Load values before running the Import Helper";
            alert(noValuesMessage);
        } else {
            specificValues = JSON.parse(localStorage.getItem("importHelperValues"));

            getById("companyNameInput").value = specificValues.companyName;
            getById("momValidationInput").value = specificValues.momFolderValidationString;
            getById("adminValidationInput").value = specificValues.adminFolderValidationString;
            getById("alternateIDInput").value = specificValues.alternateID;
            getById("ipAddressInput").value = specificValues.companyIPAddress;
            getById("specialOrderCodeInput").value = specificValues.specialOrderCode;
            getById("specialLaborCodeInput").value = specificValues.specialLaborCodes;
            getById("oneDayZoneInput").value = specificValues.oneDayZoneArray;
            getById("twoDayZoneInput").value = specificValues.twoDayZoneArray;
            getById("remainderOfUSInput").value = specificValues.restOfContiguousUS;
            getById("highValueOrderThresholdInput").value = specificValues.highValueOrderThreshold;
            getById("highRiskThresholdInput").value = specificValues.highRiskThreshold;
            getById("alternateIDClickToCopy").value = specificValues.alternateID;
        }
    }

    let specificValues = {
        companyName: "",
        momFolderValidationString: "",
        adminFolderValidationString: "",
        alternateID: "",
        companyIPAddress: "",
        specialOrderCode: "",
        specialLaborCodes: [],
        oneDayZoneArray: [],
        twoDayZoneArray: [],
        restOfContiguousUS: []
    };

    function saveValues() {
        specificValues.companyName = getById("companyNameInput").value;
        specificValues.momFolderValidationString = getById("momValidationInput").value;
        specificValues.adminFolderValidationString = getById("adminValidationInput").value;
        specificValues.alternateID = getById("alternateIDInput").value;
        specificValues.companyIPAddress = getById("ipAddressInput").value;
        specificValues.specialOrderCode = getById("specialOrderCodeInput").value;
        let laborCodesInput = getById("specialLaborCodeInput").value;
        let laborCodesArray = laborCodesInput.split(",");
        specificValues.specialLaborCodes = laborCodesArray;
        let oneDayZoneInput = getById("oneDayZoneInput").value;
        let oneDayZoneInputArray = oneDayZoneInput.split(",");
        specificValues.oneDayZoneArray = oneDayZoneInputArray;
        let twoDayZoneInput = getById("twoDayZoneInput").value;
        let twoDayZoneInputArray = twoDayZoneInput.split(",");
        specificValues.twoDayZoneArray = twoDayZoneInputArray;
        let restOfUSInput = getById("remainderOfUSInput").value;
        let restOfUSInputArray = restOfUSInput.split(",");
        specificValues.restOfContiguousUS = restOfUSInputArray;
        specificValues.highValueOrderThreshold = parseInt(getById("highValueOrderThresholdInput").value);
        specificValues.highRiskThreshold = parseInt(getById("highRiskThresholdInput").value);

        let specificValuesStringified = JSON.stringify(specificValues)

        localStorage.setItem("importHelperValues", specificValuesStringified);

        loadValues();
    }

    loadValues();

    function toggleSettingsFieldset() {
        let settingsFieldset = getById("specificValues");
        toggleClassForID("specificValues", "standby", "active");
        if (settingsFieldset.classList.contains("standby")) {
            getById("specificValuesFieldsetToggle").innerHTML = "SHOW SETTINGS";
        } else if (settingsFieldset.classList.contains("active")) {
            getById("specificValuesFieldsetToggle").innerHTML = "HIDE SETTINGS";
        }
    }

    function loadSettingsFromString() {
        let enterSettingsStringPrompt = prompt("Enter settings string:");
        localStorage.setItem("importHelperValues", enterSettingsStringPrompt);
        loadValues();
    }

    function exportSettingsToString() {
        let textAreaForCopyingSettings = document.createElement("TEXTAREA");
        textAreaForCopyingSettings.id = "textAreaForCopyingSettings";
        getById("divForSettingsTextArea").appendChild(textAreaForCopyingSettings);
        getById("textAreaForCopyingSettings").value = localStorage.getItem("importHelperValues");
        getById("textAreaForCopyingSettings").select();
        document.execCommand("copy");
        getById("divForSettingsTextArea").removeChild(getById("divForSettingsTextArea").childNodes[0]);
        alert("Check to see if it copied.");
    }

    whenClicked("parseFilesButton", function () {
        getById("parseFilesButton").style.display = "none";
        toggleClassForID("submitButton", "standby", "active");
        toggleClassForID("importTimeSelect", "standby", "active");
        arrayOfFileInputs.forEach(buildInputsFromUpload);
    });
    whenClicked("submitButton", confirmBeforeRunning);
    whenClicked("insuranceCalcButton", calculateInsurance);
    whenClicked("saveValuesButton", saveValues);
    whenClicked("specificValuesFieldsetToggle", toggleSettingsFieldset);
    whenClicked("loadSettingsButton", loadSettingsFromString);
    whenClicked("exportSettingsButton", exportSettingsToString);

});