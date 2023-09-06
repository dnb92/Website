export class PresentationLayerElementAttribute{
    constructor(element,attribute, value){
        this.Element = element;
        this.Property = attribute;
        this.Value = value;
        this.EventType = null;
        this.EventHandler = null;
    }

    applyAttributeChange(eventListener = false){
        for (var property in this.Element){
            if (Object.prototype.hasOwnProperty.call(this.Element, this.Property)){
                if (eventListener == false){
                    property = this.Value;
                }else{
                    if (this.EventHandler != null && this.EventType != null){
                        property.addEventListener(this.EventType, this.EventHandler);
                    }
                    
                }
                
            }
        }
        
    }

    createEventListener(){
        this.applyAttributeChange(true);
    }

    updateEventListener(eventType,callbackFunction){
        this.EventType = eventType;
        this.EventHandler = callbackFunction;
    }
}