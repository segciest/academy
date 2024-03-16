export default class ListPerson {
  listPerson = [];
  addUser = function (user) {
    this.listPerson.push(user);
  };
  deleteUser = function (index) {
    this.listPerson.splice(index, 1);
  };
  updateUser = function (user, index) {
    this.listPerson[index] = user;
  };
  // sortHoTen = function () {};
  // sortUser = function () {};
}
