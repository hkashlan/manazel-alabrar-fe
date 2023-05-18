import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionComponent } from '../QuestionComponent';

@Component({
  selector: 'app-single-choice',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss', '../question.scss'],
})
export class SingleChoiceComponent extends QuestionComponent {
  selectedAnswer = -1;
  saveValue(value: number) {
    this.selectedAnswer = value;
    super.triggerScore(this.question().answers[this.selectedAnswer].correct);
  }
}
