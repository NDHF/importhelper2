console.log(
    "THE LIL HELPER \n" +
    "Local Intermediary Logic \n" +
    "By Nicholas Bernhard \n" +
    "\u00A9 2020 \n" +
    "VERSION 2.0 \n" +
    "IN DEVELOPMENT: NOT FOR USE \n" +
    "UPDATES FROM 1.4: \n" +
    " * The program takes the bizsync spreadsheet " +
    "and merges it with a Magento spreadsheet. \n" +
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

    /*
        el = element
        elC = elementContent
        idOfEl = idOfElementToAppendTo
        elID = elementID
        otherFunc = otherFunctionToRun
    */

    function makeANode(el, elC, idOfEl, elID, otherFunc) {
        let newElement = document.createElement(el);
        newElement.id = elID;
        let newElementContent = document.createTextNode(elC);
        let elementToAppendTo = getById(idOfEl);
        newElement.appendChild(newElementContent);
        elementToAppendTo.appendChild(newElement);
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

    function terminateProgram(errorDetails) {
        let terminateProgramMessage = "The program has encountered " +
        "an error. Details: " + errorDetails + " Program terminated.";
        alert(terminateProgramMessage);
        document.write("Program ended. Please reload the page.");
    }

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
                if (firstItemOfFinalArray[propertiesForTableItem.name] !==
                    undefined) {
                    let heading = propertiesForTableItem.heading;
                    makeANode("TH", heading, "tableHeaderRow");
                }
            }
            propertiesForTable.forEach(appendTH);

            function appendRows(finalArrayItem, index) {
                let currentTR = ("tableRow" + (index + 1));
                let currAlertArr = ("alertArray" + (index + 1));
                let currAlertUL = ("alertUL" + (index + 1));
                makeANode("TR", "", "resultsTable", currentTR);

                function makeTableRowContent(propertiesForTableItem) {
                    function buildAlertList(alertArrayItem) {
                        makeANode("LI", alertArrayItem, currAlertArr);
                    }
                    if (firstItemOfFinalArray[propertiesForTableItem.name] !==
                        undefined) {
                        if (propertiesForTableItem.name === "alertArray") {
                            makeANode("TD", "", currentTR, currAlertArr);
                            makeANode("UL", "", currentTR, currAlertUL);
                            finalArrayItem.alertArray.forEach(buildAlertList);
                        } else {
                            let i = finalArrayItem[propertiesForTableItem.name];
                            makeANode("TD", i, currentTR);
                        }
                    }
                    if (finalArrayItem.alertActive === true) {
                        if (getById(currentTR).classList.contains("alert") ===
                            false) {
                            getById(currentTR).classList.add("alert");
                        }
                    }
                    if (finalArrayItem.riskyButIPMatches === true) {
                        if (getById(currentTR).classList.contains("alert") ===
                            true) {
                            getById(currentTR).classList.remove("alert");
                            getById(currentTR).classList.add("greenAlert");
                        }
                    }
                    if (finalArrayItem.nameAlreadyExists === true) {
                        if (getById(currentTR).classList.contains("alert") ===
                            true) {
                            getById(currentTR).classList.remove("alert");
                            getById(currentTR).classList.add("purpleAlert");
                        } else {
                            getById(currentTR).classList.add("purpleAlert");
                        }
                    }
                }
                propertiesForTable.forEach(makeTableRowContent);
            }
            finalArray.forEach(appendRows);

            function displayNumberOfOrders() {
                let msgArr = [
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
                let numOfRes = (getById("resultsTable").children.length - 1);
                let randMsg = msgArr[Math.floor(Math.random() * msgArr.length)];
                alert("Now working with " + numOfRes + " orders. " + randMsg);
            }
            displayNumberOfOrders();
        }

        function cleanAndEvaluateObjects(finalArrayItem, finalArrayIndex) {
            function cleanUpObject() {
                if (finalArrayItem.orderTotal !== undefined) {
                    let noDollarSign = finalArrayItem.orderTotal.slice(1);
                    let noCommas = noDollarSign.replace(/,/g, "");
                    finalArrayItem.orderTotal = parseFloat(noCommas);
                }
                if (finalArrayItem.shippingCost !== undefined) {
                    let shippingToInt = parseFloat(finalArrayItem.shippingCost);
                    finalArrayItem.shippingCost = shippingToInt;
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
                            finalArrayItemName = finalArrayItem.firstName +
                                " " + finalArrayItem.lastName;
                        }
                        if (duplicateCheckArray.includes(finalArrayItemName)) {
                            finalArrayItem.nameAlreadyExists = true;
                            finalArrayItem.alertArray.push(
                                "Another order with " +
                                "the name ***" + finalArrayItemName +
                                "*** exists. " +
                                "Check to see if these orders " +
                                "can be combined.");
                        } else {
                            finalArrayItem.nameAlreadyExists = false;
                        }
                        duplicateCheckArray.push(finalArrayItemName);
                    }
                }

                function checkForHighRiskOrder() {
                    if (finalArrayItem.fraudRiskString >=
                        specificValues.highRiskThreshold) {
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
                        finalArrayItem.alertArray.push("Signature may be " +
                            "required. Invesitgate further.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.signatureRequired = false;
                    }
                }

                function checkIfInsuranceRequired() {
                    if (finalArrayItem.orderTotal >= 500) {
                        finalArrayItem.insuranceRequired = true;
                        finalArrayItem.alertArray.push("Insurance may be " +
                            "required. Investigate further.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.insuranceRequired = false;
                    }
                }

                function checkForHighValueOrder() {
                    if (finalArrayItem.orderTotal >=
                        specificValues.highValueOrderThreshold) {
                        finalArrayItem.highValueOrder = true;
                        finalArrayItem.alertArray.push("CAUTION: " +
                            "High-value order. " +
                            "Please check the order in Magento " +
                            "to see if the billing address and " +
                            "shipping adress match, otherwise " +
                            "you may not be protected.");
                        activateAlertStatus();
                    } else {
                        finalArrayItem.highValueOrder = false;
                    }
                }

                function checkForHighRiskANDHighValue() {
                    if ((finalArrayItem.highValueOrder === true) &&
                        (finalArrayItem.highRiskOrder === true)) {
                        finalArrayItem.highRiskANDHighValue = true;
                        let highRiskANDHighValMsg = "DANGER: " +
                            "This order meets or exceeds the threshold for " +
                            "a high-risk order AND a high-value order. " +
                            "Please check the order in Magento " +
                            "to see if the billing address and " +
                            "shipping adress match, otherwise " +
                            "you may not be protected.";
                        finalArrayItem.alertArray.push(highRiskANDHighValMsg);
                    }
                }

                function validateIPAddress() {
                    let ourIPAddress = specificValues.companyIPAddress;
                    let noIPAddress = "";
                    let ipMatches1 = (finalArrayItem.ipAddress ===
                        ourIPAddress);
                    let ipMatches2 = (finalArrayItem.ipAddress === noIPAddress);
                    let ipMatchConfirmed = (ipMatches1 || ipMatches2);
                    if ((finalArrayItem.ipAddress !== undefined) &&
                        ipMatchConfirmed) {
                        finalArrayItem.ipMatch = true;
                    } else {
                        finalArrayItem.ipMatch = false;
                    }
                }

                function checkForHighValueAndIPMatch() {
                    let orderIsHighValue = (finalArrayItem.highValueOrder ===
                        true);
                    let orderIPMatches = (finalArrayItem.ipMatch === true);
                    let orderIsHighRisk = (finalArrayItem.highRiskOrder ===
                        true);
                    let riskyOrderButMadeByUs = ((orderIsHighValue ||
                        orderIsHighRisk) && orderIPMatches);
                    if (riskyOrderButMadeByUs) {
                        finalArrayItem.riskyButIPMatches = true;
                        finalArrayItem.alertArray.push("This order is " +
                            "considered risky, but was made by an employee.");
                    } else {
                        finalArrayItem.riskyButIPMatches = false;
                    }
                }

                function checkForOneInPhoneNumber() {
                    let frstDgtOfPhoNum = finalArrayItem.phoneNumber.charAt(0);
                    let firstDigitIsOne = (frstDgtOfPhoNum === "1");
                    if (firstDigitIsOne) {
                        finalArrayItem.alertArray.push("WARNING: First digit " +
                            "of phone number is '1'. Check Admin or " +
                            "MOM spreadsheet for correct phone number.");
                        activateAlertStatus();
                    }
                }

                function evaluateShipVia() {
                    function checkForPOBox() {
                        let lwrCsAddr = finalArrayItem.address.toLowerCase();
                        let addrIsProbablyPOBox = (lwrCsAddr.includes("box"));
                        let shipViaIsUSPS = ((finalArrayItem.shipVia ===
                            "PM") || (finalArrayItem.shipVia === "FC"));
                        let shipViaIsNOTUSPS = (!shipViaIsUSPS);
                        if (addrIsProbablyPOBox && shipViaIsNOTUSPS) {
                            finalArrayItem.alertArray.push(
                                "You will probably need to change shipping " +
                                "method to United States Postal Service.");
                            activateAlertStatus();
                        }
                    }

                    function checkForCommercialAddress() {
                        let probablyCommAddr = (finalArrayItem.company !== "");
                        let shipViaIsUPR = (finalArrayItem.shipVia === "UPR");
                        if (probablyCommAddr && shipViaIsUPR) {
                            finalArrayItem.alertArray.push(
                                "Possible commercial address. This order's " +
                                "shipping method might need to be updated " +
                                "to UPC.");
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
                        let oneTwoOrThreeDayShipping = (twoOrThreeDayShipping ||
                            overnightShipping);

                        function oneDayZoneCheck(oneDayState) {
                            if (oneTwoOrThreeDayShipping &&
                                (finalArrayItem.state === oneDayState)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push(
                                    "Expedited shipping. Address might be " +
                                    "inside one-day zone.");
                                activateAlertStatus();
                            }
                        }
                        let tdzArr = specificValues.twoDayZoneArray;
                        let twoDayZone = oneDayZone.concat(tdzArr);

                        function twoDayZoneCheck(twoDayState) {
                            if (twoOrThreeDayShipping &&
                                (finalArrayItem.state === twoDayState)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push(
                                    "Expedited shipping. Address might be " +
                                    "inside two-day zone.");
                                activateAlertStatus();
                            }
                        }

                        let outsideStates = [
                            "HI", "AK", "PR", "GU", "AS",
                            "FM", "MH", "MP", "PW", "VI"
                        ];

                        function upsOutsideLower48Check() {
                            if (outsideStates.includes(finalArrayItem.state)) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push(
                                    "Order is UPS, outside of " +
                                    "lower 48 states. I suggest you update " +
                                    "shipping to FC or PM");
                                activateAlertStatus();
                            }
                        }

                        let contgUSFromStor = specificValues.restOfContiguousUS;

                        let contgUS = twoDayZone.concat(contgUSFromStor);

                        let wholeUS = contgUS.concat(outsideStates);
                        let currentState = finalArrayItem.state;
                        let orderIsInUS = (wholeUS.includes(currentState));
                        let orderIsNotInUS = (!orderIsInUS);

                        function checkForInternationalOrder() {
                            if (orderIsNotInUS) {
                                finalArrayItem.shippingAlert = true;
                                finalArrayItem.alertArray.push("This is " +
                                    "likely an international order. " +
                                    "I suggest " +
                                    "you update shipping to MIP. " +
                                    "IN ADDITION, " +
                                    "check phone number in MOM for a '1' " +
                                    "at the beginning.");
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
                        finalArrayItem.alertArray.push("This order includes " +
                            "AT LEAST one labor.");
                        activateAlertStatus();
                    }
                }

                function checkForSpecialPackingRequirement() {
                    if (finalArrayItem.specialPacking === true) {
                        finalArrayItem.alertArray.push("This order will " +
                            "require special packing. " +
                            "Additional boxes may be " +
                            "required, or item might have shipping method " +
                            "restrictions.");
                            activateAlertStatus();
                    }
                }

                function checkForSpecialOrder() {
                    if (finalArrayItem.specialOrder === true) {
                        finalArrayItem.alertArray.push("This order contains " +
                            "a special order. Please review order in admin " +
                            " and copy over to MOM instructions.");
                        activateAlertStatus();
                    }
                }

                function runChecks() {
                    checkIfNameAlreadyExists();
                    checkForHighRiskOrder();
                    checkForSignatureRequired();
                    checkIfInsuranceRequired();
                    checkForHighValueOrder();
                    checkForHighRiskANDHighValue();
                    validateIPAddress();
                    checkForHighValueAndIPMatch();
                    if (finalArrayItem.shipVia !== undefined) {
                        evaluateShipVia();
                    }
                    if (finalArrayItem.labor !== undefined) {
                        checkForLabor();
                    }
                    if (finalArrayItem.specialPacking !== undefined) {
                        checkForSpecialPackingRequirement();
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
                        let matchDetected = (adminArrayItem.orderNumber ===
                            folderArrayItem.orderNumber);

                        function loopMatchPropArray(item) {
                            folderArrayItem[item] = adminArrayItem[item];
                        }
                        if (matchDetected) {
                            let matchPropArray = [
                                "orderTotal", "fraudRiskString", "ipAddress"
                            ];
                            matchPropArray.forEach(loopMatchPropArray);
                            finalArray.push(folderArrayItem);
                        }
                    }
                    arrayOfInputs[0].forEach(loopThroughFolderArray);
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
                terminateProgram();
            } else if ((!firstArrayIsEmpty) && (!secondArrayIsEmpty)) {
                coreMergeLogic();
            }
        }

        function buildObject(array, arrayIndex) {
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
                };
                arrayOfInputs[arrayIndex][subArrayIndex] = adminArrayObject;
            }

            function buildFolderArrayObject(subArray, subArrayIndex) {
                let folderArrObj = {
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
                };
                let laborCounter = 0;
                let specialPackingCounter = 0;

                function laborArrayLoop(laborArrayItem) {
                    if (subArray.includes(laborArrayItem)) {
                        laborCounter = laborCounter + 1;
                    }
                }
                specificValues.specialLaborCodes.forEach(laborArrayLoop);
                if (laborCounter > 0) {
                    folderArrObj.labor = true;
                } else {
                    folderArrObj.labor = false;
                }
                function packingLoop(specialPackingItem) {
                    if (subArray.includes(specialPackingItem)) {
                        specialPackingCounter = specialPackingCounter + 1;
                    }
                }
                specificValues.specialPacking.forEach(packingLoop);
                if (specialPackingCounter > 0) {
                    folderArrObj.specialPacking = true;
                } else {
                    folderArrObj.specialPacking = false;
                }
                arrayOfInputs[arrayIndex][subArrayIndex] = folderArrObj;
            }

            function buildObjectDecisionTree(subArray, subArrayIndex) {
                if (subArray.length === 10) {
                    buildAdminArrayObject(subArray, subArrayIndex);
                } else {
                    buildFolderArrayObject(subArray, subArrayIndex);
                }
            }
            if (array !== "") {
                array.forEach(buildObjectDecisionTree);
            }
        }

        function parsingChain(inputElement, inputIndex) {
            function parseInput() {

                let firstSplit = inputElement.split("splitHere");

                let secondSplit = [];

                function createSubArrays(arrayItem) {
                    let subArray = arrayItem.split("|\\|");

                    let dateToHours = 0;
                    let importStart = parseInt(specificValues.importStart);
                    let importEnd = parseInt(specificValues.importEnd);

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
                                let lMin1 = secondSplit.length - 1;
                                let sa = subArray;
                                let combined = secondSplit[lMin1].concat(sa);
                                secondSplit[lMin1] = combined;
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
                            dateToHours = standardDate.getHours();
                            subArray[indexOfDateString] = dateToHours;
                            if (subArray.length === 10) {
                                dateSieve(dateToHours, importStart, importEnd);
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

    function buildInputsFromUpload(inputFileItem, IFIndex) {
        let selectedFile = inputFileItem.files[0];
        let reader = new FileReader();

        function splitEachItem(item, ind) {
            let s = arrayOfFileInputs[IFIndex][ind].split(",");
            let j = s.join("|\\|");
            arrayOfFileInputs[IFIndex][ind] = s;
            arrayOfFileInputs[IFIndex][ind] = j;
        }
        reader.onloadend = function (event) {
            let fileToText = event.target.result;
            let testSlice = fileToText.slice(0, 9);
            let sh = "splitHere";
            if (testSlice === "\"Order #\"") {
                if (IFIndex === 0) {
                    terminateProgram("The Magento spreadsheet " +
                    "is where the Bizsync spreadsheet should be.");
                } else {
                    fileToText = fileToText.replace(/,\s20/g, " 20");
                    fileToText = fileToText.replace(/"/g, "");
                    arrayOfFileInputs[IFIndex] = fileToText.split("\n");
                    let lengthMin1 = arrayOfFileInputs[IFIndex].length - 1;
                    let aofi = arrayOfFileInputs[IFIndex];
                    arrayOfFileInputs[IFIndex] = aofi.slice(1, lengthMin1);
                    arrayOfFileInputs[IFIndex].forEach(splitEachItem);
                    let splitHereCSV = arrayOfFileInputs[IFIndex].join(sh);
                    arrayOfFileInputs[IFIndex] = splitHereCSV;
                    getById("adminHeading").innerHTML = "IMPORT FILE READY:";
                    let act = "active";
                    toggleClassForID("adminSpreadsheetInput", "standby", act);
                    getById("adminFileInput").style.display = "none";
                    let adminSpreadsheetInp = getById("adminSpreadsheetInput");
                    adminSpreadsheetInp.value = arrayOfFileInputs[IFIndex];
                }
            } else if (testSlice === "<VFPData>") {
                if (IFIndex === 1) {
                    terminateProgram("The Bizsync spreadsheet " +
                    "is where the Magento spreadsheet should be.");
                } else {
                    arrayOfFileInputs[IFIndex] = fileToText;
                    fileToText = arrayOfFileInputs[IFIndex];
                    let parser = new DOMParser();
                    let vfp = "VFPData";
                    let xmlDoc = parser.parseFromString(fileToText, "text/xml");
                    let start = xmlDoc.getElementsByTagName(vfp)[0].children;
                    arrayOfFileInputs[IFIndex] = Array.from(start);
                    let extract = function (item, index) {
                        let dataFromXML = [];
                        let children = start[index].children;
                        let xmlItemDataArray = Array.from(children);
                        xmlItemDataArray.forEach(function (item) {
                            dataFromXML.push(item.innerHTML);
                        });
                        dataFromXML = dataFromXML.join("|\\|");
                        arrayOfFileInputs[IFIndex][index] = dataFromXML;
                        dataFromXML = [];
                    };
                    arrayOfFileInputs[IFIndex].forEach(extract);
                    let splitHereXML = arrayOfFileInputs[IFIndex].join(sh);
                    arrayOfFileInputs[IFIndex] = splitHereXML;
                    getById("adminHeading").innerHTML = "IMPORT FILE READY:";
                    let fsi = "folderSpreadsheetInput";
                    toggleClassForID(fsi, "standby", "active");
                    getById("folderFileInput").style.display = "none";
                    getById(fsi).value = arrayOfFileInputs[IFIndex];
                    let sttngsButton = getById("specificValuesFieldsetToggle");
                    sttngsButton.style.display = "none";
                }
            } else {
                terminateProgram("LIL Helper does not recognize " +
                "at least one of the files as valid input.");
            }
        };
        if (selectedFile !== undefined) {
            reader.readAsText(selectedFile, "UTF-8");
        }
    }

    function parse() {
        getById("parseFilesButton").style.display = "none";
        toggleClassForID("submitButton", "standby", "active");
        arrayOfFileInputs.forEach(buildInputsFromUpload);
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
                let message = "";
                let momMessageStart = getById("momMessageStartInput");
                let startMessage = getById("copiedMessageForStart");
                let momMessageEnd = getById("momMessageEndInput");
                let endMessage = getById("copiedMessageForEnd");
                if (startOrEnd === "start") {
                    momMessageStart.classList.remove("black");
                    momMessageStart.classList.remove("white");
                    message = specificValues.companyName + " Importing " + time;
                    momMessageStart.value = message;
                    momMessageStart.classList.add("white");
                    startMessage.classList.remove("whiteText");
                    startMessage.classList.remove("blackText");
                    startMessage.classList.add("whiteText");
                } else if (startOrEnd === "end") {
                    momMessageEnd.classList.remove("black");
                    momMessageEnd.classList.remove("white");
                    message = specificValues.companyName +
                        " Import Complete " + time;
                    momMessageEnd.value = message;
                    momMessageEnd.classList.add("white");
                    endMessage.classList.remove("whiteText");
                    endMessage.classList.remove("blackText");
                    endMessage.classList.add("whiteText");
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
        }
        generateCopyListeners();
    }

    // FUNCTION FOR CALCULATING INSURANCE

    function calculateInsurance() {
        let wholesaleCost = parseInt(getById("insuranceCalcInput").value);
        // Insurance is 2/3 of wholesale cost, rounded up
        // to the nearest hundred, minus one
        // For example, the insurance on $516 will be $399
        let twoThirdsOfWholesale = (wholesaleCost * (2 / 3));
        let insCalcInput = getById("insuranceCalcInput");
        let insCalcMessage = getById("copiedMessageForInsuranceCalc");
        let roundedUpToNearest100 = Math.ceil(twoThirdsOfWholesale / 100) * 100;
        insCalcInput.value = roundedUpToNearest100 - 1;
        insCalcInput.select();
        document.execCommand("copy");
        insCalcMessage.classList.remove("whiteText");
        insCalcMessage.classList.add("blackText");

        function resetInsuranceCalc() {
            insCalcInput.value = "";
            insCalcMessage.classList.remove("blackText");
            insCalcMessage.classList.add("whiteText");
        }
        setTimeout(resetInsuranceCalc, 5000);
    }


    function confirmBeforeRunning() {
        let confirmMessage = "STOP!!! cried the archdeacon." +
            " The import might not be in yet!";
        alert(confirmMessage);
        let confirmation = confirm("Please confirm the import" +
            " is in before proceeding. Click 'OK' to run the program.");
        function pauseBeforeScrollingDown() {
            function scrollToBottom() {
                window.scrollTo(0, document.body.scrollHeight);
            }
            setTimeout(scrollToBottom, 3500);
        }
        if (confirmation === true) {
            generateMessages();
            masterParsingLogic();
            pauseBeforeScrollingDown();
        }
    }

    let valueIDPairs = [{
            elementID: "companyNameInput",
            value: "companyName",
            array: false
        },
        {
            elementID: "momValidationInput",
            value: "momFolderValidationString",
            array: false
        },
        {
            elementID: "adminValidationInput",
            value: "adminFolderValidationString",
            array: false
        },
        {
            elementID: "alternateIDInput",
            value: "alternateID",
            array: false
        },
        {
            elementID: "ipAddressInput",
            value: "companyIPAddress",
            array: false
        },
        {
            elementID: "importStartInput",
            value: "importStart",
            array: false
        },
        {
            elementID: "importEndInput",
            value: "importEnd",
            array: false
        },
        {
            elementID: "specialOrderCodeInput",
            value: "specialOrderCode",
            array: false
        },
        {
            elementID: "specialLaborCodeInput",
            value: "specialLaborCodes",
            array: true
        },
        {
            elementID: "specialPackingInput",
            value: "specialPacking",
            array: true
        },
        {
            elementID: "oneDayZoneInput",
            value: "oneDayZoneArray",
            array: true
        },
        {
            elementID: "twoDayZoneInput",
            value: "twoDayZoneArray",
            array: true
        },
        {
            elementID: "remainderOfUSInput",
            value: "restOfContiguousUS",
            array: true
        },
        {
            elementID: "highValueOrderThresholdInput",
            value: "highValueOrderThreshold",
            array: false
        },
        {
            elementID: "highRiskThresholdInput",
            value: "highRiskThreshold",
            array: false
        },
        {
            elementID: "alternateIDClickToCopy",
            value: "alternateID",
            array: false
        }
    ];

    function pairElementWithSettingsValue(mode) {
        function loopValueIDPairs(item) {
            if (mode === "load") {
                getById(item.elementID).value = specificValues[item.value];
            } else if (mode === "save") {
                let elID = "";
                if (item.array === true) {
                    elID = item.elementID;
                    specificValues[item.value] = getById(elID).value.split(",");
                } else if (item.array === false) {
                    elID = item.elementID;
                    specificValues[item.value] = getById(elID).value;
                }
            }
        }
        valueIDPairs.forEach(loopValueIDPairs);
    }

    function loadValues() {
        let settingsValues = localStorage.getItem("importHelperValues");
        if (settingsValues === null) {
            let noValuesMessage = "WARNING: No saved values detected. " +
                "Load values before running the Import Helper";
            alert(noValuesMessage);
        } else {
            specificValues = JSON.parse(settingsValues);
            pairElementWithSettingsValue("load");
        }
    }

    let specificValues = {
        companyName: "",
        momFolderValidationString: "",
        adminFolderValidationString: "",
        alternateID: "",
        companyIPAddress: "",
        importStart: 0,
        importEnd: 23,
        specialOrderCode: "",
        specialLaborCodes: [],
        specialPacking: [],
        oneDayZoneArray: [],
        twoDayZoneArray: [],
        restOfContiguousUS: []
    };

    function saveValues() {
        pairElementWithSettingsValue("save");

        let specificValuesStringified = JSON.stringify(specificValues);

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
        let settingsTxtArea = getById("divForSettingsTextArea");
        let settingsExportOutput = document.createElement("TEXTAREA");
        settingsExportOutput.id = "textAreaForCopyingSettings";
        settingsTxtArea.appendChild(settingsExportOutput);
        settingsExportOutput.value = localStorage.getItem("importHelperValues");
        settingsExportOutput.select();
        document.execCommand("copy");
        settingsTxtArea.removeChild(settingsTxtArea.childNodes[0]);
        alert("Check to see if it copied.");
    }

    let listenerArray = [
        {
            buttonID: "parseFilesButton",
            functionToRun: parse
        },
        {
            buttonID: "submitButton",
            functionToRun: confirmBeforeRunning
        },
        {
            buttonID: "insuranceCalcButton",
            functionToRun: calculateInsurance
        },
        {
            buttonID: "saveValuesButton",
            functionToRun: saveValues
        },
        {
            buttonID: "specificValuesFieldsetToggle",
            functionToRun: toggleSettingsFieldset
        },
        {
            buttonID: "loadSettingsButton",
            functionToRun: loadSettingsFromString
        },
        {
            buttonID: "exportSettingsButton",
            functionToRun: exportSettingsToString
        }
    ];

    function addListenersFromArray(item) {
        whenClicked(item.buttonID, item.functionToRun);
    }

    listenerArray.forEach(addListenersFromArray);

});