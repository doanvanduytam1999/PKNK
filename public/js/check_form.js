const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const phone = document.querySelector('#phone');

function check_name() {
    txtinput = document.querySelector('#name').value;
    txtspan = document.querySelector('#warning_name').innerHTML;
    txtspan1 = document.querySelector('#warning_name');
    if(txtinput.length == 0 && txtspan.length ==0){
        txtspan1.innerHTML="Tên không được để trống !";
    }
    else{
        txtspan1.innerHTML="";
    }
    
}
function check_username() {
    txtinput = document.querySelector('#username').value;
    txtspan = document.querySelector('#warning_username').innerHTML;
    txtspan1 = document.querySelector('#warning_username');
    if(txtinput.length == 0 && txtspan.length ==0){
        txtspan1.innerHTML="Tên tài khoảng không được để trống !";
    }
    else{
        txtspan1.innerHTML="";
    }
    
}
function check_email() {
    txtinput = document.querySelector('#email').value;
    txtspan = document.querySelector('#warning_email').innerHTML;
    txtspan1 = document.querySelector('#warning_email');
    if(txtinput.length == 0 && txtspan.length ==0){
        txtspan1.innerHTML="Email không được để trống !";
    }
    else{
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        if (!filter.test(txtinput)) { 
            txtspan1.innerHTML="Email không hợp lệ!";
        }
        else{ 
            txtspan1.innerHTML="";
        } 
        
    }
    
}
function check_pass() {
    txtinput = document.querySelector('#password').value;
    passCF = document.querySelector('#passwordConfirm').value;

    txtspan = document.querySelector('#warning_passwordConfirm').innerHTML;
    txtspan1 = document.querySelector('#warning_password');
    txtspan1CF = document.querySelector('#warning_passwordConfirm');

    if(txtinput.length == 0 && txtspan.length ==0){
        txtspan1.innerHTML="Mật khẩu không được để trống !";
    }
    else{
        if(txtinput !== passCF){
            txtspan1CF.innerHTML="Mật khẩu xác nhận phải khớp với Mật khẩu.";
        }
        else{
            txtspan1.innerHTML="";
            txtspan1CF.innerHTML="";

        }
        
    }
    
}
loadEventListeners()
function loadEventListeners() {
    username.addEventListener('click', check_name);

    email.addEventListener('click',check_username);
    email.addEventListener('click',check_name);

    password.addEventListener('click', check_email);
    password.addEventListener('click', check_name);
    password.addEventListener('click', check_username);


    phone.addEventListener('click', check_pass);
    phone.addEventListener('click', check_email);
    phone.addEventListener('click', check_name);
    phone.addEventListener('click', check_username);

}