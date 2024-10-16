import { LightningElement } from 'lwc';
export default class DemoBot extends LightningElement {
  expandBot() {
        const botContainer = this.template.querySelector('.bot-container');
        botContainer.classList.toggle('expanded');
    }
}