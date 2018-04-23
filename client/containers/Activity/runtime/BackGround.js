import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore";
export class BackGround extends Sprite{
  constructor(image,x=0,y=0){
   // let image  = Sprite.getImage('bg');
    let width = DataStore.getInstance().canvas.width;
    let height = DataStore.getInstance().canvas.height;
    super(image,0,0,image.width,image.height,x,y,width/7,width/7)
  }
}
