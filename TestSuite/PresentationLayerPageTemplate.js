export class PresentationLayerPageTemplate{
    constructor(nameOfTemplateGroup, templatesToAdd = null){
        this.PageElementTemplates = null; // order of execution for page templates;
        this.Name = nameOfTemplateGroup;
    }

    addTemplate(){}
    removeTemplate(){}

}
