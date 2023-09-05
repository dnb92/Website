import { TestSuiteProperties } from "./TestSuiteProperties.js";
import { TestSuiteToolsEventHandler } from "./TestSuiteToolsEventHandler.js"
import { TestSuitePropertiesEventHandlers } from "./TestSuitePropertiesEventHandlers.js";
import { TestSuitePresentationLayer } from "./TestSuitePresentationLayer.js";
import { TestBed } from "./TestBed.js";

export class TestSuite{
    constructor(testSuiteInstanceName, testBedName){
        this.InstanceName = testSuiteInstanceName;
        this.PresentationLayer = new TestSuitePresentationLayer(this);
        this.TestBeds = new TestBed(testBedName); //ONLY ONE ALLOWED ATM
        this.defaultTestSuiteToolsName = "testSuiteTools";
        this.defaultPropertyName = "enabled"
        this.defaultSessionStorageItemName = this.defaultTestSuiteToolsName + "_" + this.defaultPropertyName;
        this.divIdName = this.InstanceName + "_div";
        this.#createConsoleTestSuiteTools();

    }

    AddTestBed(name){
        if (this.TestScenarios.indexOf(testBed => testBed.Name == name) != -1){
            throw new Error(`[${name}] Already Exists for an existing TestBed, please enter unique name`);
        }else{
            var testBed = new TestBed(name);
            this.TestBeds.push(testBed);
            console.log(`TestBed: [${name}] Added Successfully.`)
        }
}

    GetTestBed(testBedName){
        this.TestBeds.forEach(function(testBed) { if (testBed.Name == testBedName){
            return test;
        }});
    }

    ToggleAllTestBeds(enabled){
        if (this.TestBeds.length > 0){
            this.TestBeds.forEach(function (testBed){testBed.ToggleAllTestScenarios(enabled)});
        }
    }



    #assignEventsToProperties(testSuiteProperties,eventHandlers,parentNameForAllCustomEvents,i,max){
                var eventhandlers = eventHandlers;

                for (var property in testSuiteProperties) {
                    
                    var eventName = `${parentNameForAllCustomEvents}_${property}`; //Create event name

                    //Create Session Data Variable for eventName.
                    if (window.sessionStorage.getItem(eventName) == null){
                        window.sessionStorage.setItem(eventName, "false");
                    }

                    if (i < max){
                        if (Object.prototype.hasOwnProperty.call(testSuiteProperties, property)) { //check property to see if it is unique to class
                            i = i + 1;
                            Object.defineProperty(testSuiteProperties, property, { //define property setter to create event when property is set
                                set: function(value) {
                                    //SET new value to property
                                    property = value;
                                
                                    var testSuiteEvent = new CustomEvent(eventName, { detail: { value: value} });
                                        
                                    //DISPATCH event
                                    document.dispatchEvent(testSuiteEvent);
                                },
                                get: function() {
                                    // Return the current value
                                    return property;
                                },
                                enumerable: true
                            });
                            
                            var eventHandlersFound = [];
                            var eventHandlerFound = null;
                            //CHECK EventHandlers for handlers that match property
                            var check = eventHandlers[0];
                            for (let eventH of eventHandlers){
                                
                                if(eventH.PropertyName == property){
                                    eventHandlersFound.push(eventH);
                                    if (eventHandlerFound == null){
                                        eventHandlerFound = eventH;
                                    }
                                }
                            }

                            if (eventHandlersFound.length > 1){
                                return Error(`MULTIPLE_EVENT_HANDLERS_FOUND_FOR_PROPERTY: ${eventHandlerFound.foreach(handler => {return `${handler.name} `})} `)
                            }else if(eventHandlersFound.length == 1){
                                document.addEventListener(eventName, eventHandlerFound.EventHandler.bind(this)); //creat an event listener on DOM and add event handler to that event
                                console.log(`EVENT_LISTENER_FOR_EVENT: [${eventName}] CREATED`);
                            }else{
                                return Error("NO_EVENT_HANDLER_FOUND_WITH_MATCHING_PROPERTY_NAME");
                            }
                        }
                            
                    }
                }
    }
    #assignEventsToPropertiesOnObject(testSuiteProperties, parentNameForAllCustomEvents){
        
        var eventHandlers = testSuiteProperties.tspEventHandlers;
        var eventHCheck = eventHandlers[0];
        var i = 0;
        var max = Object.keys(testSuiteProperties.baseObject).length;
        var inputType = testSuiteProperties.baseObject.constructor.name;

        //THIS STAGE CHECKS FOR EXPECTED "TestSuiteProperties" Type, if it is not that type algorthm will run general purpose use case which basically checks that all eventHandlers given to it are actually event handlers 
        if (inputType == "TestSuiteProperties" ){
            this.#assignEventsToProperties(testSuiteProperties.baseObject,eventHandlers,parentNameForAllCustomEvents,i,max);
        }else{
            if (eventHandlers.length == max){
                let ieventCounter = 0;
                let eventsThatAreNotAnEvent = [];
                eventHandlers.foreach((eventHandler) => { if (typeof(eventHandler) == "function"){ieventCounter = ievent++;}else{eventsThatAreNotAnEvent.push(ievent);ieventCounter = ievent++;}});//check 
                
                if (eventsThatAreNotAnEvent.length == 0){
    
                    this.#assignEventsToProperties(testSuiteProperties.baseObject,eventHandlers,parentNameForAllCustomEvents,i,max);
                    
                }else{
                    
                    return Error(`EVENT_HANDLERS_THAT_ARE_NOT_AN_EVENT: [${eventsThatAreNotAnEvent.toString()}]`);
                }
                
            }else{
                let result;
                let moreLess;
                if (max > eventHandlers.Length){
                    result = Math.abs(max - eventHandler.length);
                    moreLess = "more";
                }else if (max < eventHandlers.length){
                    result = Math.abs(eventHandler.length - max);
                    moreLess = "less";
                }
                return Error(`Event_Handlers_Range_Error: ${result} ${moreLess} event handlers needed. Please enter only ${max} events into eventHandler argument, you provided ${eventHandlers.length}`);
            } 
        }

    }

    #createConsoleTestSuiteTools(){
        if (!window.testSuiteTools){
            
            //Create window variable
            window.testSuiteTools = new TestSuiteProperties();

            var tspEventHandlers = new TestSuitePropertiesEventHandlers(window.testSuiteTools);


            var testSuiteToolsEventHandler = function(e) {
                        
                window.sessionStorage.setItem(e.type,JSON.stringify(e.detail.value));
                if (e.detail.value == true){
                    console.log(`${e.type} : Enabled`);
                }else{
                    console.log(`${e.type} : Disabled`);        
                }
                    
                
                this.PresentationLayer.EnableTestSuiteTools(JSON.parse(window.sessionStorage.getItem(e.type)));
                
            };


            tspEventHandlers.AddNewTstEventHandler(testSuiteToolsEventHandler,this.defaultPropertyName);

            this.#assignEventsToPropertiesOnObject(tspEventHandlers,this.defaultTestSuiteToolsName);

            
            
            
        }
    }
}