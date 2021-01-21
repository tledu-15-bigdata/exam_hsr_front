/**
 * 登陆界面，账号、密码框失去焦点时进行判空，不进行任何格式判断
 * @type {jQuery|HTMLElement}
 */
let acc = $('#account');
let password = $('#password');
let loginBtn = $('#loginBtn');
let markAcc = false;
let markPwd = false;

// let checkAcc = /^[a-z0-9_-]{3,16}$/;
// let checkPwd = /^[a-z0-9_-]{6,18}$/;

// acc.on('blur',function () {
//     if(checkAcc.test(acc.val())) {
//         changeBlue(acc);
//         markAcc = true;
//     }
//     else changeRed(acc);
// });
// password.on('blur',function () {
//     if(checkPwd.test(password.val())) {
//         changeBlue(password);
//         markPwd = true;
//     }
//     else changeRed(password);
// });
acc.on('blur',function () {
    if(acc.val() !== "") {
        changeBlue(acc);
        markAcc = true;
    }
    else changeRed(acc);
});
password.on('blur',function () {
    if(password.val() !== "") {
        changeBlue(password);
        markPwd = true;
    }
    else changeRed(password);
});


/**
 * 登陆界面，登陆按钮点击触发验证
 */
loginBtn.on('click',function () {
    if(markAcc && markPwd){
        let data = {
            uAcc: acc.val(),
            uPwd: password.val()
        };

        $.ajax({
            url: pathOl +　'login',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.uId === "" || result.uAcc === "" || result.uName === "" || result.uPwd === "" ||
                    result.uPhoto === "" || result.isDisabled === "" || result.isRoot === ""){
                    acc.text('');
                    password.text('');
                }else if(result.uId !== "" && result.uAcc !== "" && result.uName !== "" && result.uPwd !== "" &&
                    result.uPhoto !== "" && result.isDisabled === "1" && result.isRoot !== ""){
                    alert("该用户被禁用！！！");
                    acc.text('');
                    password.text('');
                }else{
                    localStorage.setItem("UserMsg", JSON.stringify(result));
                    // window.location.href = "http://localhost:8080/web01/index.html";
                    window.location.href = "index.html";
                }
            }
        });
    }
});

