const {ccclass, property} = cc._decorator;

@ccclass
export default class BirdControl extends cc.Component {

    hp: number =1;
    //要飞向的目标位置
    targetPos:cc.Vec2=null;
    speed: number=150;
    //游戏结束回调
    dieCallBack: Function;
    //加分回调
    addScoreCallBack: Function;

    start () {
        this.fly();
    }
    fly(){
        //随机目标点 +-450，550
        this.targetPos=cc.v2(Math.random()*900-450,460);
        if(this.targetPos.x<this.node.x){
            this.node.scaleX=-1;
        }
        let move=cc.moveTo((this.targetPos.y-this.node.y)/this.speed,this.targetPos);
        let seq=cc.sequence(move,cc.callFunc(()=>{
            this.dieCallBack();
        }));
        this.node.runAction(seq); 
        //触摸小鸟减血
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            if(this.hp>0){
                this.hp--;
            }
            this.addScoreCallBack();            
            //停止飞行向下掉落
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play("dead");
            let move_dead=cc.moveTo(this.node.y/(this.speed*2),cc.v2(this.node.x,0));

            this.node.runAction(cc.sequence(move_dead,cc.callFunc(()=>{
                //销毁自身
                this.node.destroy();
            })));
            
        })
    }

    // update (dt) {}
}
