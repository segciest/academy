import Person from "../js/Person.js";
import Student from "../js/Student.js";
import Employee from "../js/Employee.js";
import Customer from "../js/Customer.js";
import ListPerson from "../js/ListPerson.js";

const list = new ListPerson();
let choose;
getLocalStorage("listPerson");
var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

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
  let arrInput = document.querySelectorAll(
    "#formUser input,#formUser textarea"
  );
  console.log(arrInput);
  switch (selectedValue) {
    case "student":
      var student = new Student();
      arrInput.forEach((item, index) => {
        let { id, value } = item;
        student[id] = value;
        student["select"] = selectedValue;
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
        employee["select"] = selectedValue;
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
        customer["select"] = selectedValue;
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
      select,
    } = newUser;
    content += `
    <tr id="${id}">
      <td>${id}</td>
      <td>${select}</td>
      <td>${hoTen}</td>
      <td>${diaChi}</td>
      <td>${email}</td>
      <td>
        <button id="btn-${id}" type="button" class="btn btn-danger" data-bs-toggle="popover" >More</button>
      </td>
      <td>
        <button type="button" onclick="deleteUser('${id}')" data-id="${id}" id="btnXoaUser" class="btn btn-danger">Xoá</button>
        </td>
      <td>
        <button type="button" onclick="getDetailUser('${id}')" id="btnSuaMonAn" class="btn btn-success">Sửa</button>
      </td>
    </tr>`;
    // console.log("haha");
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

// Hàm render nút more
const render2 = (arr = list.listPerson) => {
  //   console.log("hehe");
  //   let content = "";

  arr.forEach((item) => {
    let newUser = new Person();
    newUser = { ...newUser, ...item };
    const btn = `btn-${item.id}`;
    switch (newUser.select) {
      case "student":
        const { toan, ly, hoa } = newUser;
        console.log("tui học sinh");
        document
          .getElementById(btn)
          .setAttribute(
            "data-bs-title",
            `Toán:${toan}<br> Lý:${ly}<br> Hoá:${hoa}`
          );
        break;
      case "employee":
        const { soNgay, luongNgay } = newUser;

        document
          .getElementById(btn)
          .setAttribute(
            "data-bs-title",
            `Lương ngày:${luongNgay}<br> Số ngày:${soNgay}`
          );
        break;
      case "customer":
        const { congTy, hoaDon, rate } = newUser;
        document
          .getElementById(btn)
          .setAttribute(
            "data-bs-title",
            `Công Ty: ${congTy}<br> Hoá đơn: ${hoaDon}<br>  Đánh giá: ${rate}`
          );
        break;
    }
    // Khởi tạo Popover cho các nút "More"
  });
  arr.forEach((item) => {
    const id = item.id;
    const btn = document.getElementById(`btn-${id}`);
    new bootstrap.Popover(btn, {
      container: "body",
      html: true,
    });
  });
};
render2();

// hàm xoá người dúng
let deleteUser = (id) => {
  let index = list.listPerson.findIndex((item, index) => {
    return item.id == id;
  });
  if (index != -1) {
    list.deleteUser(index);
    saveLocalStorage("listPerson", list.listPerson);
    render();
    render2();
  }
};

// hàm cập nhật người dùng
let updateUser = () => {
  const input = document.querySelectorAll(
    "#formUser input,#formUser select,#formUser textarea"
  );
  let selectedValue = document.getElementById("select").value;
  switch (selectedValue) {
    case "customer":
      var user = new Customer();
      break;
    case "student":
      var user = new Student();

      break;
    case "employee":
      var user = new Employee();
      break;
  }
  input.forEach((item, index) => {
    let { id, value } = item;
    user[id] = value;
  });
  let index = list.listPerson.findIndex((item, index) => {
    return item.id == user.id;
  });
  if (index != -1) {
    list.updateUser(user, index);
  }
  document.getElementById("formUser").reset();
  myModal.hide();
  saveLocalStorage("listPerson", list.listPerson);
  document.getElementById("id").readOnly = false;
  render();
  render2();
};

// lấy dữ liệu ng dùng khi muốn chỉnh sửa
let getDetailUser = (id) => {
  console.log("hehe");

  // Đợi cho modal được hiển thị hoàn toàn, sau đó gọi phương thức show()

  myModal.show();

  let user = list.listPerson.find((item, index) => {
    return item.id == id;
  });
  if (user) {
    let input = document.querySelectorAll("#formUser input, #formUser select");
    let selectedValue = user.select;
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
    input.forEach((item, index) => {
      let { id } = item;
      item.value = user[id];
    });
    document.getElementById("select").readOnly = true;
    document.getElementById("id").readOnly = true;
  }
};

// sort theo id
let sortId = () => {
  console.log("alibaba");
  let arr = [...list.listPerson];
  arr.sort((a, b) => a.id - b.id);
  console.log(arr);
  render(arr);
  render2(arr);
};

// sort theo họ tên
let sortHoTen = () => {
  list.listPerson.forEach((item, index) => {
    let a = { ...item };
    let b = a.hoTen.split("", 1);
    console.log(b);
    item["firstLetter"] = b[0];
    console.log(list);
  });
  let arr = [...list.listPerson];
  arr.sort((a, b) => {
    if (a.firstLetter < b.firstLetter) {
      return -1;
    }
    if (a.firstLetter > b.firstLetter) {
      return 1;
    }
    return 0;
  });
  console.log(arr);
  render(arr);
  render2(arr);
};
let searchUser = (event) => {
  let input = event.target.value;
  var keyword = input.trim().toLowerCase();
  var newKeyword = removeVietnameseTones(keyword);
  let arrFilter = [];
  list.listPerson.forEach((item, index) => {
    let user = item;
    let data = removeVietnameseTones(user.select.trim().toLowerCase());
    if (data.includes(newKeyword)) {
      arrFilter.push(user);
    }
  });
  render(arrFilter);
  render2(arrFilter);
};

// Hàm bỏ dấu tiếng việt
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
window.onload = () => {
  window.deleteUser = (id) => {
    console.log(id);
    deleteUser(id);
  };
  window.getDetailUser = (id) => {
    getDetailUser(id);
  };
  window.updateUser = () => {
    updateUser();
  };
  window.sortHoTen = () => {
    sortHoTen();
  };
  window.sortId = () => {
    sortId();
  };
  window.searchUser = (event) => {
    searchUser(event);
  };
  //   window.removeVietnameseTones = (str) => {
  //     removeVietnameseTones(str);
  //   };
  //   window.render2 = () => {
  //     render2();
  //   };
};
