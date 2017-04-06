import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css'],
  providers: [ScoreService]
})
export class LeaderBoardComponent implements OnInit  {
  scores;

  constructor(private ScoreService: ScoreService) { }

  ngOnInit() {
    this.ScoreService.getScores().subscribe(snap => {
      this.scores = snap;
    });

  }

}
