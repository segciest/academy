import Person from "./Person.js";

export default class Customer extends Person {
  // congTy = "";
  // hoaDon = 0;
  // rate = "";
  constructor(congTy, hoaDon, rate) {
    super();
    this.congTy = congTy;
    this.hoaDon = hoaDon;
    this.rate = rate;
  }
}
