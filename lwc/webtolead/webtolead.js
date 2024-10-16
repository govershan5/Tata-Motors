import { LightningElement } from 'lwc';
export default class Webtolead extends LightningElement {
    closedFun(){
        this.dispatchEvent(new CustomEvent('closed'));
    }

}