import Person from "./Person.js";

export default class Student extends Person {
  // toan = 0;
  // ly = 0;
  // hoa = 0;
  constructor(toan, ly, hoa) {
    super();
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
  }
  tinhDiemTrungBinh = function () {
    return;
  };
}
