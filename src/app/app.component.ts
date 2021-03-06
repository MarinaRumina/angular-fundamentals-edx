import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GitSearchService]
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private GitSearchService: GitSearchService) {

  }
  title = 'GitHub Browser';
  ngOnInit() {
    // this.GitSearchService.gitUsersSearch('marinarumina').then((response) => {
    //   alert('Total Users Found: ' + response.total_count);
    // }, (error) => {
    //   alert('Error: ' + error.statusText);
    // });
  }
}
