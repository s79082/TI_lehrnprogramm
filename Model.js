class Model
{
    questions = { 
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

    constructor()
          {
          }

          // depreceated
    getQuestionsAndAnswers(teilgebiet) 
    {
      return this.questions[teilgebiet];
        
    }

    getQuestionAndAnswers(topic, question_index)
    {
        return this.questions[topic][question_index];
    }

    getTasks(topic)
    {
      return this.questions[topic];
    }

    getTopics()
    {
      return Object.keys(this.questions);
    }
          
    
}