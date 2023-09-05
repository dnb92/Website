import {DraggableElement} from "./DraggableElement.js";

export class TestSuitePresentationLayer{
    constructor(testSuite){
        this.Data = testSuite;
        this.mainWindowId = this.Data.divIdName;
        this.mainWindowElement = null;
        this.scrollWindowElement;
    }

    EnableTestSuiteTools(testMode = true){
        
        //Control visibility of "Run Test" button through testMode variable, default is false - MUST CHAGE TO TRUE TO GET TEST BUTTON.
        if (testMode == true){
            this.BuildMainWindow();
            var button = document.createElement("button");
            button.style.padding = "10px";
            button.style.fontFamily = "Helvetica";
            button.style.fontWeight = "bold";
            button.style.textAlign = "center";
            button.style.border = "none";
            button.style.boxShadow = "3px 3px";
            button.style.borderRadius = "0px 0px 10px 10px";
            button.style.backgroundColor = "orange";
            button.id = "runTest"
            button.onclick = function() {console.log("RUN_BUTTON_PRESSED"); this.Data.TestBeds.TestScenarios[0].RunTestsFunc(); this.BuildTestBeds(); if (window.sessionStorage.getItem("testBedsRun") == true) {console.log("ALL_TEST_CASES_RAN")}else{console.log("NO_TEST_CASES_TO_RUN")}}.bind(this);

            button.textContent = `RUN TESTSUITE`;
            this.scrollWindowElement.appendChild(button);
            
            var welcome = document.createElement('p');
            welcome.style.fontFamily = "Helvetica";
            welcome.id = "headingMessage";
            welcome.style.backgroundColor = "none";
            welcome.style.color = "lightgrey";
            welcome.style.letterSpacing = "10px";
            welcome.style.display = "block";
            welcome.style.fontStyle = "bold";
            welcome.style.whiteSpace = "wrap";
            welcome.style.width = "50%";
            welcome.style.fontSize = "50px"
            welcome.style.width = "100%";
            welcome.style.borderRadius = "50px";
            welcome.style.padding = "20px";
            welcome.style.marginBottom = "10px";
           
                                
            welcome.innerHTML = "<sup><b>WELCOME\n\nto TestSuite Webpage Unit-Testing Software. _version_0.01beta</sup>";

            this.scrollWindowElement.append(welcome);
            
        }else{
            
            if (this.scrollWindowElement != null){
                this.mainWindowOpenCloseButtonElement.remove();
                this.scrollWindowElement.remove();
                
            }
        }
    }

    BuildMainWindow(){

        var openCloseMainWindow = function (){
            DraggableElement.dragElement(this.mainWindowOpenCloseButtonElement,this.scrollWindowElement);
            /* var getHeight = document.getElementById("scrollWindow").style.height;
            if(getHeight == "300px"){
                this.scrollWindowElement.style.height = "40px";
                this.mainWindowOpenCloseButtonElement.style.bottom = "40px";
            }else{
                this.scrollWindowElement.style.height = "300px";
                this.mainWindowOpenCloseButtonElement.style.bottom = "300px";
            } */
            

        };

        var scrollWindow = document.createElement('div');
        scrollWindow.id = "scrollWindow";
        scrollWindow.style.position = "absolute";
        scrollWindow.style.textAlign = "center";
        scrollWindow.style.paddingLeft = "50px";
        scrollWindow.style.paddingRight = "50px";
        scrollWindow.style.backgroundColor = "lightgrey";
        scrollWindow.style.bottom = "0px";
        scrollWindow.style.height = "300px";
        scrollWindow.style.width = "94.5%";
        scrollWindow.style.overflowY = "scroll";
        scrollWindow.style.overflowX = "none";
        scrollWindow.style.pointerEvents = "auto";
        scrollWindow.style.backgroundImage = "url('./TestSuite/resources/background_dotted.jpg')";
        scrollWindow.style.backgroundRepeat = "repeat";
        scrollWindow.style.backgroundSize = "contain";
        scrollWindow.style.backgroundBlendMode = "lighten";

        this.scrollWindowElement = scrollWindow;
        document.body.append(scrollWindow);

        
        //CREATE Open Close Button
        var mainWindowOpenClose = document.createElement("div");
        mainWindowOpenClose.className = "testsuiteTools mainWindow";
        mainWindowOpenClose.id = "ts_main_openclose";
        mainWindowOpenClose.style.position = "absolute";
        mainWindowOpenClose.style.bottom = "300px";
        mainWindowOpenClose.style.fontWeight = "bold";
        mainWindowOpenClose.style.textAlign = "center";
        mainWindowOpenClose.style.borderRadius = "10px 10px 0px 0px";
        mainWindowOpenClose.style.padding = "10px";
        mainWindowOpenClose.style.borderWidth = "1px";
        mainWindowOpenClose.style.borderColor = "black";
        mainWindowOpenClose.style.borderStyle = "dashed";
        mainWindowOpenClose.style.fontFamily = "Helvetica";
        document.body.appendChild(mainWindowOpenClose);
        this.mainWindowOpenCloseButtonElement = document.getElementById("ts_main_openclose");
        this.mainWindowOpenCloseButtonElement.style.backgroundColor = "white";
        this.mainWindowOpenCloseButtonElement.style.height = "20px";
        this.mainWindowOpenCloseButtonElement.style.width = "98%";
        this.mainWindowOpenCloseButtonElement.innerText = `TestSuiteTools [${this.Data.InstanceName}]`;
        this.mainWindowOpenCloseButtonElement.onclick = openCloseMainWindow.bind(this);
        
        

    }

    BuildTestBeds(){
            
            var testBed = this.Data.TestBeds;
            if (testBed.TestScenarios[0].TestCases.length > 0){
            
                this.testBedElements = [];
                this.testBedElements.push("")
            
                if(this.testBedElements.length >= 1 ){
                    var heading = document.getElementById("headingMessage");
                    heading.innerHTML = "Loading TestBeds...";

                    for (var testScenario of testBed.TestScenarios){
                        
                        var textField = document.createElement("p");
                            
                            textField.style.backgroundColor = "Black";
                            textField.style.textAlign = "center";
                            textField.style.color = "white";
                            textField.style.fontWeight = "bold";
                            textField.style.fontSize = "40px"
                            textField.style.width = "95%";
                            textField.style.borderRadius = "10px";
                            textField.style.padding = "20px";
                            textField.style.position = "relative";
                            textField.style.marginBottom = "10px";
                            textField.innerHTML = "TEST SCENARIO: " + testScenario.Name;
                            
                            this.scrollWindowElement.appendChild(textField);
                        this.BuildTestScenarios(textField,this.scrollWindowElement,testScenario);
                            
                    }

                    var heading = document.getElementById("headingMessage");
                    heading.innerHTML = "Building TestScenarios...";
            
                }

                var heading = document.getElementById("headingMessage");
                heading.innerHTML = "TESTING COMPLETE...";
                heading.style.borderWidth = "1px";
                                heading.style.borderStyle = "dashed";
                                heading.style.borderColor = "black";
                                heading.style.backgroundColor = "white";
                                heading.style.color = "darkgrey";

            
            }
        
    }

    BuildTestScenarios(textField,testBedElement,testScenario){

            var testResults;
            
        if(testScenario.TestCases.length > 0){
            
            testResults = testScenario.GenerateTestResults().replace(/[,]+/g," ");

            if (testScenario.Passed == false){
                textField.style.backgroundColor = "red";
            }else{
                textField.style.backgroundColor = "Black";
            }

            testScenario.cloneAndAddListener();

            if (testScenario.Passed == false){
                textField.style.backgroundColor = "red";
            }else{
                textField.style.backgroundColor = "Black";
            }

            var testResultsCon = document.createElement("div");
            testBedElement.appendChild(testResultsCon);
            var testResultsContainer = testResultsCon;
            testResultsContainer.id = "TestScenario_" + testScenario.Name + "_container";
            testResultsContainer.style.position = "absolute";
            testResultsContainer.style.display = "block";
            testResultsContainer.style.width = "90%";
            //testResultsContainer.style.overflowY = "scroll";
            testResultsContainer.style.padding = "20px";
            
            testBedElement.style.textAlign = "center";
            testBedElement.style.fontFamily = "Helvetica";


            var testResultPanel = document.createElement("div");
            testResultPanel.style.position = "relative";
            testResultPanel.style.textAlign = "center";
            testResultPanel.style.overflowX = "scroll";
            testResultPanel.style.overflowY = "hidden";
            testResultPanel.style.whiteSpace = "nowrap";
            testResultPanel.style.display = "inline-block";
            testResultPanel.style.width = "90%";
            testResultPanel.style.height = "500px";
            testResultPanel.style.padding = "200px";
            testResultPanel.style.borderRadius = "50px";
            testResultPanel.style.backgroundColor = "none";
            testResultPanel.style.backgroundBlendMode = "overlay";
            testResultPanel.style.background - "rgba(0,0,0,0.5)";
            testResultPanel.style.padding = "5px";
            testResultPanel.style.paddingTop = "50px";
            testResultPanel.style.paddingBottom = "50px";
            testResultPanel.style.margin = "20px";
            //testResultPanel.style.boxShadow = "10px 10px lightblue";
            testResultsContainer.appendChild(testResultPanel);
        
            var textField = document.createElement('p');
            textField.style.margin = "10px";
                            textField.style.fontFamily = "Helvetica";
            
            textField.style.color = "black";
            textField.style.fontWeight = "bold";
            textField.style.fontSize = "20px"
                                textField.style.width = "95%";
                                textField.style.borderRadius = "10px";
                                textField.style.padding = "20px";
                                textField.style.paddingBottom = "630px";
                                textField.style.backgroundColor = "none";
                                textField.style.backgroundBlendMode = "none";
                                textField.style.whiteSpace = "wrap";
                                textField.style.textAlign = "left";
                                textField.style.position = "relative";
                                textField.style.pointerEvents = "none";
                                textField.style.marginBottom = "50px";
                                textField.style.borderRadius = "20px";
                                textField.style.borderWidth = "1px";
                                textField.style.borderStyle = "dashed";
                                textField.style.borderColor = "black";
                                textField.innerHTML = "TEST_CASES:"
                                this.scrollWindowElement.appendChild(textField);


                                var heading = document.getElementById("headingMessage");
                                heading.innerHTML = "Building TestCases...";
            //Generate Test Case Presentations
            for (var testCase of testScenario.TestCases){
                var testCaseElement = document.createElement('div');
                testCaseElement.style.display = "inline-block";
                testCaseElement.style.position = "relative";
                testCaseElement.class = "TestBed_" + testCase.Name + "_container";
                testCaseElement.style.height = "content";
                testCaseElement.style.width = "100%";
                testCaseElement.style.padding = "10px";
                
                testCaseElement.style.backgroundColor = "lightgrey";
                this.testCaseElements = [];
                this.testCaseElements.push(testCaseElement);

                this.BuildTestCases(testResultPanel,testCaseElement,testScenario,testCase);

                

                
            }

            var heading = document.getElementById("headingMessage");
                    heading.innerHTML = "Loading User Interface...";
            
            //CREATE seperator.
            var seperatorString = `------------------------------------------------------------`;
            var seperator = document.createElement("p");
            seperator.textContent = seperatorString;
            seperator.style.fontWeight = "bold";
            testResultsContainer.appendChild(seperator);
    
    
            //CREATE Test title
            var titleResult = document.createElement("p");
            titleResult.textContent = `TEST: [${testScenario.Name.toUpperCase()}]  RESULTS:`;
            titleResult.style.fontWeight = "bold";
            testResultsContainer.appendChild(titleResult);
        
            //PRINT Test Results to text field
            var textField = document.createElement("textarea");
            textField.id = "testResultArea";
            textField.cols = 100;
            textField.rows = 15;
            textField.innerHTML = testResults;
            textField.disabled = "disabled";
            testResultsContainer.appendChild(textField);
    
            //ADD break lines
            var breakLine = document.createElement("br");
            var breakLine2 = document.createElement("br");
            var breakLine3 = document.createElement("br");
            var breakLine4 = document.createElement("br");
    
            testResultsContainer.appendChild(breakLine);
            testResultsContainer.appendChild(breakLine4);
    
            //SAVE BUTTON 
            var file = new Blob([testResults], {type: "text/javascript"});
            var fileName = `TB_${testScenario.Name}_results.txt`
            var saveButton = document.createElement("button");
            saveButton.style.padding = "10px";
            saveButton.style.fontFamily = "Helvetica";
            saveButton.style.fontWeight = "bold";
            saveButton.style.textAlign = "center";
            saveButton.style.border = "none";
            saveButton.style.boxShadow = "3px 3px";
            saveButton.style.borderRadius = "0px 0px 10px 10px";
            saveButton.style.backgroundColor = "orange";
            var func = function (){testScenario.saveToFile(file, fileName)};
            saveButton.onclick = func.bind(this.Data.TestBeds.TestScenarios[0]);
            saveButton.innerHTML = "Save To File";
            saveButton.style.color = "black";
            testResultsContainer.appendChild(saveButton);
            testResultsContainer.appendChild(breakLine2);
            testResultsContainer.appendChild(breakLine3);
    
            var seperator2 = document.createElement("p");
            seperator2.textContent = seperatorString;
            seperator2.style.fontWeight = "bold";
            testResultsContainer.appendChild(seperator2);
    
            //RESET LINK
            var resetLink = document.createElement("a");
            resetLink.href = "debug1_corrected.html"
            resetLink.innerHTML = "Reset Page";
            testResultsContainer.appendChild(resetLink);
    
            //DISABLE run test button

            //
            //var runButt = document.getElementById("runTest");
            //runButt.disabled = true;
            
            //RUN POST TEST CALLBACK
            testScenario.RunPostTestCallback();
            this.mainWindowOpenCloseButtonElement.click();

            
        }

            window.sessionStorage.setItem("testBedsRun", true);
            
         

    }
    BuildTestCases(testResultsContainer,testCaseElement,testScenario,testCase){
        
            //testCaseElement.style.overflowY = "scroll";
            //testBedElement.style.pointerEvents = "none";

            //Create Test Case Info:
            var propertyNames = ["TestName","TestType","TestData","TestResult","ExpectedResult","FunctionToTest","ErrorType","Time"];
            var testCaseElement = document.createElement('div');
            testCaseElement.style.display = "inline-block";
            testCaseElement.style.position = "relative";
            testCaseElement.class = "TestBed_" + testCase.Name + "_container";
            for (var property in testCase){
                if (Object.prototype.hasOwnProperty.call(testCase,property)){
                    for (var name of propertyNames){
                        if(property == name){
                            var textField = document.createElement('p');
                            textField.style.margin = "5px";
                            textField.style.fontFamily = "Helvetica";
                            
                            if (property == "TestName"){
                                textField.style.backgroundColor = "Black";
                                textField.style.color = "white";
                                textField.style.fontStyle = "bold";
                                textField.style.fontSize = "20px"
                                textField.style.width = "90%";
                                textField.style.borderRadius = "10px";
                                textField.style.padding = "20px";
                                textField.style.whiteSpace = "wrap";
                                textField.style.verticalAlign = "middle";
                                textField.style.position = "relative";
                                textField.style.marginBottom = "10px";

                            }else{
                                textField.style.padding = "5px";
                                textField.style.backgroundColor = "lightgrey";
                                textField.style.fontSize = "12px"
                                textField.style.color = "black";
                                textField.style.borderRadius = "15px";
                                textField.style.whiteSpace = "wrap";
                            }
                            
                           
                            if (typeof(testCase[property]) == 'function'){
                                textField.innerHTML = `<b>${property.toUpperCase()}<b> : ${testCase.getNameOfFunction(testCase[property])}`;
                            }else{
                                textField.innerHTML = `<b>${property.toUpperCase()}<b> : ${testCase[property]}`;
                            }
                            testCaseElement.appendChild(textField);
            
                        }
                    }
                    
                    
                    
                }
                
            }
            
            //PASS FAIL BUTTON
            var passFailButton = document.createElement('div');
            var br= document.createElement('br');

            passFailButton.style.fontFamily = "Helvetica";
            passFailButton.style.fontWeight = "bold";
            passFailButton.style.fontSize = "20px";
            passFailButton.style.margin = "10px";
            passFailButton.style.padding = "30px";
            passFailButton.style.marginTop = "20px";
            passFailButton.style.textAlign = "center";
            
            
            passFailButton.style.width = "content";
            passFailButton.style.borderRadius = "15px";
            
            if (testCase.Passed == true){
                passFailButton.innerHTML = "PASSED";
                passFailButton.style.backgroundColor = "lightgreen";
                testCaseElement.style.backgroundColor = "green";
            }else{
                passFailButton.innerHTML = "FAILED";
                passFailButton.style.color = "white";
                passFailButton.style.borderStyle = "dashed";
                passFailButton.style.borderWidth = "2px";
                passFailButton.style.borderColor = "white";
                passFailButton.style.backgroundColor = "#DC143C";
                testCaseElement.style.backgroundColor = "red";
                testCaseElement.style.borderStyle = "dashed";
                testCaseElement.style.borderWidth = "2px";
                testCaseElement.style.borderColor = "white";
            }
            testCaseElement.style.margin = "20px";
            testCaseElement.style.padding = "20px";
           
            testCaseElement.style.borderRadius = "20px";
            testCaseElement.style.width = "33.33%";
            
            
            testCaseElement.appendChild(passFailButton);
            
            testCaseElement.appendChild(br);

            testResultsContainer.appendChild(testCaseElement);
            
    }
}