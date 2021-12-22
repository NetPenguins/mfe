import { Component, OnInit } from '@angular/core';
import {UiStyleToggleService} from "./services/ui-style-toggle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EdgyStack Dark Mode Template';

  constructor( private uiStyleToggleService: UiStyleToggleService ) { }
  
  ngOnInit(): void {
    this.uiStyleToggleService.setThemeOnStart();
  }
}
