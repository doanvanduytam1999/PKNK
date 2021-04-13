import '@babel/polyfill';
import { EWOULDBLOCK } from 'constants';
import ajax from 'jquery';
import Service from '../../models/serviceModel';
import catchAsync from '../../utils/catchAsync';

import { getService } from './getService';


import { login_customer, login_admin, logout, logoutAdmin } from './login';

//import { updateSettings } from './updateSettings';
//import { addAdmin } from './addAdmin';
/* import { 
    updatePhotoStudent,
    updateDocumentStudent,
    updateEnrollingStatus,
    updateTuition,
    updateCodeNumber
 } from './student'; */


//DOM ELEMENT
const loginForm = document.querySelector('.form-login');
const logOutBtn = document.querySelector('.logout');
const loginFormAdmin = document.querySelector('.from-login-admin');
const logOutBtnAdmin = document.querySelector('.logout-admin');
const getTypeService = document.querySelector('.loaiservice');
const logOutAdmin = document.querySelector('.logoutAdmin');
const dichvu = document.querySelector('.dichvu');
/*const adminDataForm = document.querySelector('.form-admin-data');
const adminPasswordForm = document.querySelector('.form-admin-password');
const addAdminForm = document.querySelector('.form-add-admin');
const editPhotoStudentForm = document.querySelector('.form-edit-photo-student');
const editDocumentStudentForm = document.querySelector('.form-edit-document-student');
const editStudyStudentForm = document.querySelector('.form-edit-study-student');
const editTuitionStudentForm = document.querySelector('.form-edit-tuition-student');
const editCodeNumberStudentForm = document.querySelector('.form-edit-codenumber-student');
 */
//Login and logout

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login_customer(username, password);
    });
};

if (loginFormAdmin) {
    loginFormAdmin.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('usernameadmin').value;
        const password = document.getElementById('passwordadmin').value;
        console.log(username, username);
        login_admin(username, password);
    });
};

if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
};
if (logOutAdmin) {
    logOutAdmin.addEventListener('click', logoutAdmin);
}


$(document).ready(function() {
    $('#loaiservice').change(function() {
        var id_loaiservice = $(this).val();
        console.log(id_loaiservice);
        $.ajax({
            type: 'GET',
            url: "https://pknk.herokuapp.com/api/v1/Customers/getService/" + id_loaiservice,
            success: function(data) {
                $('#id_service').find('option').remove().end();
                $('#id_service').append(`<option value="0">Chọn dịch vụ...</option>`);
                data.Services.forEach(function(element) {
                    $('#id_service').append(`<option value="${element._id}"> ${element.name}</option>`);
                })
            },
            error: function(e) {
                console.log(e.message);
            }

        })
    });
});

$(document).ready(function() {
    $('#id_city').change(function() {
        var id_city = $(this).val();
        var chinhanh = "---Chọn chi nhánh---"
        $.ajax({
            type: 'GET',
            url: 'https://pknk.herokuapp.com/api/v1/Customers/getDistrict/' + id_city,
            success: function(data) {
                $('#id_district').find('option').remove().end();
                $('#id_district').append("<option>" + chinhanh + "</option>");
                data.Districts.forEach(function(element) {

                    $('#id_district').append(`<option value="${element._id}"  >  ${element.districtName}  </option>`);
                })
            },
            error: function(e) {
                console.log(e.message);
            }

        })
    });
});

$(document).ready(function() {
    $('#id_district').change(function() {
        var id_district = $(this).val();
        var diachi = "---Chọn địa chỉ---"
        $.ajax({
            type: 'GET',
            url: 'https://pknk.herokuapp.com/api/v1/Customers/getAgency/' + id_district,
            success: function(data) {
                $('#id_agency').find('option').remove().end();
                $('#id_agency').append("<option>" + diachi + "</option>");

                data.Agencys.forEach(function(element) {
                    $('#id_agency').append("<option value=" + element._id + ">" + element.address + "</option>");
                    //$('#id_agency').append(`<option value="${element._id}"  >  ${element.address}  </option>`);
                })
            },
            error: function(e) {
                console.log(e.message);
            }

        })
    });
});

$(document).ready(function() {
    var i = 1;
    $('.multiservice').click(function() { //sửa cái class thành cai id cua chữ thêm
        const tbl = document.createElement('table');
        const tr = document.createElement('tr');
        const td = document.createElement('th');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const selectdichvu = document.createElement('select');
        const selectloaidichvu = document.createElement('select');
        const dele = document.createElement('a');


        dele.setAttribute('class', 'xoa');

        dele.innerHTML = 'Xoá';
        tbl.className = 'tblxoa';

        selectdichvu.className = 'multiservice';
        selectdichvu.setAttribute('class', 'loaiservice');
        selectdichvu.name = 'loaiservice';
        selectdichvu.id = 'id_loaiservice' + i;


        selectloaidichvu.className = 'service';
        selectloaidichvu.name = 'id_service';
        selectloaidichvu.id = 'id_multiservice' + i;
        td.appendChild(selectdichvu);
        td1.appendChild(selectloaidichvu);
        td2.appendChild(dele);
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        dichvu.appendChild(tbl);

        $.ajax({
            type: 'GET',
            url: "https://pknk.herokuapp.com/api/v1/Customers/getTypeService",
            success: function(data) {

                $('#id_loaiservice' + i).append(`<option value="0">Chọn dịch vụ...</option>`);


                data.TypeService.forEach(function(element) {
                    $('#id_loaiservice' + i).append("<option value=" + element._id + ">" + element.typeServiceName + "</option>");
                });

                $(document).ready(function() {
                    $('#id_loaiservice' + i).change(function() {

                        var id_dv = $(this).val();
                        var index = this.id.substr(14, 1);
                        console.log(index);
                        $.ajax({
                            type: 'GET',
                            url: "https://pknk.herokuapp.com/api/v1/Customers/getService/" + id_dv,
                            success: function(data) {

                                $('#id_multiservice' + index).find('option').remove().end();
                                $('#id_multiservice' + index).append(`<option value="0">Chọn dịch vụ...</option>`);
                                data.Services.forEach(function(element) {
                                    $('#id_multiservice' + index).append(`<option value="${element._id}"> ${element.name}</option>`);
                                })
                            },
                            error: function(e) {
                                console.log(e.message);
                            }
                        })
                    });
                });
                i++;
            },
            error: function(e) {
                console.log(e.message);
            }
        });
        $(document).ready(function() {
            $('.xoa').click(function(e) {

                e.target.parentElement.parentElement.remove();
            });

        })
    });
});



/*
if (adminDataForm) {
    adminDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', document.getElementById('username').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        updateSettings(form, 'data');
    });
};

if (adminPasswordForm) {
    adminPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn-save-password').textContent = 'Updating...';
        const passwordCurrent = document.getElementById('passwordCurrent').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        await updateSettings(
            {passwordCurrent, password, passwordConfirm},
             'password'
        );
        document.querySelector('.btn-save-password').textContent = 'Save password';
        document.getElementById('passwordCurrent').value = '';
        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';
    });
};

if(addAdminForm) {
    addAdminForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const role = document.getElementById('role').value;
        addAdmin({username, email, password, passwordConfirm, role});
    });
}

//edit photo student
if(editPhotoStudentForm) {
    editPhotoStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', document.getElementById('username').value);
        form.append('idStu', document.getElementById('idStu').value);
        console.log( document.getElementById('idStu').value);
        form.append('photoStu', document.getElementById('photoStu').files[0]);
        updatePhotoStudent(form);
    })
}

//edit document student

if(editDocumentStudentForm) {
    editDocumentStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', document.getElementById('username').value);
        form.append('idStu', document.getElementById('idStu').value);
        for(var i=0;i<filesLength;i++){
            form.append("documents", document.getElementById('documents').files[i]);
        }
        updateDocumentStudent(form);
    })
}
//edit study student
if(editStudyStudentForm) {
    editStudyStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('idStu').value;
        const enrollingStatus = document.getElementById('enrollingStatus').value;
        updateEnrollingStatus({id, enrollingStatus});
    })
}

//edit tuition student
if(editTuitionStudentForm) {
    editTuitionStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('idStu').value;
        const tuition = document.getElementById('tuition').value;
        updateTuition({id, tuition});
    })
}
//edit odenumber student

if(editCodeNumberStudentForm) {
    editCodeNumberStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('idStu').value;
        const codeNumber = document.getElementById('codeNumber').value;
        updateCodeNumber({id, codeNumber});
    })
}
 */

//Page Admin
/* jQuery(function ($) {
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });
});
 */