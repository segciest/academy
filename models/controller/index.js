import Person from "../js/Person.js";
import Student from "../js/Student.js";
import Employee from "../js/Employee.js";
import Customer from "../js/Customer.js";
import ListPerson from "../js/ListPerson.js";

const list = new ListPerson();
let choose;
// Lấy dữ liệu người dùng
// function getValue() {
//   let user = new User();
//   let arrInput = document.querySelectorAll("#formUser input");

//   arrInput.forEach((item, index) => {
//     let { id, value } = item;
//     user[id] = value;
//   });
//   return user;
// }

// Hàm xử lý sự kiện onchange trả về giá trị đã chọn
function handleChange(event) {
  // Lấy giá trị đã chọn
  var selectedValue = event.target.value;

  // Trả về giá trị đã chọn
  return selectedValue;
}

// Lấy tham chiếu đến phần tử select
let a = document.getElementById("select");

// Thêm sự kiện "onchange" vào phần tử select
a.onchange = function (event) {
  // Gọi hàm xử lý sự kiện và lấy giá trị trả về
  var selectedValue = handleChange(event);

  switch (selectedValue) {
    case "student":
      document.getElementById("hocSinh").style.display = "block";
      document.getElementById("nhanVien").style.display = "none";
      document.getElementById("khachHang").style.display = "none";
      break;
    case "employee":
      document.getElementById("nhanVien").style.display = "block";
      document.getElementById("hocSinh").style.display = "none";
      document.getElementById("khachHang").style.display = "none";

      break;
    case "customer":
      document.getElementById("khachHang").style.display = "block";
      document.getElementById("nhanVien").style.display = "none";
      document.getElementById("hocSinh").style.display = "none";
      break;
    default:
      break;
  }

  // Sử dụng giá trị đã trả về
  console.log("Giá trị đã chọn:", selectedValue);
  choose = selectedValue;
};
// Chọn đối tượng
let arrInput = document.querySelectorAll("#formUser input");

// console.log(input);
// let b = user;
// console.log(b);
// Hàm lưu trữ dữ liệu xuống local
// function save info
function saveLocalStorage(key, value) {
  var stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}
// Hàm lấy dữu liệu từ localStorage
function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  // console.log(dataLocal);
  // Kiểm tra dữ liệu xem có hay không,
  if (dataLocal) {
    // Chuyển đổi chuỗi JSON về lại array hoặc object
    let newData = JSON.parse(dataLocal);
    list.listPerson = newData;
  }
}

document.getElementById("add").onclick = function () {
  let selectedValue = choose;
  switch (selectedValue) {
    case "student":
      var user = new Student();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        user[id] = value;
        list.addUser(user);
        document.getElementById("formUser").reset();
      });
      break;
    case "employee":
      var user = new Employee();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        user[id] = value;
        list.addUser(user);
      });
      break;
    case "customer":
      var user = new Customer();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        user[id] = value;
        list.addUser(user);
      });
      break;
  }
  console.log(list);
};
