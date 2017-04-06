import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ScoreService {

   scores:FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
  this.scores = angularFire.database.list('score');
  }

  getScores() {
    return this.scores;
  }

  getById(key){
    return this.angularFire.database.object('score/'+key);
  }

  addScore(scoreObj) {
    this.scores.push(scoreObj);
  }

}
