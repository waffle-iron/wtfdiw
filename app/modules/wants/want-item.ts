import {WantItemSample} from './want-item-sample';

export class WantItem {
  id: string = '';
  displaytext: string = '';
  samples: WantItemSample[] = [];

  constructor(props) {
    this.id = props.id;
    this.displaytext = props.displaytext;
    this.samples = props.samples || [];
  }
}
