import { Component, OnInit } from '@angular/core';
import { PoiService } from '../poi.service';
import { Poi } from '../poi';

@Component({
  selector: 'app-pois',
  templateUrl: './pois.component.html',
  styleUrls: ['./pois.component.css']
})
export class PoisComponent implements OnInit {
  pois: Poi[];
  constructor(private poiService: PoiService) { }

  ngOnInit() {
    this.getPois();
  }
  getPois() {
    this.poiService.getPois().subscribe(pois => this.pois = pois);
  }
}
