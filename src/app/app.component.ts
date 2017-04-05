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

  constructor(){}

  createBoard(){
    this.rows = [];
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
          visible: false,
          class: "grey",
          coords: x + "-" + y
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
    col.visible = true;
    var classDict = {
      1:"green",
      2:"blue",
      3:"orange",
      4:"red"
    };
    if(col.bomb){
      col.class = "black";
      col.number = 99;
    } else {
      col.class = classDict[col.number];
    }
    console.log(col.coords);
    console.log(col);


  }

  ngOnInit(){
    this.createBoard();
  }

  ngDoCheck(){
    // this.createBoard();
  }
}
