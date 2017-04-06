import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NewScoreComponent } from '../new-score/new-score.component';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css'],
  providers: [ScoreService]
})
export class MinesweeperComponent implements OnInit {
  opponentId;
  opponent;

  title = 'app works!';
  difficulty = "beginner";
  numRows:number = 10;
  numCols:number = 10;
  numBombs:number = null;
  rows = [];
  end:string = null;
  win:boolean = false;
  actualBombs: number = 0;
  markedBombs:number = 0;
  score:number = 0;
  finalScore:number = 0;
  timerInterval;

  constructor(private route: ActivatedRoute, private ScoreService: ScoreService, private Router: Router){}
  ngOnInit(){
    this.route.params.forEach((urlParameters) => {
      this.opponentId = urlParameters['id'];
      if(this.opponentId){
        this.ScoreService.getById(this.opponentId).subscribe(snap=>{
          this.opponent = snap;
          this.difficulty = this.opponent.difficulty;
          this.createBoard(this.difficulty);

        });
        // this.opponent = false;
      }
    });
    this.createBoard(this.difficulty);
  }

  createBoard(difficulty){
    console.log(difficulty);
    if(this.timerInterval){
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.score = 0;
    this.finalScore = 0;
    this.actualBombs = 0;

    this.difficulty = difficulty;
    this.rows = [];
    this.end = "notOver";
    if(this.difficulty === "beginner"){
      this.numRows = 10;
      this.numCols = 10;
      this.numBombs = 10;
    } else if( this.difficulty === "intermediate"){
      this.numRows = 16;
      this.numCols = 16;
      this.numBombs = 40;
    } else if(this.difficulty === "expert"){
      this.numRows = 16;
      this.numCols = 31;
      this.numBombs = 99;
    }

    for(var y = 0; y<=this.numRows; y++){
      let cols = [];

      for(var x = 0; x<= this.numCols; x++){
        var bomb: boolean = false;

        if(Math.random() < (this.numBombs/(this.numRows*this.numCols))){
          bomb = true;
          this.actualBombs++;
        }

        var col = {
          bomb: bomb,
          number: 0,
          visable: false,
          class: "grey",
          x: x,
          y: y
        }

        cols.push(col);
      }
      this.rows.push(cols);
    }
    for(var y=0; y<this.rows.length; y++) {
      for(var x=0; x<this.rows[y].length; x++) {
        if(this.rows[y][x].bomb === false) {
          if( x > 0 && y > 0){
            if(this.rows[y-1][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(x < this.rows[y].length-1 && y > 0){
            if(this.rows[y-1][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(y < this.rows.length-1 && x > 0){
            if(this.rows[y+1][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(y < this.rows.length-1 && x < this.rows[y].length-1){
            if(this.rows[y+1][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(x > 0){
            if(this.rows[y][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if( y > 0){
            if(this.rows[y-1][x].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if (y < this.rows.length-1){
            if(this.rows[y+1][x].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if (x < this.rows[y].length-1){
            if(this.rows[y][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
        }
      }
    }
    this.markedBombs = this.actualBombs;
  }
  ifGameOver(){
    if(this.end!="notOver" || this.win){
      return true;
    } else {
      return false;
    }
  }

  checkTile(col){
    if(!this.timerInterval){
      this.timerInterval = setInterval(fat=>{
        this.score++;
      },1000);
    }

    if(col.class != "marked" && col.class != "question" && !this.ifGameOver()){
      col.visible = true;
      var classDict = {
        1:"one",
        2:"two",
        3:"three",
        4:"four",
        5:"five",
        6:"six",
        7:"seven",
        8:"eight"
      };
      if(col.bomb){
        col.class = "bomb";
        this.end ="end";

        for(var y = 0; y <= this.numRows; y++){
          for(var x = 0; x <= this.numCols; x++){
            if(this.rows[y][x].bomb && !this.rows[y][x].visable){
              this.rows[y][x].visable = true;
              this.rows[y][x].class = "bomb";
            }
          }
        }
        this.checkAgainstOpponent();
        clearInterval(this.timerInterval);
        this.timerInterval = null;

      } else {
        col.class = classDict[col.number];
      }

      if(col.number === 0  && col.bomb === false){
        this.revealEmpty(col);
      }
      this.isGameWon();
    }


  }
  revealEmpty(col){
    if(col.bomb === false && col.visable === false){
      col.visable = true;

      if(col.x > 0){
        this.checkTile(this.rows[col.y][col.x-1]);

      }
      if(col.x < this.numRows){
        this.checkTile(this.rows[col.y][col.x+1]);

      }
      if(col.y < this.numCols){
        this.checkTile(this.rows[col.y+1][col.x]);

      }
      if(col.y > 0){
        this.checkTile(this.rows[col.y-1][col.x]);

      }
    }
  }
  isGameWon(){
    var bombs = 0;
    var marks = 0;

    for(var y = 0; y <= this.numRows; y++){
      for(var x = 0; x <= this.numCols; x++){
        if(this.rows[y][x].class==="grey"){
          break;
        }
        if(this.rows[y][x].bomb && this.rows[y][x].class==="marked"){
          marks++;
        }

      }
    }
    if(this.actualBombs === marks){
      this.win=true;
      this.finalScore = this.score;
      clearInterval(this.timerInterval);
      this.timerInterval = null;

      this.checkAgainstOpponent();
    }
  }
  checkAgainstOpponent(){
    if(this.opponent){
      if(this.finalScore < this.opponent.finalScore && this.end !="end"){
        alert("you beat " + this.opponent.initials);
      } else if(this.finalScore > this.opponent.finalScore){
        alert("you failed to beat your opponent: " + this.opponent.initials);
      } else {
        alert("You could not beat "+ this.opponent.initials+" Try again.")
      }
    }
  }

  markTile(event, col) {
    event.preventDefault();
    if(!this.ifGameOver()){
      if(col.class==="question"){
        col.class="grey";
      } else if (col.class === "marked"){//event.button === 2 &&
        col.class = "question";
        this.markedBombs++;
      } else if(col.class === "grey"){
        col.class = "marked";
        this.markedBombs--;
      }
      this.isGameWon();

    }
  }



  ngDoCheck(){
    // this.createBoard();
  }
  saveScore(scoreObj) {
    console.log(scoreObj);
    this.ScoreService.addScore(scoreObj);
  }
}
