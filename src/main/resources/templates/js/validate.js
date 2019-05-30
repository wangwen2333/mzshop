﻿var validateRegExp = {
    decmal: "^([+-]?)\\d*\\.\\d+$", //浮点数
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
    intege: "^-?[1-9]\\d*$", //整数
    intege1: "^[1-9]\\d*$", //正整数
    intege2: "^-[1-9]\\d*$", //负整数
    num: "^([+-]?)\\d*\\.?\\d+$", //数字
    num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
    color: "^[a-fA-F0-9]{6}$", //颜色
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    idcard: "^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
    letter: "^[A-Za-z]+$", //字母
    letter_l: "^[a-z]+$", //小写字母
    letter_u: "^[A-Z]+$", //大写字母
    mobile: "^0?(13|15|18|14|17)[0-9]{9}$", //手机
    notempty: "^\\S+$", //非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    fullNumber: "^[0-9]+$", //数字
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
    qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
    rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
    tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    username: "(^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$)|(^0?(13|15|18|14|17)[0-9]{9}$)", //用户名
    usernameOK: "^[A-Za-z0-9\\u4e00-\\u9fa5]{2,20}$", // 用户名
    deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$", //单位名
    zipcode: "^\\d{6}$", //邮编
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
    companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
    companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
    companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$"
};

//主函数
(function ($) {
    $.fn.jdValidate = function (option, callback, def) {
        var ele = this;
        var id = ele.attr("id");
        var type = ele.attr("type");
        var rel = ele.attr("rel");
        var _onFocus = $("#" + id + validateSettings.onFocus.container);
        var _succeed = $("#" + id + validateSettings.succeed.container);
        var _isNull = $("#" + id + validateSettings.isNull.container);
        var _error = $("#" + id + validateSettings.error.container);
        if (def == true) {
            var str = ele.val();
            var tag = ele.attr("sta");
            if (str == "" || str == "-1") {
                validateSettings.isNull.run({
                    prompts: option,
                    element: ele,
                    isNullEle: _isNull,
                    succeedEle: _succeed
                }, option.isNull);
            } else if (tag == 1 || tag == 2) {
                return;
            } else {
                callback({
                    prompts: option,
                    element: ele,
                    value: str,
                    errorEle: _error,
                    isNullEle: _isNull,
                    succeedEle: _succeed
                });
            }
        } else {
            if (typeof def == "string") {
                ele.val(def);
            }
            if (type == "checkbox" || type == "radio") {
                if (ele.attr("checked") == true) {
                    ele.attr("sta", validateSettings.succeed.state);
                }
            }
            switch (type) {
                case "text":
                case "password":
                    ele.bind("focus", function () {
                        var str = ele.val();
                        if (str == def) {
                            ele.val("");
                        }
                        if (id == "txtPassword") {
                            $("#pwdstrength").hide();
                        }
                        validateSettings.onFocus.run({
                            prompts: option,
                            element: ele,
                            value: str,
                            onFocusEle: _onFocus,
                            succeedEle: _succeed
                        }, option.onFocus);
                    })
                        .bind("blur", function () {
                            var str = ele.val();
                            if (str == "") {
                                ele.val(def);
                            }
                            if (validateRules.isNull(str)) {
                                validateSettings.isNull.run({
                                    prompts: option,
                                    element: ele,
                                    value: str,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                }, "");
                            } else {
                                callback({
                                    prompts: option,
                                    element: ele,
                                    value: str,
                                    errorEle: _error,
                                    isNullEle: _isNull,
                                    succeedEle: _succeed
                                });
                            }
                        });
                    break;
                default:
                    if (rel && rel == "select") {
                        ele.bind("change", function () {
                            var str = ele.val();
                            callback({
                                prompts: option,
                                element: ele,
                                value: str,
                                errorEle: _error,
                                isNullEle: _isNull,
                                succeedEle: _succeed
                            });
                        })
                    } else {
                        ele.bind("click", function () {
                            callback({
                                prompts: option,
                                element: ele,
                                errorEle: _error,
                                isNullEle: _isNull,
                                succeedEle: _succeed
                            });
                        })
                    }
                    break;
            }
        }
    }
})(jQuery);

//配置
var validateSettings = {
    onFocus: {
        state: null,
        container: "_error",
        style: "focus",
        run: function (option, str) {
            if (!validateRules.checkType(option.element)) {
                option.element.removeClass(validateSettings.INPUT_style2).addClass(validateSettings.INPUT_style1);
            }
            option.succeedEle.removeClass(validateSettings.succeed.style);
            option.onFocusEle.removeClass().addClass(validateSettings.onFocus.style).html(str);
        }
    },
    isNull: {
        state: 0,
        container: "_error",
        style: "error",
        run: function (option, str) {
            option.element.attr("sta", 0);
            if (!validateRules.checkType(option.element)) {
                if (str != "") {
                    option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
                } else {
                    option.element.removeClass(validateSettings.INPUT_style2).removeClass(validateSettings.INPUT_style1);
                }
            }
            option.succeedEle.removeClass(validateSettings.succeed.style);
            option.isNullEle.removeClass().addClass(validateSettings.isNull.style).html(str);
        }
    },
    error: {
        state: 1,
        container: "_error",
        style: "error",
        run: function (option, str) {
            $("#" + option.element.attr("id")).addClass("error2");
            option.element.attr("sta", 1);
            if (!validateRules.checkType(option.element)) {
                option.element.removeClass(validateSettings.INPUT_style1).addClass(validateSettings.INPUT_style2);
            }
            option.succeedEle.removeClass(validateSettings.succeed.style);
            option.errorEle.removeClass().addClass(validateSettings.error.style).html(str);
        }
    },
    succeed: {
        state: 2,
        container: "_succeed",
        style: "succeed",
        run: function (option) {
            $("#" + option.element.attr("id")).removeClass("error2");
            option.element.attr("sta", 2);
            option.errorEle.empty();

            if (!validateRules.checkType(option.element)) {
                option.element.removeClass(validateSettings.INPUT_style1).removeClass(validateSettings.INPUT_style2);
            }
            if (option.element.attr("id") == "schoolinput" && $("#schoolid").val() == "") {
                return;
            }
            option.isNullEle.removeClass();
            option.succeedEle.addClass(validateSettings.succeed.style);
        }
    },
    INPUT_style1: "highlight1",
    INPUT_style2: "highlight2"

};

//验证规则
var validateRules = {
    isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    betweenLength: function (str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isUid: function (str) {
        return new RegExp(validateRegExp.username).test(str);
    },
    fullNumberName: function (str) {
        return new RegExp(validateRegExp.fullNumber).test(str);
    },
    isPwd: function (str) {
        return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
    },
    isPwd2: function (str1, str2) {
        return (str1 == str2);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    isTel: function (str) {
        return new RegExp(validateRegExp.tel).test(str);
    },
    isMobile: function (str) {
        return new RegExp(validateRegExp.mobile).test(str);
    },
    checkType: function (element) {
        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
    },
    isChinese: function (str) {
        return new RegExp(validateRegExp.chinese).test(str);
    },
    isRealName: function (str) {
        return new RegExp(validateRegExp.realname).test(str);
    },
    isDeptname: function (str) {
        return new RegExp(validateRegExp.deptname).test(str);
    },
    isCompanyname: function (str) {
        return new RegExp(validateRegExp.companyname).test(str);
    },
    isCompanyaddr: function (str) {
        return new RegExp(validateRegExp.companyaddr).test(str);
    },
    isCompanysite: function (str) {
        return new RegExp(validateRegExp.companysite).test(str);
    },
    isUserNameOK: function (str) {
        return new RegExp(validateRegExp.usernameOK).test(str);
    }
};
//验证文本
var validatePrompt = {
    //usernameOK: {
    //    onFocus: "6-50位字符组成",
    //    succeed: "",
    //    isNull: "请输入用户名",
    //    error: {
    //        beUsed: "该用户已被使用，请更换，如果您是&quot;{1}&quot;，请<a href='/User/login.aspx' class='flk13'>登录</a>",
    //        badLength: "用户名长度只能在2-20位字符之间",
    //        badFormat: "用户名只能英文数字中文",
    //        fullNumberName: "不能全为数字"
    //    }
    //},
    username: {
        onFocus: "6-50位字符组成",
        succeed: "",
        isNull: "请输入邮箱/手机号",
        error: {
            beUsed: "该邮箱或手机号已被使用，请更换，如果您是&quot;{1}&quot;，请<a href='/User/login.aspx' class='flk13'>登录</a>",
            badLength: "长度只能在6-50位字符之间",
            badFormat: "只能邮箱或手机号码",
            fullNumberName: "不能全为数字"
        }
    },
    pwd: {
        onFocus: "6-20位字符，可由英文、数字及标点符号组成",
        succeed: "",
        isNull: "请输入密码",
        error: {
            badLength: "密码长度只能在6-20位字符之间",
            badFormat: "密码只能由英文、数字及标点符号组成"
        }
    },
    pwd2: {
        onFocus: "请再次输入密码",
        succeed: "",
        isNull: "请输入密码",
        error: {
            badLength: "密码长度只能在6-20位字符之间",
            badFormat2: "两次输入密码不一致",
            badFormat1: "密码只能由英文、数字及标点符号组成"
        }
    },
    mail: {
        onFocus: "请输入常用的邮箱，将用来找回密码、接收订单通知等",
        succeed: "",
        isNull: "请输入邮箱",
        error: {
            beUsed: "该邮箱已被使用，请更换，或使用该邮箱<a href='ForgotPassword.aspx' class='flk13'>找回密码</a>",
            badFormat: "邮箱格式不正确",
            badLength: "您填写的邮箱过长，邮件地址只能在50个字符以内"
        }
    },
    authcode: {
        onFocus: "请输入验证码，不区分大小写",
        succeed: "",
        isNull: "请输入验证码",
        error: "验证码错误"
    },
    authPhonecode: {
        onFocus: "请输入手机验证码，不区分大小写",
        succeed: "",
        isNull: "请输入手机验证码",
        error: "手机验证码错误"
    },
    realname: {
        onFocus: "2-20位字符，可由中文或英文组成",
        succeed: "",
        isNull: "请输入真实姓名",
        error: {
            badLength: "真实姓名长度只能在2-20位字符之间",
            badFormat: "真实姓名只能由中文或英文组成"
        }
    },
    birthDay: {
        onFocus: "请输入生日",
        succeed: "",
        isNull: "请输入生日",
        error: ""
    },
    protocol: {
        onFocus: "",
        succeed: "",
        isNull: "请先阅读并同意《商城用户协议》",
        error: ""
    },
    referrer: {
        onFocus: "如您注册并完成订单，推荐人有机会获得积分",
        succeed: "",
        isNull: "",
        error: ""
    },
    schoolinput: {
        onFocus: "您可以用简拼、全拼、中文进行校名模糊查找",
        succeed: "",
        isNull: "请填选学校名称",
        error: "请填选学校名称"
    },
    empty: {
        onFocus: "",
        succeed: "",
        isNull: "",
        error: ""
    }
};

var nameold, emailold, authcodeold, authphonecodeold;
var namestate = false, emailstate = false, authcodestate = false; authphonecodestate = false;

//回调函数
var validateFunction = {
    username: function (option) {
        var format = validateRules.isUid(option.value);
        var length = validateRules.betweenLength(option.value, 6, 50);

        if (!length && format) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else if (!length && !format) {
            validateSettings.error.run(option, option.prompts.error.badFormat);
        }
        else if (length && !format) {
            validateSettings.error.run(option, option.prompts.error.badFormat);
        }
        else {
            if (!namestate || nameold != option.value) {
                if (nameold != option.value) {
                    nameold = option.value;
                    option.errorEle.html("<span style='color:#999'>检验中……</span>");

                    $.getJSON("Handler/MemberHandler.ashx?action=ExistUsername&username=" + escape(option.value) + "&r=" + Math.random(), function (date) {

                        if (date.success == "false") {
                            validateSettings.succeed.run(option);
                            namestate = true;
                            //禁止短信发送按钮
                            $("#phoneVerifyCode").removeAttr("disabled");
                        }
                        else {
                            validateSettings.error.run(option, option.prompts.error.beUsed.replace("{1}", option.value));
                            namestate = false;
                            //禁止短信发送按钮
                            $("#phoneVerifyCode").attr("disabled", true);
                        }
                    })
                }
                else {
                    validateSettings.error.run(option, option.prompts.error.beUsed.replace("{1}", option.value));
                    namestate = false;
                }
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    pwd: function (option) {
        var str1 = option.value;
        var str2 = $("#txtPassword2").val();
        var format = validateRules.isPwd(option.value);
        var length = validateRules.betweenLength(option.value, 6, 20);
        $("#pwdstrength").hide();

        if (!length && format) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else if (!length && !format) {
            validateSettings.error.run(option, option.prompts.error.badFormat);
        }
        else if (length && !format) {
            validateSettings.error.run(option, option.prompts.error.badFormat);
        }
        else {
            validateSettings.succeed.run(option);
            validateFunction.pwdstrength();
        }
        if (str2 == str1) {
            $("#txtPassword2").focus();
        }
    },
    pwd2: function (option) {

        var str1 = option.value;
        var str2 = $("#txtPassword").val();
        var length = validateRules.betweenLength(option.value, 6, 20);
        var format2 = validateRules.isPwd2(str1, str2);
        var format1 = validateRules.isPwd(str1);

        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format1) {
                validateSettings.error.run(option, option.prompts.error.badFormat1);
            }
            else {
                if (!format2) {
                    validateSettings.error.run(option, option.prompts.error.badFormat2);
                }
                else {
                    validateSettings.succeed.run(option);
                }
            }
        }
    },
    realname: function (option) {

        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 2, 20);
        var format = validateRules.isRealName(option.value);

        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    birthday: function (option) {
        var bool = validateRules.isNull(option.value);
        if (bool) {
            validateSettings.error.run(option, option.isNull)
        } else {
            option.element.attr("sta", validateSettings.succeed.state);
            validateSettings.succeed.run(option);
        }
    },
    mail: function (option) {

        var format = validateRules.isEmail(option.value);
        var format2 = validateRules.betweenLength(option.value, 0, 50);

        if (!format) {
            validateSettings.error.run(option, option.prompts.error.badFormat);
        }
        else {
            if (!format2) {
                validateSettings.error.run(option, option.prompts.error.badLength);
            } else {
                if (!emailstate || emailold != option.value) {
                    if (emailold != option.value) {
                        emailold = option.value;
                        option.errorEle.html("<span style='color:#999'>检验中……</span>");
                        $.getJSON("Handler/MemberHandler.ashx?action=RepeatEmail&email=" + escape(option.value) + "&r=" + Math.random(), function (date) {

                            if (date.success == "false") {
                                validateSettings.succeed.run(option);
                                emailstate = true;
                            }
                            else {
                                validateSettings.error.run(option, option.prompts.error.beUsed);
                                emailstate = false;
                            }
                        })
                    }
                    else {
                        validateSettings.error.run(option, option.prompts.error.beUsed);
                        emailstate = false;
                    }
                }
                else {
                    validateSettings.succeed.run(option);
                }
            }
        }
    },
    referrer: function (option) {

        var bool = validateRules.isNull(option.value);

        if (bool) {
            option.element.val("可不填");
            return;
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    schoolinput: function (option) {
        var bool = validateRules.isNull(option.value);

        if (bool) {
            validateSettings.error.run(option, option.prompts.error);
            return;
        } else {
            validateSettings.succeed.run(option);
        }
    },
    authcode: function (option) {

        authcodeold = option.value;
        option.errorEle.html("<span style='color:#999'>检验中……</span>");

        $.getJSON("Handler/MemberHandler.ashx?action=CheckAuthcode&code=" + escape(option.value) + "&r=" + Math.random(), function (date) {
            if (date.success == "true") {
                validateSettings.succeed.run(option);
                authcodestate = true;
            } else {
                validateSettings.error.run(option, option.prompts.error);
                authcodestate = false;
            }
        });
    },
    authPhonecode: function (option) {
        authphonecodeold = option.value;
        option.errorEle.html("<span style='color:#999'>检验中……</span>");
        var phone = $("#txtUserName").val();
        $.getJSON("Handler/MemberHandler.ashx?action=CheckAuthPhonecode&code=" + escape(option.value) + "&phone=" + phone + "&r=" + Math.random(), function (date) {
            if (date.success == "true") {
                validateSettings.succeed.run(option);
                authphonecodestate = true;
            } else {
                validateSettings.error.run(option, option.prompts.error);
                authphonecodestate = false;
            }
        });
    },
    protocol: function (option) {
        if (option.element.attr("checked") == true) {
            option.element.attr("sta", validateSettings.succeed.state);
            option.errorEle.html("");
        }
        else {
            option.element.attr("sta", validateSettings.isNull.state);
            option.succeedEle.removeClass(validateSettings.succeed.style);
        }
    },
    pwdstrength: function () {

        var element = $("#pwdstrength");
        var value = $("#txtPassword").val();

        if (value.length >= 6 && validateRules.isPwd(value)) {

            $("#txtPassword_error").empty();
            element.show();

            var pattern_1 = /^.*([\W_])+.*$/i;
            var pattern_2 = /^.*([a-zA-Z])+.*$/i;
            var pattern_3 = /^.*([0-9])+.*$/i;
            var level = 0;

            if (value.length > 10) {
                level++;
            }

            if (pattern_1.test(value)) {
                level++;
            }

            if (pattern_2.test(value)) {
                level++;
            }

            if (pattern_3.test(value)) {
                level++;
            }

            if (level > 3) {
                level = 3;
            }

            switch (level) {
                case 1:
                    element.removeClass().addClass("strengthA");
                    break;
                case 2:
                    element.removeClass().addClass("strengthB");
                    break;
                case 3:
                    element.removeClass().addClass("strengthC");
                    break;
                default:
                    break;
            }
        }
        else {
            element.hide();
        }
    },
    checkGroup: function (elements) {

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                return true;
            }
        }

        return false;
    },
    checkSelectGroup: function (elements) {

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].value == -1) {
                return false;
            }
        }

        return true;
    },
    showPassword: function (type) {
        var v1 = $("#txtPassword").val(), s1 = $("#txtPassword").attr("sta"), c1 = document.getElementById("txtPassword").className, t1 = $("#txtPassword").attr("tabindex");
        var v2 = $("#txtPassword2").val(), s2 = $("#txtPassword2").attr("sta"), c2 = document.getElementById("txtPassword2").className, t2 = $("#txtPassword2").attr("tabindex");
        var P1 = $("<input type='" + type + "' value='" + v1 + "' sta='" + s1 + "' class='" + c1 + "' id='txtPassword' name='txtPassword' tabindex='" + t1 + "'/>");
        $("#txtPassword").after(P1).remove();
        $("#txtPassword").bind("keyup",
            function () {
                validateFunction.pwdstrength();
            }).jdValidate(validatePrompt.pwd, validateFunction.pwd)
        var P2 = $("<input type='" + type + "' value='" + v2 + "' sta='" + s2 + "' class='" + c2 + "' id='txtPassword2' name='txtPassword2' tabindex='" + t2 + "'/>");
        $("#txtPassword2").after(P2).remove();
        $("#txtPassword2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2);
    },
    FORM_submit: function (elements) {
        var bool = true;

        for (var i = 0; i < elements.length; i++) {

            if ($(elements[i]).attr("sta") == 2) {
                bool = true;
            }
            else {
                bool = false;
                break;
            }
        }

        return bool;
    }
};

$.extend(validatePrompt, {

    department: {
        onFocus: "",
        succeed: "",
        isNull: "请选择联系人所在部门",
        error: ""
    },
    tel: {
        onFocus: "请填写联系人常用的电话，以便于我们联系，如：0527-88105500",
        succeed: "",
        isNull: "请输入联系人固定电话",
        error: "电话格式错误，请重新输入"
    },
    mobile: {
        onFocus: "请输入您的手机号码",
        succeed: "",
        isNull: "请输入您的手机号码",
        error: "手机号格式错误，请重新输入"
    },
    companyname: {
        onFocus: "请填写工商局注册的全称。4-40位字符，可由中英文、数字及“_”、“-”、()、（）组成",
        succeed: "",
        isNull: "请输入公司名称",
        error: {
            badLength: "公司名称长度只能在4-40位字符之间",
            badFormat: "公司名称只能由中文、英文、数字及“_”、“-”、()、（）组成"
        }
    },
    companyarea: {
        onFocus: "请选择公司所在地",
        succeed: "",
        isNull: "请选择公司所在地",
        error: ""
    },
    companyaddr: {
        onFocus: "请详细填写公司经营地址　如：北京市海淀区苏州街20号银丰大厦B座3层",
        succeed: "",
        isNull: "请输入公司地址",
        error: {
            badLength: "公司地址长度只能在4-50位字符之间",
            badFormat: "公司地址只能由中文、英文、数字及“_”、“-”、()、（）、#组成"
        }
    },
    purpose: {
        onFocus: "",
        succeed: "",
        isNull: "请选择购买类型/用途",
        error: ""
    },
    companysite: {
        onFocus: "如：http://www.360buy.com",
        succeed: "",
        isNull: "请输入公司网址",
        error: {
            badLength: "公司网址长度只能在80位字符之内",
            badFormat: "公司网址格式不正确。应如：http://www.360buy.com"
        }
    }
});

$.extend(validateFunction, {
    department: function (option) {

        var bool = (option.value == -1);

        if (bool) {
            validateSettings.isNull.run(option, "");
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    tel: function (option) {
        var format = validateRules.isTel(option.value);

        if (!format) {
            validateSettings.error.run(option, option.prompts.error);
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    mobile: function (option) {

        var format = validateRules.isMobile(option.value);

        if (!format) {
            validateSettings.error.run(option, option.prompts.error);
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    companyname: function (option) {

        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 40);
        var format = validateRules.isCompanyname(option.value);

        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    companyarea: function (option) {
        var bool = (option.value == -1);
        if (bool) {
            validateSettings.isNull.run(option, "");
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    companyaddr: function (option) {

        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 50);
        var format = validateRules.isCompanyaddr(option.value);

        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    purpose: function (option) {
        var purpose = $("input:checkbox[@name='purposetype']");
        if (validateFunction.checkGroup(purpose)) {
            validateSettings.succeed.run(option);
        } else {
            validateSettings.error.run(option, option.prompts.isNull);
        }
    },
    companysite: function (option) {

        var length = validateRules.betweenLength(option.value, 0, 80);
        var format = validateRules.isCompanysite(option.value);

        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    FORM_validate: function () {
        $("#txtUserName").jdValidate(validatePrompt.username, validateFunction.username, true);
        $("#txtPassword").jdValidate(validatePrompt.pwd, validateFunction.pwd, true)
        $("#txtPassword2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2, true);
        if ($("#divRealName").get(0)) {
            $("#txtRealName").jdValidate(validatePrompt.realname, validateFunction.realname, true);
        }
        if ($("#divBirthday").get(0)) {
            $("#txtBirthday").jdValidate(validatePrompt.birthDay, validateFunction.birthday, true);
        }
        $("#txtNumber").jdValidate(validatePrompt.authcode, validateFunction.authcode, true);
        $("#txtPhoneCode").jdValidate(validatePrompt.authPhonecode, validateFunction.authPhonecode, true);
        if ($("#divRealName").get(0) && $("#divBirthday").get(0)) {
            return validateFunction.FORM_submit(["#txtUserName", "#txtPassword", "#txtPassword2", "#txtRealName", "#txtBirthday"]);
        }
        if ($("#divRealName").get(0) && !$("#divBirthday").get(0)) {
            return validateFunction.FORM_submit(["#txtUserName", "#txtPassword", "#txtPassword2", "#txtRealName"]);
        }
        if (!$("#divRealName").get(0) && $("#divBirthday").get(0)) {
            return validateFunction.FORM_submit(["#txtUserName", "#txtPassword", "#txtPassword2", "#txtBirthday"]);
        }
        return validateFunction.FORM_submit(["#txtUserName", "#txtPassword", "#txtPassword2"]);
    }//,
    //usernameOK: function (option) {

    //    var format = validateRules.isUserNameOK(option.value);

    //    if (!format) {
    //        validateSettings.error.run(option, option.prompts.error);
    //    }
    //    else {
    //        validateSettings.succeed.run(option);
    //    }
    //}
});

//默认下用户名框获得焦点
setTimeout(function () {
    if ($("#divNameOK").is(":visible"))
        $("#txtUserNameOK").get(0).focus();
    else
        $("#txtUserName").get(0).focus();
}, 0);

//用户名验证
$("#txtUserName").jdValidate(validatePrompt.username, validateFunction.username);

$("#txtRealName").jdValidate(validatePrompt.realname, validateFunction.realname);

$("#txtBirthday").jdValidate(validatePrompt.birthDay, validateFunction.birthday);

//密码验证
$("#txtPassword").bind("keyup", function () {
    validateFunction.pwdstrength();
}).jdValidate(validatePrompt.pwd, validateFunction.pwd);

//二次密码验证
$("#txtPassword2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2);

//验证码验证
$("#txtNumber").jdValidate(validatePrompt.authcode, validateFunction.authcode);

//手机验证码验证
$("#txtPhoneCode").jdValidate(validatePrompt.authPhonecode, validateFunction.authPhonecode);

//键盘输入验证码验证
$("#txtNumber").bind('keyup', function (event) {
    if (event.keyCode == 13) {
        if ($("#txtPhoneCode").css("display") != "block") {
            $("#register_btnRegister").click();
        }
    }
});

//键盘输入短信验证码验证
$("#txtPhoneCode").bind('keyup', function (event) {
    if (event.keyCode == 13) {
        $("#register_btnRegister").click();
    }
});

//确认协议才能提交
$("#chkAgree").click(function () {
    if ($("#chkAgree").is(":checked") != true) {
        $("#register_btnRegister").attr({ "disabled": "disabled" });
        $("#register_btnRegister").addClass("disabled");
        $("#register_btnRegister").css("display", "none");
    }
    else {
        $("#register_btnRegister").removeAttr("disabled");
        $("#register_btnRegister").removeClass("disabled");
        $("#register_btnRegister").css("display", "");
    }
});

//**********20161202加 start****//
function nameokfocus() {
    $("#txtUserNameOK_error").attr("class", "focus");
    $("#txtUserNameOK_error").text("2-20字符组成!");
}
function checkNameLength(ischk) {
    $("#txtUserNameOK_error").text("");
    var value = $("#txtUserNameOK").val();
    if (!ischk && value.trim().length == 0) {
        $("#txtUserNameOK_error").attr("class", "error");
        $("#txtUserNameOK_error").text("");
        return false;
    }
    if (value.trim().length == 0) {
        $("#txtUserNameOK_error").attr("class", "error");
        $("#txtUserNameOK_error").text("请输入用户名!");
        return false;
    }

    if (!validateRules.isUserNameOK(value)){
        $("#txtUserNameOK_error").text("用户名只能英文数字中文字符!");
        $("#txtUserNameOK_error").attr("class", "error");
        return false;
    }

    $("#txtUserNameOK_error").html("<span style='color:#999'>检验中……</span>");
    $.getJSON("Handler/MemberHandler.ashx?action=ExistUsername&username=" + escape(value) + "&r=" + Math.random(), function (date) {
        if (date.success == "false") {
            $("#txtUserNameOK_succeed").addClass("succeed");
            $("#txtUserNameOK_error").html("");
            return false;
        } else {
            $("#txtUserNameOK_succeed").removeClass("succeed");
            $("#txtUserNameOK_error").attr("class", "error");
            $("#txtUserNameOK_error").html("该用户名已被使用，请更换，如果您是&quot;" + value + "&quot;，请<a href='/User/login.aspx' class='flk13'>登录</a>");
        }
    });

    return true;
}
//**********20161202加  end*****//

//表单提交验证和服务器请求
$("#register_btnRegister").click(function () {
    var flag = validateFunction.FORM_validate();
    if ($("#hidIsIsSurportName").val() == "1") {    //增加单独用户判断
        if (!checkNameLength(true))
            return;
    }

    if (flag) {
        if ($("#txtNumber").val().trim().length == 0) {
            $("txtNumber_error").show();
            return;
        }

        $(this).attr({ "disabled": "disabled" }).removeClass("xieyi_btn").addClass("xieyi_submit_btn");       
        $.ajax({
            type: "POST",
            url: "Handler/MemberHandler.ashx?action=RegisterMember",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: $("#aspnetForm").serialize(),
            success: function (result) {

                if (result.success == "true") {
                    if (result.GiftCouponMsg != "")
                        alert(result.GiftCouponMsg);
                    var toReferral = getParam("toReferral");
                    var goDefault = getParam("goDefault");

                    if (goDefault != null && goDefault != "" && goDefault.toLowerCase() == "true") {
                        location.replace("/");
                    } else if (toReferral != null && toReferral != "" && toReferral.toLowerCase() == "true") {
                        location.replace("/user/ReferralRegister.aspx");
                    }
                    else {
                        if (document.referrer) {
                            if (document.referrer.toLowerCase().indexOf('login.aspx') > -1 || document.referrer.toLowerCase().indexOf('register.aspx') > -1 || document.referrer.toLowerCase().indexOf('logout.aspx') > -1) {
                                window.location.replace("/user/userdefault.aspx");
                            }
                            else {
                                window.location.replace(document.referrer);
                            }
                        }
                        else {
                            window.location.replace(decodeURIComponent(result.msg));
                        }
                    }
                }
                else {
                    $("#register_btnRegister").removeAttr("disabled").addClass("xieyi_btn");
                    refreshCode();
                    alert(result.msg);
                }
            },
        });
    }
    else {
        return false;
    }
});