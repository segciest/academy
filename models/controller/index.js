import Person from "../js/Person.js";
import Student from "../js/Student.js";
import Employee from "../js/Employee.js";
import Customer from "../js/Customer.js";
import ListPerson from "../js/ListPerson.js";

const list = new ListPerson();
let choose;
getLocalStorage("listPerson");

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

// Thêm người dùng
document.getElementById("add").onclick = function () {
  let selectedValue = choose;
  let arrInput = document.querySelectorAll("#formUser input");
  console.log(arrInput);
  switch (selectedValue) {
    case "student":
      var student = new Student();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        student[id] = value;
      });
      list.addUser(student);
      saveLocalStorage("listPerson", list.listPerson);
      document.getElementById("formUser").reset();
      break;
    case "employee":
      var employee = new Employee();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        employee[id] = value;
      });
      list.addUser(employee);
      saveLocalStorage("listPerson", list.listPerson);
      document.getElementById("formUser").reset();
      break;
    case "customer":
      var customer = new Customer();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        customer[id] = value;
      });
      list.addUser(customer);
      saveLocalStorage("listPerson", list.listPerson);
      document.getElementById("formUser").reset();
      break;
  }
  console.log(list);
};

// Render người dùng
const render = (arrFood = list.listPerson) => {
  let content = "";
  arrFood.forEach((food, index) => {
    let newFood = new Person();
    // Object.assign(newFood, food);

    // Dùng spread Operator thay thế object.asign
    newFood = { ...newFood, ...food };
    const {
      hoTen,
      id,
      diaChi,
      email,
      soNgay,
      luongNgay,
      congTy,
      hoaDon,
      rate,
      toan,
      ly,
      hoa,
    } = newFood;
    content += `
    <tr>
      <td>${id}</td>
      <td>${hoTen}</td>
      <td>${diaChi}</td>
      <td>${email}</td>
    </tr>`;
  });
  // let tinhGiaKhuyenMai = food.tinhGiaKhuyenMai();

  document.getElementById("tbody").innerHTML = content;
};
render();
