import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import { GitUsers } from './git-users';
// importing RxJS .toPromise to have a possibility to convert
// an Observable received from httpRequest to promise.
// import 'rxjs/add/operator/toPromise'; // toPromise is not an operator but a method on the Observable class so no need to import it

@Injectable({
  providedIn: 'root'
})

export class GitSearchService {
  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];
  // setting up a cache for first time service injection that will store cached values
  cachedValues: Array<{
    // describing shape of the objects we are going to store in the Array
    // [key - query passed, type string]: value-actual output from the API - type of GitSearch
    // such a way to create a cache will save cached data forever! If there is need to work with a frequently changed data
    // this approach should be extended(check if expired, discarding data upon certain time etc.)
    [query: string]: GitSearch
  }> = [];
  constructor(private http: HttpClient) { }
    // creating a search method. To use it within a service using this.gitSearch, from outside of the service
    // supposed to be referenced as GitSearchService.gitSearch
    gitSearch = (query: string): Promise<GitSearch> => {
      // tslint:disable-next-line:prefer-const
      let promise = new Promise<GitSearch>((resolve, reject) => {

        // checking if we want to use the cached value instead of querying for the response.
        if (this.cachedValues[query]) {
          resolve(this.cachedValues[query]);
        } else {
          // If a value isn't cached, we will return the call from the API.
          // And converting a response from rxjs observable to Promise
          this.http.get('https://api.github.com/search/repositories?q=' + query)
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch);
          }, (error) => {
            reject(error);
          });
        }
      });
      return promise;
    }
    gitUsersSearch = (query: string): Promise<GitUsers> => {
      // tslint:disable-next-line:prefer-const
      let promise = new Promise<GitUsers>((resolve, reject) => {
        if (this.cachedUsers[query]) {
          resolve(this.cachedUsers[query]);
        } else {
          this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then((response) => {
            resolve (response as GitUsers);
          }, (error) => {
            reject (error);
          });
        }
      });
      return promise;
    }
}
