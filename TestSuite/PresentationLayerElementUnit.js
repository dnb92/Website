import { PresentationLayerElementAttribute } from './PresentationLayerElementAttribute.js';
import { PresentationLayerElementStyle } from './PresentationLayerElementStyle.js';

//This makes indiviual elements and stores their style changes
export class PresentationLayerElementUnit{
    constructor(parentToRenderTo,nameOfPresentationUnit,elementType,elementID,elementClass = null){
        this.ParentToRenderTo = parentToRenderTo;
        this.Name = nameOfPresentationUnit
        this.ElementType = elementType; //add validation here to check that valid element is given.
        this.ElementID = elementID;
        this.ElementClass = elementClass;
        this.Element = null;
        this.Style = null;
        this.EventType = null;
        this.EventHandler = null;
        this.createElement();
    }

    createElement(){
        var newElement = document.createElement(this.ElementType);
        newElement.id = this.ElementID;
        newElement.class = this.ElementClass;
        this.Element = newElement;
    }

    addAttributeChange(elementAttributeName, value, renderChange = false){
        for (var property in this.Element){
            if(Object.prototype.hasOwnProperty.call(this.Element, property)){
                if (property == elementAttributeName){
                    var attributeChange = new PresentationLayerElementAttribute(this.Element,property,value);
                    if (this.Style == null){
                        var style = new PresentationLayerElementStyle(this.Name,this.ElementType);
                        style.addAttributeStyle(attributeChange);
                        this.Style = style;
                    }else {
                        for (var attribute in this.Style.AttributeStyles){
                            if (attribute.Name == elementAttributeName){
                                attribute.Value = value;
                                if (renderChange == true){
                                    attribute.applyAttributeChange();
                                }
                            }
                        }
                        this.Style.addAttrributeStyle(attributeChange);
                    }
                    
                }
            }
        }
    }


    changeEventListener(overwrite = false, eventHandler, eventType){
        if (overwrite == false){
            this.EventType = eventType;
            this.EventHandler = eventHandler;
            this.Element.addEventEventListener(this.EventType,this.EventHandler);
        }else{
            this.Element.removeEventListener(this.EventType,this.EventHandler);
            this.EventType = eventType;
            this.EventHandler = eventHandler;
            this.Element.addEventEventListener(this.EventType,this.EventHandler);
        }
    }


    renderElement(changeParent = null){
        if (changeParent == null){
            this.Style.applyStyle();
            this.ParentToRenderTo.appendChild(this.Element);
        }else{
            this.ParentToRenderTo = changeParent;
            this.Style.applyStyle();
            this.ParentToRenderTo.appendChild(this.Element);
        }
        
    }

    //ADD a remove/move feature to remove all elements from parent so you can reapply them to another parent without changing their names or at a later time.
    //ADD a feature to run a name change on all elements so they can be added to a new parent and not have name conflicts on the page
    //basically a COPY function where it passes back the object with new names so you can apply it again without conflicts.
    //ADD functionality where if someone adds a PrsentationLayerElementUnit when applying parents it will search for the Element field of that elementUnit that has 
    //been set as this elementUnits parent. It is currently designed to hold a document.getelementbyid object, but i think that in the future all parents
    // and elements should be an ElementUnit and we are just passing element units around. Maybe we could have an elementUnit mover object that will move the elements.
    //need to look at whether a functional or more oop approach is best.
    //create a mode that only allows one type of element so we can create stricter rules. Maybe we could make a ElementUnitFactory
    //that congifgures element units to spec so they can be used on a pagetemplate or other kinds.
    //A static class for each template made that returns all templates to to level presenationLayer to be accessable for all application.
}