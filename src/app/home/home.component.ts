import { Component, OnInit } from '@angular/core';
import { LocalData, SmiliarPost } from '../utils/local-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public displayData = [];
  public displaySimiliarData = [];
  public tags = [{ name: "#cheeselove", remove: false }, { name: "#kofluence", remove: false }];
  public hashTags = ["#food", "#kofluencer"];
  constructor() { }

  ngOnInit() {
    this.getData();
    this.getSimiliarData();
  }

  getData() {
    this.displayData = LocalData;
    this.displayData.forEach(ele => {
      ele.likes = this.kFormatter(ele.likes);
      ele.comments = this.kFormatter(ele.comments);
    });
  }

  getSimiliarData() {
    this.displaySimiliarData = [...SmiliarPost];
    this.displaySimiliarData.forEach(ele => {
      ele.likes = this.kFormatter(ele.likes);
      ele.comments = this.kFormatter(ele.comments);
    });
    this.displaySimiliarData = this.displaySimiliarData.filter(ele => ele.type == 'snacks');
  }

  kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000) + 'k' : Math.sign(num) * Math.abs(num)
  }

  remove(event: any) {
    const index = this.tags.indexOf(event);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.hashTags.unshift(event.name);
      this.displaySimiliarData = this.displaySimiliarData.filter(ele => ele.type == 'snacks');
    }
  }
  selectMe(event: any) {
    if (event == '#food') {
      const index = this.hashTags.indexOf(event);
      if (index >= 0) {
        this.hashTags.splice(index, 1);
      }
      if ((event || "").trim()) {
        this.tags.push({ name: event.trim(), remove: true });
      }

      this.displaySimiliarData = SmiliarPost;
    }
  }
}
