import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'

type Question = {
  'id': number,
  'question': string,
  'options':
    { 'id': number, 'name': string, 'alias': string }[]
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  title: string = ""
  questions: Question[];
  questionSelected: Question;
  answers: string[] = []
  result: string = "";
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  constructor(){
    this.finished = false;
    this.title = quiz_questions.title;
    this.questions = quiz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length;
  }

  playerChoice(alias: string) {
    this.answers.push(alias);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex += 1;
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = this.checkResult(this.answers);
      this.finished = true;
      this.result = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results];
    }
  }

  checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }

}
