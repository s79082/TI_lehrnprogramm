class View {

    constructor(model, presenter) {
        this.model = model;
        this.presenter = presenter;
        this.current_topic = null;
        this.current_question_index = null;
        this.total_questions = null;

        this.correct_answer_index = null;

        this.right_answers = 0;
        this.wrong_answers = 0;
    }

    init() {
        this.current_question_index = 0;
        this.right_answers = 0;
        this.wrong_answers = 0;
    }


    // callback when user selcts another topic; 
    // get the new questions from model;
    // dsisplay them in presenter
    on_topic_selected(topic) {
        this.init();
        this.current_topic = topic;
        //this.current_question_index = 0;
        this.total_questions = this.model.getTasks(topic).length;

        this.sendTask();

    }

    // prepares the answers;
    // sends answers and question to presenter
    sendTask() {
        console.log(this.model);
        //console.log(this.current_topic);
        //console.log(this.current_question_index);
        console.log(this.model.questions)
        const task = this.model.getQuestionAndAnswers(this.current_topic, this.current_question_index);
        console.log(task);
        var answers = task.options;
        var answers = task["l"];
        // save correct answer
        var correct = answers[0];

        // shuffle answers 
        answers = answers.sort(() => Math.random() - 0.5);

        // get correct answer index
        this.correct_answer_index = answers.indexOf(correct);

        this.presenter.displayAnswers(answers);
        //this.presenter.displayQuestion(task.text);
        this.presenter.displayQuestion(task["a"]);
    }

    // callback when user selects an answer button;
    // check if correct; update stats
    // answer_index is provided by presenter,
    on_answer_selected(answer_index) {

        if (this.correct_answer_index == null) {
            console.log("no correct answer");
            return;
        }
        if (answer_index == this.correct_answer_index) {
            this.right_answers++;
            this.presenter.colorButton(answer_index, "green");
        }

        else {
            this.wrong_answers++;
            this.presenter.colorButton(answer_index, "red");

        }
        // next question
        this.current_question_index++;

        // last one?

        if (this.current_question_index >= this.total_questions)
            setTimeout(() => {
                this.presenter.displayStats(this.right_answers, this.wrong_answers, this.total_questions);
                this.init();
            }, 1000);
        else
            setTimeout(() => this.sendTask(), 1000);


    }

    on_again() {
        this.sendTask();
    }
}