export class View
{

    constructor(model, presenter)
    {
        this.model = model;
        this.presenter = presenter;
    }
    // callback when user selcts another topic; 
    // get the new questions from model;
    // display them in presenter
    on_topic_selected(topic){}

    // callback when user selects an answer button;
    // check if correct; update stats
    // answer_index is provided by presenter,
    on_answer_selected(answer_index){}
}