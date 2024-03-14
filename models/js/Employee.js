import Person from "./Person.js";

export default class Employee extends Person {
  // soNgay = "";
  // luongNgay = "";
  constructor(soNgay, luongNgay) {
    super();
    this.soNgay = soNgay;
    this.luongNgay = luongNgay;
  }
  tinhLuong = function () {
    return;
  };
}
