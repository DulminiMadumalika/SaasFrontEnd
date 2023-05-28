import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
export interface FirstAidData {
  id:Number
  emergency: string;
  firstAid: string;
}

@Component({
  selector: 'app-first-aids',
  templateUrl: './first-aids.component.html',
  styleUrls: ['./first-aids.component.css']
})

export class FirstAidsComponent implements OnInit {

  firstAidData: FirstAidData[];
  filteredData: FirstAidData[]= [];
  searchKeyword: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<FirstAidData[]>('http://safetytraveller-env.eba-mzsacnda.us-east-1.elasticbeanstalk.com/getAllFirstAid').subscribe(
      (response) => {
        this.firstAidData = response;
      },
      (error) => {
        console.error('Error fetching firstAidData:', error);
      }
    );
  }

  search() {
    if (this.searchKeyword) {
      this.filteredData = this.firstAidData.filter((item) =>
        item.emergency.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredData = this.firstAidData;
    }
  }

}
