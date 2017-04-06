import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../score.service';
import { DifficultySortPipe } from '../difficulty-sort.pipe';


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css'],
  providers: [ScoreService]
})
export class LeaderBoardComponent implements OnInit  {
  scores;
  selectedScore = false;
  difficulty = "all";

  constructor(private ScoreService: ScoreService, private Router: Router) { }

  ngOnInit() {
    this.ScoreService.getScores().subscribe(snap => {
      this.scores = snap;

       this.scores = this.scores.sort(function(a, b){
         console.log(a.finalScore + " : " + b.finalScore);
        if(a.finalScore < b.finalScore){
          return -1;
        }
        if(a.finalScore > b.finalScore){
          return 1;
        }
        return 0;
      });

    });
  }
  selectScore(score){
    this.selectedScore = score;
  }

  editScore(score) {
    this.ScoreService.editScore(score);
  }

  delete(score) {
    if(confirm("Are you sure you want to delete this name?")) {
      this.ScoreService.deleteScore(score)
    }
  }

  challengeScore(e, score){
    e.preventDefault();
    this.Router.navigate(["challenge",score.$key]);
  }

}
