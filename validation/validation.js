// import user from "./user.js";
// Kiểm tra không cho nhập rỗng
export function checkEmptyValue(value, idSpan) {
  // Xử lí dữ liệu value để kiểm tra xem có rỗng hay không
  let eleSpan = document.getElementById(idSpan);
  if (value == "") {
    // Thực hiện đưa lên giao diện một đoạn thông báo cho người dùng
    eleSpan.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    eleSpan.innerHTML = "";
    return true;
  }
}

// Kiểm tra phải là email
export function checkEmailValue(value, idSpan) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isValid = regexEmail.test(value);
  // console.log(isValid);
  let eleSpan = document.getElementById(idSpan);
  if (isValid) {
    eleSpan.innerHTML = "";
    return true;
  } else {
    eleSpan.innerHTML = "Email không đúng định dạng";
    return false;
  }
}

export function checkNoNumber(value, idSpan) {
  const regexNoNumber = /\b[^\d\W]+\b/g;
  let isValid = regexNoNumber.test(value);
  let eleSpan = document.getElementById(idSpan);
  if (isValid) {
    eleSpan.innerHTML = "";
    return true;
  } else {
    eleSpan.innerHTML = "Vui lòng chỉ nhập ký tự không kèm số";
    return false;
  }
}

export function checkNoText(value, idSpan) {
  const regexNoNumber = /^\d+$/;
  let isValid = regexNoNumber.test(value);
  let eleSpan = document.getElementById(idSpan);
  if (isValid) {
    eleSpan.innerHTML = "";
    return true;
  } else {
    eleSpan.innerHTML = "Vui lòng chỉ nhập số không kèm ký tự";
    return false;
  }
}
export function checkIdValid(value, idSpan, arr) {
  let isValid = arr.some((item) => item.id === value);
  let eleSpan = document.getElementById(idSpan);
  if (isValid) {
    eleSpan.innerHTML = "Vui lòng nhập ID  mới không trùng";
    return false;
  } else {
    eleSpan.innerHTML = "";
    return true;
  }
}
