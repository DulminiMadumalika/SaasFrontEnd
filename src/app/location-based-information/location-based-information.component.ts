import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-based-information',
  templateUrl: './location-based-information.component.html',
  styleUrls: ['./location-based-information.component.css']
})
export class LocationBasedInformationComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  private placesService: google.maps.places.PlacesService;
  private res;
  hospitals: google.maps.places.PlaceResult[];
  
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["hospital", "health"],
      };
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          // this.getNearbyHospitals(this.latitude, this.longitude).subscribe((results) => {
          //   this.hospitals = results;
          //   console.log(this.hospitals)
          //   this.hospitals.forEach(element => {
          //     console.log(element.geometry.location.lat())
          //     console.log(element.geometry.location.lng())
          //   });
          // })
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }

  getNearbyHospitals(latitude: number, longitude: number): Observable<google.maps.places.PlaceResult[]> {
    const location = new google.maps.LatLng(latitude, longitude);
    const request: google.maps.places.PlaceSearchRequest = {
      location: location,
      radius: 2500, // Search within a 5000 meter radius
      keyword: 'hospital' // Search for hospitals
    };

    return new Observable((observer) => {
      let placesService = new google.maps.places.PlacesService(document.createElement('div'))
      placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          observer.next(results);
          observer.complete();
        } else {
          observer.error(status);
        }
      });
    });
  }

}
