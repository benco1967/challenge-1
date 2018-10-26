import { Component, OnInit } from '@angular/core';
import {PoiService} from "../poi.service";
import {Poi} from "../poi";

@Component({
  selector: 'app-stars',
  inputs: ['id'],
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  id: string;
  likes?: string = '?';
  constructor(private poiService: PoiService) { }

  ngOnInit() {
    this.getPois();
  }
  getPois() {
    this.poiService.getPoi(this.id).subscribe(poi => {
      console.log(`receive for ${this.id} ${poi}`);
      const likes = poi && poi['likes'];
      switch (likes) {
        case undefined:
        case 0:
          this.likes = '☆';
          break;
        case 1:
          this.likes = '★';
          break;
        case 2:
          this.likes = '★★';
          break;
        default:
          this.likes = '★x'+likes;
          break;
      }
    });
  }
}
