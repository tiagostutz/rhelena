
import Rhelena from 'rhelena';

export default class DogModel extends Rhelena.RhelenaPresentationModel {

  constructor() {
    super();
    this.barks = 0;
  }

  bark() {
    //when this attribute is updated,
    //Rhelena will call 'setState' from view
    //and it will be re-rendered automatically
    this.barks = this.barks+1;
    console.log('AU AU');
  }

}
