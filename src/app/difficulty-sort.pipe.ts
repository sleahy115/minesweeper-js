import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "difficultySort"//,
  //pure: false

})


export class DifficultySortPipe implements PipeTransform {
  transform(input, difficulty) {
    console.log(input);
    if(input != undefined){

      if(difficulty==="all"){
        return input;
      }
      var output=[];
      for (var i =0; i<input.length; i++) {
        if(input[i].difficulty === difficulty){
          output.push(input[i]);
        }
      }
      return output;
    }
  }

}
