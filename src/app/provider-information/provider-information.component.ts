import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Provider {
  id:number;
  address: string;
  contact: string
  other:string
  hospital:string
}

@Component({
  selector: 'app-provider-information',
  templateUrl: './provider-information.component.html',
  styleUrls: ['./provider-information.component.css']
})
export class ProviderInformationComponent implements OnInit {

  provider: any[] = [];
  searchKeyword: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://safetytraveller-env.eba-mzsacnda.us-east-1.elasticbeanstalk.com/getAllProviders').subscribe(
      (response) => {
        this.provider = response;
      },
      (error) => {
        console.error('Error fetching table data:', error);
      }
    );
  }

  search() {
    if (this.searchKeyword) {
      this.provider = this.provider.filter((data) => {
        // Convert both the keyword and data values to lowercase for case-insensitive comparison
        const keyword = this.searchKeyword.toLowerCase();
        const hospital = data.hospital.toLowerCase();
        const address = data.address.toLowerCase();
        const contact = data.contact.toLowerCase();
        const other = data.other.toLowerCase();
  
        // Check if the keyword is present in any of the data values
        return (
          hospital.includes(keyword) ||
          address.includes(keyword) ||
          contact.includes(keyword) ||
          other.includes(keyword)
        );
      });
    } else {
      // If no keyword entered, load all data
      this.provider = this.provider;
    }
  }
  

}
