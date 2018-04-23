import {DataStore} from "./base/DataStore";

export  class  Director{
  static  getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance
  }
  constructor(){
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 0;
    this.speed = 100;
    this.number = 0;
  }


  run(){
    for (let i = 0; i < 24; i++) {
      if(this.moveSpeed == i){
        this.dataStore.get(`backgroudselectd${i}`).draw();
      }else{
        this.dataStore.get(`backgroud${i}`).draw();
      }
      this.dataStore.get(`prize${i}`).draw();
    }

    window.requestAnimationFrame(()=>{
      if(this.moveSpeed<24){
        this.moveSpeed++;
      }else{
        this.moveSpeed = 0;
      }
      // this.run();
    })


  }
}