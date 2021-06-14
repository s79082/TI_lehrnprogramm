// only the Presenter manipulates the DOM to display the App

class Presenter {

    constructor(view, answer_list, question_label, stats_label, dropdown) {
        this.answer_list = answer_list;
        this.question_label = question_label;
        this.stats_label = stats_label;
        this.dropdown = dropdown;
        this.view = view;
        this.buttons = []
    }

    displayAnswers(answers) {

        // clear answer list
        this.clearChilds(this.answer_list);

        var index_count = 0;
        this.buttons = []
        answers.forEach(element => {

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

            item.appendChild(btn);
            this.answer_list.appendChild(item);
        });
    }

    displayQuestion(question) {
        this.question_label.innerHTML = question;

    }

    displayStats(right, wrong, total) {
        this.clearChilds(this.answer_list);
        this.clearChilds(this.question_label);
        this.stats_label.innerHTML = "Herzlichen Glückwunsch! Du hast von " + total + " Fragen " + right + " richtig und " + wrong + " falsch beantwortet :)";

        var btn = document.createElement("BUTTON");
        btn.innerHTML = "erneut versuchen";
        btn.setAttribute("class", "btn");
        btn.addEventListener("click",
            (event) => {
                this.view.on_again();

                // clear stats
                this.clearChilds(this.stats_label);
                this.clearChilds(btn);
            }
        );

        this.stats_label.appendChild(btn);
    }

    displayTopicSelection(topics) {
        this.clearChilds(this.dropdown);

        topics.forEach((topic) => {
            var option = document.createElement("OPTION");
            option.setAttribute("value", topic);
            var txt = topic.replace("teil-", "");
            txt = txt.charAt(0).toUpperCase() + txt.slice(1);
            option.innerHTML = txt;
            this.dropdown.appendChild(option);
        });

        this.dropdown.addEventListener("change", (event) => {
            this.clearChilds(this.stats_label);
            this.view.on_topic_selected(this.dropdown.value)
        });
    }

    colorButton(button_index, color) {
        this.buttons[button_index].style.background = color;
    }

    clearChilds(parent) {
        while (parent.firstChild != null) {
            parent.removeChild(parent.firstChild);
        }
    }
}