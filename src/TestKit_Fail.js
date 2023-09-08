//----------------------------------------------------------------------------
//TEST_KIT -- This is where testing methodology is implemented using TestSuite
//----------------------------------------------------------------------------

//DIRECTIONS: every TestSuite must be made global using "window". Every TestBed must have a callback function for adding 
// TestScenarios, naming convention is "[testBedName]_[TestName]_CallBack". Callback will call "GenerateTestReport" to render to Page;
// To implement the test you need to import "createTestBeds()" on your main JS file for your site then call it. Once run, the test Beds,
// are created as global variables. Then in the main JS file you need to call the TestBed.EnableTest() method to see the "Run Test" button
// at the bottom of your webpage. When this button is pressed it will call the TestBed Callback function then "TestBed.GenerateTestReport()"
// The report will be printed out in a textarea box that is not editable, you can press "Save To File" to download the test results.


//!!REQUIRED!!
//TestSuite.js and main js method you want to test are only dependencies needed to run.
//NEEDED To setup testing environment and run tests
import { TestSuite } from './TestSuite.js';
import { getMarks } from "../js/debug1_solution.js";


//Demostration only
import { passEventHandler } from '../js/debug1_solution.js';


//TESTSUITES for TestSuite.
var testSuiteNames = ["TestSuite1FAIL","TestBed1"];
var testSuite = createTestSuite(testSuiteNames[0],(testSuiteNames[0] + "__" + testSuiteNames[1]));


//!!REQUIRED!!
//DEFINE TestSuite AND ITS TestBeds
function createTestSuite(testSuiteName, testBedName){
    var testSuiteObject1 = new TestSuite(testSuiteName,testBedName);
    testSuiteObject1.TestBeds.AddTestScenario_AllTypes(`${testBedName}__Scenario1`,testScenario1_testsCallback,testScenario1_postTestsCallback);
    return testSuiteObject1;
}


//!!REQUIRED!!
//IMPORTED by main JS file, this is how we enable and disable Tests.
export function enableTestEnvironment(enabled = true){
      if (window.sessionStorage.getItem(testSuite.defaultSessionStorageItemName) == null){
        window.testSuiteTools.enabled = enabled;
      }else{
        window.testSuiteTools.enabled = JSON.parse(window.sessionStorage.getItem(testSuite.defaultSessionStorageItemName));
      }
}

//!!REQUIRED!!
//CALLBACK FUNCTION - required for any TestBed, Each test bed will have its own callback function to add TestScenarios.
//Make sure you follow this naming convention: "[testBedVariableName]_Tests_Callback(testBed)"
function testScenario1_testsCallback(testScenario){
    
    //DATASET first test
    let testDataOne = [10,12,16,14,18];
    let testDataOneExpectedResult = [71,15];
    
    //DATASET second test
    let testDataTwo = [17,17,19,20,17];
    let testDataTwoExpectedResult = [91,19];
    
    //DATASET Third Test
    let testDataThree = ["A","B","D","A","C"];
  
    
    //ADD testScenarios to testBed in order you would like them to be tested.
    testScenario.AddTestCase_InputOutput("Test One: Integer Data",testDataOne,getMarks,testDataOneExpectedResult);
    testScenario.AddTestCase_InputOutput("Test One: HTML Text",testDataOne,testFunction_CheckHTMLValues,testDataOneExpectedResult);
    testScenario.AddTestCase_InputOutput("Test Two: Integer Data",testDataTwo,getMarks,testDataTwoExpectedResult);
    testScenario.AddTestCase_InputOutput("Test Two: HTML Text",testDataTwo,testFunction_CheckHTMLValues,testDataTwoExpectedResult);
    testScenario.AddTestCase_ErrorFound("Test Three: Letter Data",testDataThree,getMarks,"", EvalError);

}

//OPTIONAL function to call once testBed test are completed, the TestBed is passed so you can operate on the testbed after testing complete.
function testScenario1_postTestsCallback(testScenario){
    
    var testString = ` post_test_callback: \n [TESTING COMPLETE]\n [TEST_SCENARIO NAME: ${testScenario.Name}] |`
    var testResult;
    testResult = testString + `\n [PASSED: [${testScenario.Passed.toString().toUpperCase()}] ]\n [DATE: ${testScenario.DateTestCompleted.toString()}] \n [TIME: ${testScenario.TimeTestCompleted.toString()}]`
    alert(testResult);
    
}

//OPTIONAL ADDITIONAL CUSTOM TEST FUNCTION for getting HTML values on the page.
function testFunction_CheckHTMLValues(){
  let av = document.getElementById("average").innerHTML;
  let sum = document.getElementById("sum").innerHTML;

  let avNumber = parseInt(av.substring(av.length - 3, av.length));
  let sumNumber = parseInt(sum.substring(sum.length - 3, sum.length));
  return [sumNumber,avNumber];
}




