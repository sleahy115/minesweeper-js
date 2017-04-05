import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  difficulty = "beginner";
  numRows:number = 10;
  numCols:number = 10;
  numBombs:number = null;
  rows = [];
  end:string = null;

  constructor(){}

  createBoard(){
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
  }


  checkTile(col){
    if(col.class != "marked" && col.class != "question"){
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
              console.log("bomb");
              this.rows[y][x].visable = true;
              this.rows[y][x].class = "bomb";
            }
          }
        }

      } else {
        col.class = classDict[col.number];
      }

      if(col.number === 0  && col.bomb === false){
        this.revealEmpty(col);
      }
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

  markTile(event, col) {
    event.preventDefault();
    if(col.class==="question"){
      col.class="grey";
    } else if (col.class === "marked"){//event.button === 2 &&
      col.class = "question";
    } else if(col.class === "grey"){
      col.class = "marked";
    }

  }

  ngOnInit(){
    this.createBoard();
  }

  ngDoCheck(){
    // this.createBoard();
  }
}
