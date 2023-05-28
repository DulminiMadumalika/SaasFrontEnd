import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Review {
  reviewerName: string;
  review: string
  rating:string
  hospital:string
  location:string
}

@Component({
  selector: 'app-reviews-ratings',
  templateUrl: './reviews-ratings.component.html',
  styleUrls: ['./reviews-ratings.component.css']
})
export class ReviewsRatingsComponent implements OnInit {

  reviews: Review[];
  searchHospital:string
  searchLocation:string
  filteredReviews: Review[]= [];
  review: string
  rating:string
  hospital:string
  location:string
  reviewerName: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    {
      this.http.get<Review[]>('http://safetytraveller-env.eba-mzsacnda.us-east-1.elasticbeanstalk.com/getAllReviews').subscribe(
        (response) => {
          this.reviews = response;
        },
        (error) => {
          console.error('Error fetching Reviews:', error);
        }
      );
    }
  }

  search() {
    //Filter the data based on the selected hospital and location
    const filteredData = this.reviews.filter((review) => {
      const searchHospitalLowerCase = this.searchHospital?.toLowerCase().trim();
      const searchLocationLowerCase = this.searchLocation?.toLowerCase().trim();
      const reviewHospitalLowerCase = review.hospital.toLowerCase().replace(/\s/g, '');
      const reviewLocationLowerCase = review.location.toLowerCase().replace(/\s/g, '');
    
      if (searchHospitalLowerCase && searchLocationLowerCase) {
        return (
          reviewHospitalLowerCase.includes(searchHospitalLowerCase) &&
          reviewLocationLowerCase.includes(searchLocationLowerCase)
        );
      } else if (searchHospitalLowerCase) {
        return reviewHospitalLowerCase.includes(searchHospitalLowerCase);
      } else if (searchLocationLowerCase) {
        return reviewLocationLowerCase.includes(searchLocationLowerCase);
      } else {
        return true;
      }
    });
    
  
    this.filteredReviews = filteredData;
  }

  addReview() {
    // Check if the required fields are filled
    if (this.location && this.hospital && this.rating) {
  
      // Create a new review object with the form values and the auto-incremented ID
      const newReview: Review = {
        location: this.location,
        hospital: this.hospital,
        review: this.review,
        rating: this.rating,
        reviewerName: this.reviewerName
      };
  
      // Make a POST request to the backend API to add the new review
      this.http.post('http://safetytraveller-env.eba-mzsacnda.us-east-1.elasticbeanstalk.com/addReview', newReview)
        .subscribe(
          (response) => {
            console.log('Review added successfully:', response);
            // Clear the form fields
            this.location = '';
            this.hospital = '';
            this.review = '';
            this.rating = '';
            this.reviewerName ='';
          },
          (error) => {
            console.error('Error adding review:', error);
          }
        );
    } else {
      console.log('Please fill in all required fields.');
    }
  }
  

}
