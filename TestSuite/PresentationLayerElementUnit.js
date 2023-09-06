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
        this.createElement();
    }

    createElement(){
        var newElement = document.createElement(this.ElementType);
        newElement.id = this.ElementID;
        newElement.class = this.ElementClass;
        this.Element = newElement;
    }

    addAttributeChange(elementAttributeName, value){
        for (var property in this.Element){
            if(Object.prototype.hasOwnProperty.call(this.Element, property)){
                if (property == elementAttributeName){
                    var attributeChange = new PresentationLayerElementAttribute(this.Element,property,value);
                    if (this.Style == null){
                        var style = new PresentationLayerElementStyle(this.Name,this.ElementType);
                        style.addAttributeStyle(attributeChange);
                        this.Style = style;
                    }else{
                        this.Style.addAttrributeStyle(attributeChange);
                    }
                    
                }
                
            }
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

}