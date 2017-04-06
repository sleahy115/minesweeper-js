import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.component.html',
  styleUrls: ['./new-score.component.css']
})
export class NewScoreComponent implements OnInit {
  @Input() finalScore;
  @Input() difficulty;
  @Input() gameOver;
  @Output() newScore = new EventEmitter();

  submitScore(newInitials) {

    this.newScore.emit(
      {
      finalScore: this.finalScore,
      difficulty: this.difficulty,
      initials: newInitials
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
