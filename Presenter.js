// only the Presenter manipulates the DOM to display the App

class Presenter
{

    constructor(view, answer_list, question_label, stats_label, dropdown)
    {
        this.answer_list = answer_list;
        this.question_label = question_label;
        this.stats_label = stats_label;
        this.dropdown = dropdown;
        this.view = view;
        this.buttons = []
    }

    displayAnswers(answers)
    {
    
        // clear answer list
        this.clearChilds(this.answer_list);

        var index_count = 0;

       answers.forEach(element => {
          // for(var element in answers){
            var item = document.createElement("LI");

            // save the index in the list item
            item.value = index_count.toString();
            index_count++;

            var btn = document.createElement("BUTTON");
            btn.innerText = element;
            btn.setAttribute("class", "btn")

            btn.addEventListener("click", (event) =>
                // give the list item value back to view; its the selected index
                this.view.on_answer_selected(event.target.parentElement.value)
            );




        //btn.onclick = answer_button_callback;
        /*btn.onclick = (event) =>
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
        }*/
        item.appendChild(btn);
        this.answer_list.appendChild(item);
    }
    );
    this.buttons = document.querySelectorAll("ol#answer_list button");
    }

    displayQuestion(question)
    {
        this.question_label.innerHTML = question;

    }

    displayStats(right, wrong, total)
    {
        this.clearChilds(this.answer_list);
        this.clearChilds(this.question_label);
        this.stats_label.innerHTML = "Herzlichen Glückwunsch! Du hast von "+ total+ " Fragen " + right +" richtig und "+ wrong + " falsch beantwortet :)";
    }

    displayTopicSelection()
    {

    }

    colorButton(button_index, color)
    {
        console.log("SE");
        //document.querySelectorAll("ol#answer_list button")[button_index].style.background = color
        this.buttons[button_index].style.background = color;
    }

    clearChilds(parent)
    {
        while (parent.firstChild != null)
        {
            parent.removeChild(parent.firstChild);
        }
    }
}