export class PresentationLayerElementAttribute{
    constructor(element,attribute, value){
        this.Element = element;
        this.Property = attribute;
        this.Value = value;
    }

    applyAttributeChange(eventListener = false){
        for (var property in this.Element){
            if (Object.prototype.hasOwnProperty.call(this.Element, this.Property)){
                    property = this.Value;
            }
        }
        
    }
}