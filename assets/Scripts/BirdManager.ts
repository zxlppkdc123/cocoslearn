import BirdControl from "./BirdControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BirdManager extends cc.Component {

    //小鸟预设体
    @property(cc.Prefab)
    birdPre:cc.Prefab;
    //每只鸟出现的时间
    time:number=1;
    //分数
    score:number=0;
    //分数标签
    @property(cc.Label)
    scoreLabel:cc.Label;
    @property(cc.Node)
    backStart:cc.Node;

    start () {
        console.debug("游戏开始");
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(this.time),cc.callFunc(()=>{
            //创建小鸟
            let bird=cc.instantiate(this.birdPre);
            //设置父物体
            bird.setParent(this.node);
            //设置小鸟的位置
            bird.y=this.node.y;
            bird.x=Math.random()*900-450;
            //飞
            bird.getComponent(BirdControl).fly();
            //加分回调
            bird.getComponent(BirdControl).addScoreCallBack=()=>{
                this.score+=50;
                this.scoreLabel.string=this.score+"";
            };
            //游戏结束回调
            bird.getComponent(BirdControl).dieCallBack=()=>{
                this.node.destroyAllChildren();
                this.node.stopAllActions();
                this.backStart.active=true;
            };


        }))));
    }
    backStartMenu(){
        cc.director.loadScene("start");
    }

    // update (dt) {}
}
