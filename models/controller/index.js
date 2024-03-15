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
        student["oop"] = selectedValue;
      });
      list.addUser(student);
      saveLocalStorage("listPerson", list.listPerson);
      render();
      render2();

      document.getElementById("formUser").reset();
      break;
    case "employee":
      var employee = new Employee();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        employee[id] = value;
        employee["oop"] = selectedValue;
      });
      list.addUser(employee);
      saveLocalStorage("listPerson", list.listPerson);
      render();
      render2();

      document.getElementById("formUser").reset();
      break;
    case "customer":
      var customer = new Customer();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        customer[id] = value;
        customer["oop"] = selectedValue;
      });
      list.addUser(customer);
      saveLocalStorage("listPerson", list.listPerson);
      render();
      render2();

      document.getElementById("formUser").reset();
      break;
  }
  console.log(list);
};

// Render người dùng
const render = (arr = list.listPerson) => {
  let content = "";
  arr.forEach((item, index) => {
    let newUser = new Person();
    // Object.assign(newFood, food);

    // Dùng spread Operator thay thế object.asign
    newUser = { ...newUser, ...item };
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
      oop,
    } = newUser;
    content += `
    <tr id="${id}">
      <td>${id}</td>
      <td>${hoTen}</td>
      <td>${diaChi}</td>
      <td>${email}</td>
      <td>
        <button id="btn-${id}" type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" >More</button>
      </td>
      <td>
        <button onclick="deleteUser('${id}')" data-id="${id}" id="btnXoaUser" class="btn btn-danger">Xoá</button>
        </td>
      <td>
        <button onclick="getInfo('${id}')" id="btnSuaMonAn" class="btn btn-success">Sửa</button>
      </td>
    </tr>`;
    console.log("haha");
  });

  document.getElementById("tbody").innerHTML = content;
  // Khởi tạo Popover cho các nút "More"
  arr.forEach((item) => {
    const id = item.id;
    const btn = document.getElementById(`btn-${id}`);
    new bootstrap.Popover(btn, {
      container: "body",
    });
  });
};
render();

// viết một hàm để render các giá trị riêng của từng đối tượng student, employee, customer bên cạnh tbody đã tạo

const render2 = (arr = list.listPerson) => {
  console.log("hehe");
  let content = "";
  arr.forEach((item) => {
    let newUser = new Person();
    newUser = { ...newUser, ...item };
    const btn = `btn-${item.id}`;
    console.log(document.getElementById(btn));
    switch (newUser.oop) {
      case "student":
        const { toan, ly, hoa } = newUser;
        document
          .getElementById(btn)
          .setAttribute("data-bs-title", `Toán:${toan} Lý:${ly} Hoá:${hoa}`);
        break;
      case "employee":
        const { soNgay, luongNgay } = newUser;

        document
          .getElementById(btn)
          .setAttribute(
            "data-bs-title",
            `Lương ngày:${luongNgay} Số ngày:${soNgay}`
          );
        break;
      case "customer":
        const { congTy, hoaDon, rate } = newUser;
        document
          .getElementById(btn)
          .setAttribute(
            "data-bs-title",
            `Công Ty: ${congTy} Hoá đơn: ${hoaDon} Đánh giá: ${rate}`
          );
        break;
    }
    console.log(document.getElementById(btn));
    // Khởi tạo Popover cho các nút "More"
    arr.forEach((item) => {
      const id = item.id;
      const btn = document.getElementById(`btn-${id}`);
      new bootstrap.Popover(btn, {
        container: "body",
      });
    });
  });
};
render2();

let deleteUser = (id) => {
  let index = list.listPerson.findIndex((item, index) => {
    return item.id == id;
  });
  if (index != -1) {
    list.deleteUser(index);
    render();
    render2();
  }
};
window.onload = () => {
  window.deleteUser = (id) => {
    console.log(id);
    deleteUser(id);
  };
  window.getDetailFood = (id) => {
    getDetailFood(id);
  };
  window.getInfo = (id) => {
    getInfo(id);
  };
};
