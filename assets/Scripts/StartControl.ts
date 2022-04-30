

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartControl extends cc.Component {

    start () {

    }

    startGame(){
        cc.director.loadScene("game");
    }
}
