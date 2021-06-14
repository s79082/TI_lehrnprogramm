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
    this.questions = new Array();
    this.questions_obj = new Object();
  }


  // gets one task
  getQuestionAndAnswers(topic, question_index) {
    return this.questions_obj[topic][question_index];

  }

  // gets all tasks of a topic
  getTasks(topic) {

    this.getAllTasks();
    return this.questions_obj[topic];
  }

  // gets a list of all topics
  getTopics() {

    this.getAllTasks();
    return this.topics;

  }

  async getAllTasks() {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
    let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes';

    const response = await fetch(url, { method: 'GET', headers: headers });

    const json = await response.json();
    const tasks = await json.content;

    this.trans(tasks);

  }

  trans(tasks_obj) {
    this.topics = [];
    tasks_obj.forEach((task) => {
      // topics = title api
      if (!this.topics.includes(task.title)) {
        this.topics.push(task.title);
        // create new tasks for topics
        this.questions_obj[task.title] = new Array();
      }

      let obj = { "a": task.text, "l": task.options };
      this.questions_obj[task.title].push(obj);
    });
  }



}