// only the Presenter manipulates the DOM to display the App

import { View } from "./View";

export class Presenter
{
    answer_list: any;
    question_label: any;
    stats_label: any;
    view: View;

    constructor(view: View, answer_list, question_label, stats_label)
    {
        this.answer_list = answer_list;
        this.question_label = question_label;
        this.stats_label = stats_label;
        
        this.view = view;
    }

    displayAnswers(answers)
    {
    //answers = questions["teil-mathe"][question_index]["l"];
    console.log(answers);
    //answer_list = document.getElementById("answer_list");

    // clear elements
    this.clearChilds(this.answer_list);

    // save correct answer
    var correct = answers[0];

    // shuffle answers 
    answers = answers.sort(() => Math.random() - 0.5);

    // get correct answer index
    var correct_idx = answers.indexOf(correct);

    var index_count = 0;

    answers.forEach(element => {
        var item = <HTMLInputElement> document.createElement("LI");

        // save the index in the list item
        item.value = index_count.toString();
        index_count++;

        var btn = document.createElement("BUTTON");
        btn.innerText = element;

        btn.setAttribute("class", "btn")

        btn.onclick = this.view
        //btn.onclick = answer_button_callback;
        btn.onclick = (event) =>
        {
            // get the index from list item (parent)
            selected_idx = event.target.parentElement.value;
            console.log(selected_idx);
            console.log(correct_idx);

            current_question_index++;

            if (selected_idx == correct_idx)                
                n_correct_answers++;
                
            else
                n_wrong_answers++;
            
            len = questions["teil-mathe"].length;

            console.log(current_question_index);
            console.log(len);
            if (current_question_index < len)
                display_answers(current_question_index);
            else
                display_stats();
        }
        item.appendChild(btn);
        answer_list.appendChild(item);
    });

    }

    displayQuestion(question)
    {
        this.question_label.innerHTML = question;

    }

    displayStats()
    {

    }

    clearChilds(parent)
    {
        while (parent.firstChild != null)
        {
            parent.removeChild(parent.firstChild);
        }
    }
}