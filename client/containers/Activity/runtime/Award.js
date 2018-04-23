import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore";
export class Award extends Sprite{
  constructor(image,x=0,y=0){
    let width = DataStore.getInstance().canvas.width;
    super(image,0,0,image.width,image.height,x,y,width/7,width/7)
  }
}