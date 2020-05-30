import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from './news-rss';
@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent {
  RssData: NewsRss;
  constructor(private http: HttpClient) {}
  GetRssFeedData() {
    // tslint:disable-next-line: ban-types
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    };
    this.http
      // tslint:disable-next-line: quotemark
      .get<any>("https://gadgets.ndtv.com/rss/feeds",
       requestOptions)
      .subscribe(data => {
        const parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
        });
      });
  }
}

// tslint:disable-next-line: no-empty-interface
export interface IRssData {}
