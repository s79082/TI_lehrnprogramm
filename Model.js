class Model {

  username = 'test_s79082@gmail.com';
  password = 'secret';
  /*questions = { 
      "teil-mathe": [
        {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
        {"a":"x^2*x^2", "l":["x^4","x^2","2x^2","4x"]}
        ],
      "teil-internettechnologien": [
        {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]},
        ],
      "teil-allgemein": [
        {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
        ]};
*/
  constructor() {
    this.questions = [];
    //this.load();
  }


  // gets one task
  getQuestionAndAnswers(topic, question_index) {
    //return this.getTasks(topic)[question_index];
    return this.questions[topic][question_index];
  }

  // gets all tasks of a topic
  getTasks(topic) {
    //console.log(await this.getAllTasks())
    //await this.getAllTasks();
    //const result = this.getAllTasks().filter((task) => task.title ===topic);
    //const result = this.getAllTasks().then((x)=>console.log(x.json()));
    //var result =this.getAllTasks();

    this.getAllTasks()
    const tasks = this.questions;
    //const te = this.getAllTasks()

    //var tasks;
    //const response = await fetch(url, {method: 'GET', headers: headers});

    //const json = await response.json();
    //const tasks = await json.content;
    /*
    tasks = await fetch(url, {method: 'GET', headers: headers}).then((res)=> res.json())
    .then(x => x.content)
    .then(
      (quest) => quest.filter((task) => task.title == "REST")
    ).then(x => console.log(x))
*/
    //var result = this.questions;
    //var res = this.questions.filter((task) => task.title === topic)
    console.log("tasks")
    //const tasks = this.questions;
    console.log(tasks)
    let tmp = tasks.filter((task) => task.title === topic);
    console.log(tmp)

    return tmp;
    //return this.questions[topic];
  }

  // gets a list of all topics
  getTopics() {
    /*
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
    let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes';

    //var tasks;
    const response = await fetch(url, {method: 'GET', headers: headers});

    const json = await response.json();
    const tasks = await json.content;

    */

    //const tasks = this.getAllTasks().then(alert).then((tasks) => tasks.forEach(element => {
    // console.log(element)
    //}));
    //const tasks = this.getAllTasks().then(console.log);
    this.getAllTasks();
    console.log(this.questions);
    let topics = [];
    this.questions.forEach(element => {
      topics.push(element.title)
    });

    // filter duplicates
    let tmp = topics.filter((value, index, self) => self.indexOf(value) === index);

    console.log(topics)

    return tmp;

  }

  async getAllTasks() {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
    let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes';

    //var tasks;
    const response = await fetch(url, { method: 'GET', headers: headers });

    //const tasks = fetch(url, {method: 'GET', headers: headers}).then(res => res.json())
    // .then(json => json.content);
    //fetch(url, {method: 'GET', headers: headers}).then(x=> this.questions = x.json());
    //console.log(this.questions)
    const json = await response.json();
    const tasks = await json.content;
    //const res = await fetch(url, {method: 'GET', headers: headers});
    //const tasks = await res.content;
    console.log(tasks);
    //this.topics = [];
    //tasks.forEach

    this.questions = tasks;
    console.log(this.questions);
    //return this.questions;

    //return tasks;
  }
  setTasks(t) {
    this.questions = t;
    //alert(this.questions);
  }

  load() {
    //this.getAllTasks();
    var tmp;
    var m = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        m.setTasks(JSON.parse(this.responseText).content)
      }
    };
    //xhttp.withCredentials = false;
    xhttp.open("GET", "https://irene.informatik.htw-dresden.de:8888/api/quizzes", true);
    xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));




    xhttp.send();
  }




}