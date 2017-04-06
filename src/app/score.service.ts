import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ScoreService {

   scores:FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
  this.scores = angularFire.database.list('score');
  }

  getScore() {
    return this.scores;
  }

  addScore(scoreObj) {
    this.scores.push(scoreObj);
  }

}
