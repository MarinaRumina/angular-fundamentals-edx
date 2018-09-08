import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  // a type declaration for variable to store search results
  // when doing it above the constructor TypeScript will automatically create a variable scoped for this.
  searchResults: GitSearch;
  searchQuery: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private GitSearchService: GitSearchService) { }

  ngOnInit() {
    this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  // creating a method to call with a parameter to send a different query string to the server
  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

}
