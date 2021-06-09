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
        this.buttons = []
        answers.forEach(element => {
          // for(var element in answers){
            var item = document.createElement("LI");

            // save the index in the list item
            item.value = index_count.toString();
            index_count++;
            
            var btn = document.createElement("BUTTON");
            btn.innerText = element;
            btn.setAttribute("class", "btn")

            btn.addEventListener("click", (event) => {
                // give the list item value back to view; its the selected index

                this.buttons.forEach((button) =>
                    button.disabled = true);

                this.view.on_answer_selected(event.target.parentElement.value)
            });

            this.buttons.push(btn);
            console.log(this.buttons);

            item.appendChild(btn);
            this.answer_list.appendChild(item);
        });
    //this.buttons = document.querySelectorAll("ol#answer_list button");
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

    displayTopicSelection(topics)
    {
        this.clearChilds(this.dropdown);

        topics.forEach((topic) =>
        {
            var option = document.createElement("OPTION");
            option.setAttribute("value", topic);
            option.innerHTML = topic.replace("teil-", "");
            this.dropdown.appendChild(option);
        });

        this.dropdown.addEventListener("change", (event) =>
        {   
            this.clearChilds(this.stats_label);
            this.view.on_topic_selected(this.dropdown.value)
        });
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