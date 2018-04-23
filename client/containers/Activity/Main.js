import {DataStore} from './base/DataStore'
import {ResourceLoader} from './base/ResourceLoader'
import {Award} from "./runtime/Award";
import {DefaultBackGround} from "./runtime/DefaultBackGround";
import {Director} from "./Director";
import {SelectedBackGround} from "./runtime/SelectedBackGround";

export class Main {
  constructor(id = "myCanvas") {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded((map) => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;

    let PrizePool = [
      this.dataStore.res.get("award01"), this.dataStore.res.get("award04"), this.dataStore.res.get("award02"),
      this.dataStore.res.get("award03"), this.dataStore.res.get("award04"), this.dataStore.res.get("award05"),
      this.dataStore.res.get("award01"), this.dataStore.res.get("award04"), this.dataStore.res.get("award02"),
      this.dataStore.res.get("award03"), this.dataStore.res.get("award00"), this.dataStore.res.get("award04"),
      this.dataStore.res.get("award02"), this.dataStore.res.get("award02"), this.dataStore.res.get("award01"),
      this.dataStore.res.get("award04"), this.dataStore.res.get("award03"), this.dataStore.res.get("award00"),
      this.dataStore.res.get("award04"), this.dataStore.res.get("award01"), this.dataStore.res.get("award05"),
      this.dataStore.res.get("award04"), this.dataStore.res.get("award03"), this.dataStore.res.get("award02"),
      this.dataStore.res.get("award04")
    ];
    this.dataStore.prize = PrizePool;
    this.init();
  }

  init() {
    let width = this.dataStore.canvas.width;
    for (let i = 0; i < 24; i++) {
      if (i >= 0 && i < 6) {
        this.dataStore.put(`backgroud${i}`, new DefaultBackGround((width / 7) * i, 0))
        this.dataStore.put(`backgroudselectd${i}`, new SelectedBackGround((width / 7) * i, 0))
        //this.dataStore.get(`backgroud${i}`).draw();
        this.dataStore.put(`prize${i}`, new Award(this.dataStore.prize[i], (width / 7) * i, 0))
        //this.dataStore.get(`prize${i}`).draw();
      } else if (i >= 6 && i < 12) {
        this.dataStore.put(`backgroud${i}`, new DefaultBackGround(width * 6 / 7, (width / 7) * (i - 6)))
        this.dataStore.put(`backgroudselectd${i}`, new SelectedBackGround(width * 6 / 7, (width / 7) * (i - 6)))
        //this.dataStore.get(`backgroud${i}`).draw();
        this.dataStore.put(`prize${i}`, new Award(this.dataStore.prize[i], width * 6 / 7, (width / 7) * (i - 6)))
        //this.dataStore.get(`prize${i}`).draw();
      } else if (i >= 12 && i < 18) {
        this.dataStore.put(`backgroud${i}`, new DefaultBackGround((width / 7) * (18 - i), width * 6 / 7))
        this.dataStore.put(`backgroudselectd${i}`, new SelectedBackGround((width / 7) * (18 - i), width * 6 / 7))
        //this.dataStore.get(`backgroud${i}`).draw();
        this.dataStore.put(`prize${i}`, new Award(this.dataStore.prize[i], (width / 7) * (18 - i), width * 6 / 7))
        //this.dataStore.get(`prize${i}`).draw();
      } else if (i >= 18 && i < 24) {
        this.dataStore.put(`backgroud${i}`, new DefaultBackGround(0, (width / 7) * (24 - i)))
        this.dataStore.put(`backgroudselectd${i}`, new SelectedBackGround(0, (width / 7) * (24 - i)))
        //this.dataStore.get(`backgroud${i}`).draw();
        this.dataStore.put(`prize${i}`, new Award(this.dataStore.prize[i], 0, (width / 7) * (24 - i)))
       // this.dataStore.get(`prize${i}`).draw();
      }
    }

    this.director.run();

  }



}