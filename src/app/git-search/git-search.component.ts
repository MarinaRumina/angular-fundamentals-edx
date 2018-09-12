import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  title: string;
  displayQuery: string;

  constructor(
    private GitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    });

    this.route.data.subscribe( (result) => {
      this.title = result.title;
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

  // creating a method to change the page when we search instead of simply displaying results.
  sendQuery = () => {
    this.searchResults = null; // clearing previous search results, preventing them to be shown
    this.router.navigate(['/search/' + this.searchQuery]);
  }

}
