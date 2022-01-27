import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../../core/services/subject.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public subjectService: SubjectService) { }

  ngOnInit(): void {
  }

}
