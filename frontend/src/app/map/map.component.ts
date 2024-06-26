
import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnInit, OnChanges } from '@angular/core';
import { LatLng, LatLngExpression, LeafletMouseEvent, Map, Marker, icon, latLng, map, marker, tileLayer } from 'leaflet';
import { LocationService } from '../services/location.service';
import { Order } from '../shared/models/Order';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map',
  standalone: true,
  imports:[FormsModule , CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  @Input()
  order!:Order;
  @Input()
  readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 16; //76
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLNG: LatLng = latLng(13.75, 21.62);

  @ViewChild('map',{static:true})
  mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }

  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  
  initializeMap() {

    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click',(e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        console.log(latLng)
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
      error:(error) => {
        if (error.code === 1) {
          console.error('User denied Geolocation');
          // You can provide appropriate feedback to the user here
        } else {
          console.error('Error getting geolocation:', error.message);
          // Handle other geolocation errors here
        }
      }
    });
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragged',() => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }


  set addressLatLng(latlng : LatLng) {
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));

    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng)
  }


  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
