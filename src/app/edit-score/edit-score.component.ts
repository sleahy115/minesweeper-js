import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-score',
  templateUrl: './edit-score.component.html',
  styleUrls: ['./edit-score.component.css']
})
export class EditScoreComponent implements OnInit {
  @Input() selectedScore;
  @Output() updateScoreSender = new EventEmitter();

  editScore() {
    this.updateScoreSender.emit(this.selectedScore);
  }

  constructor() { }

  ngOnInit() {
  }

}
