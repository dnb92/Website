//var testKitPath = `${window.testKitPath.path}`;
//import { enableTestEnvironment } from testKitPath.toString();




import { TestSuitePresentationLayer } from "./TestSuitePresentationLayer.js";
import { Defaults } from "./Defaults.js";

//DYNAMICLY IMPORT FUNCTION TO TEST, CALLBACKFUNCTION, POSTTESTCALLBACKFUNCTION using TestSuitePresentationLayer.TestKitFile.value  this might be on the presentation layer.


//TESTSUITES for TestSuite.
var testSuiteNames;
var defaults;
var testSuitePresentationLayer;
var testSuite;

function createPresentationLayer(){
  testSuiteNames = ["TestSuitePARTIAL","TestBed1"];
  defaults = new Defaults();
  testSuitePresentationLayer = new TestSuitePresentationLayer(defaults);
}

//var testSuite = createTestSuite(testSuiteNames[0],(testSuiteNames[0] + "__" + testSuiteNames[1]));


//Create testscenario based on testKit functions -- this might need to be in the presentation layer, need to look up how to dynmaically import modules.
function createTestScenario(testScenario1_testsCallback,testScenario1_postTestsCallback){
    testSuitePresentationLayer.Data.TestBeds.AddTestScenario_AllTypes(`${testSuitePresentationLayer.Data.TestBeds.Name}__Scenario1`,testScenario1_testsCallback,testScenario1_postTestsCallback);
}

export function RunTestSuiteTools(enabled = true){
    createPresentationLayer();
    if (window.sessionStorage.getItem(defaults.defaultSessionStorageItemName) == null){
        testSuitePresentationLayer.createConsoleTestSuiteTools();
        window.testSuiteTools.enabled = enabled;
      }else{
        window.testSuiteTools.enabled = enabled;
        window.testSuiteTools.enabled = JSON.parse(window.sessionStorage.getItem(defaults.defaultSessionStorageItemName));
      }

}