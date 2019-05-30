var Reg_int_non_negative = /^\d+$/;　　//非负整数（正整数 + 0） 
var Reg_int_positive = /^[0-9]*[1-9][0-9]*$/;　　//正整数 
var Reg_int_no_positive = /^((-\d+)|(0+))$/;　　//非正整数（负整数 + 0） 
var Reg_int_negativeg = /^-[0-9]*[1-9][0-9]*$/;　　//负整数 
var Reg_int = /^-?\d+$/;　　　　//整数 
var Reg_float_non_negative = /^\d+(\.\d+)?$/;　　//非负浮点数（正浮点数 + 0） 
var Reg_float_positive = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;　　//正浮点数
var Reg_float_no_positive = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;　　//非正浮点数（负浮点数 + 0） 
var Reg_float_negative = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;　　//负浮点数
var Reg_float = /^(-?\d+)(\.\d+)?$/　　//浮点数 
var Reg_letter = /^[A-Za-z]+$/;　　//由26个英文字母组成的字符串 
var Reg_letter_upper = /^[A-Z]+$/;　　//由26个英文字母的大写组成的字符串 
var Reg_letter_lower = /^[a-z]+$/;　　//由26个英文字母的小写组成的字符串 
var Reg_letter_digital = /^[A-Za-z0-9]+$/;　　//由数字和26个英文字母组成的字符串
var Reg_letter_digital_underline = /^\w+$/;　　//由数字、26个英文字母或者下划线组成的字符串
var Reg_emal = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/　　　　//email地址 
var Reg_url = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;　　//url
var Reg_ipV4 = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
var Reg_mobbile = /^[1][3|4|5|7][0-9]{9}$/; //手机号码验证
var Reg_phoneWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;//是否是带区号的电话
var Reg_phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;//是否是不带区号的电话
var Reg_money = /^[0-9]+[\.][0-9]{0,2}$/;//是否是金额，两位小数
var Reg_letter_digital_zh = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;  //是否是由字符数字和中文组成
var Reg_chinese = /^[u4E00-u9FA5]+$/; //是否是中文
var Reg_contaisChinese = /.*[\u4e00-\u9fa5]+.*$/ //是否包含中文
var Reg_chinese_speicalchar = /[^\x00-\xff]/ig  //是否是中文和全角字符
///////////////////////////////////////////////////////////////////////////////////
// IE Check
///////////////////////////////////////////////////////////////////////////////////
var isIE = (document.all) ? true : false;

///////////////////////////////////////////////////////////////////////////////////
// Image Helper
///////////////////////////////////////////////////////////////////////////////////
var imageObject = null;
var currentObject = null;

function ResizeImage(I, W, H) {
    if (I.length > 0 && imageObject != null && currentObject != I) {
        setTimeout("ResizeImage('" + I + "'," + W + "," + H + ")", 100);
        return;
    }

    var F = null;
    if (I.length > 0) {
        F = document.getElementById(I);
    }

    if (F != null) {
        imageObject = F;
        currentObject = I;
    }

    if (isIE) {
        if (imageObject.readyState != "complete") {
            setTimeout("ResizeImage(''," + W + "," + H + ")", 50);
            return;
        }
    }
    else if (!imageObject.complete) {
        setTimeout("ResizeImage(''," + W + "," + H + ")", 50);
        return;
    }

    var B = new Image();
    B.src = imageObject.src;
    var A = B.width;
    var C = B.height;
    if (A > W || C > H) {
        var a = A / W;
        var b = C / H;
        if (b > a) {
            a = b;
        }
        A = A / a;
        C = C / a;
    }
    if (A > 0 && C > 0) {
        imageObject.style.width = A + "px";
        imageObject.style.height = C + "px";
    }

    imageObject.style.display = '';
    imageObject = null;
    currentObject = null;
}

///////////////////////////////////////////////////////////////////////////////////
// String Helper
///////////////////////////////////////////////////////////////////////////////////
String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

///////////////////////////////////////////////////////////////////////////////////
// URL Helper
///////////////////////////////////////////////////////////////////////////////////
function GetQueryString(key) {
    var url = location.href;
    if (url.indexOf("?") <= 0) {
        return "";
    }

    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};

    for (i1 = 0; j = paraString[i1]; i1++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }

    var returnValue = paraObj[key.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function GetQueryStringKeys() {
    var keys = {};
    var url = location.href;

    if (url.indexOf("?") <= 0) {
        return keys;
    }

    keys = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (i2 = 0; i2 < keys.length; i2++) {
        if (keys[i2].indexOf("=") >= 0) {
            keys[i2] = keys[i2].substring(0, keys[i2].indexOf("="));
        }
    }

    return keys;
}

function GetCurrentUrl() {
    var url = location.href;

    if (url.indexOf("?") >= 0) {
        return url.substring(0, url.indexOf("?"));
    }

    return url;
}

function AppendParameter(key, pvalue) {
    var reg = /^[0-9]*[1-9][0-9]*$/;
    var url = GetCurrentUrl() + "?";
    var keys = GetQueryStringKeys();

    if (keys.length > 0) {
        for (i3 = 0; i3 < keys.length; i3++) {
            if (keys[i3] != key) {
                url += keys[i3] + "=" + GetQueryString(keys[i3]) + "&";
            }
        }
    }

    if (!reg.test(pvalue)) {
        alert_h("只能输入正整数");
        return url.substring(0, url.length - 1);
    }

    url += key + "=" + pvalue;
    return url;
}


///////////////////////////////////////////////////////////////////////////////////
// DataList Select Helper
///////////////////////////////////////////////////////////////////////////////////
function SelectAll() {

    var checkbox = document.getElementsByName("CheckBoxGroup");

    if (checkbox == null) {
        return false;
    }
    if (typeof checkbox.length != 'undefined') {
        if (checkbox.length > 0) {
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true;
            }

        }
    }

    else {
        checkbox.checked = true;
    }


    return false;
}

function ReverseSelect() {

    var checkbox = document.getElementsByName("CheckBoxGroup");

    if (checkbox == null) {
        return false;
    }
    if (typeof checkbox.length != 'undefined') {
        if (checkbox.length > 0) {
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = !checkbox[i].checked;
            }

        }
    }

    else {
        checkbox.checked = !checkbox.checked;
    }
    return false;

}


//计算坐标方法,得到某obj的x,y坐标,兼容浏览器
function getWinElementPos(obj) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
    var el = obj;
    if (el.parentNode === null || el.style.display == 'none') {
        return false;
    }
    var parent = null;
    var pos = [];
    var box;
    if (el.getBoundingClientRect) //IE
    {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return { x: box.left + scrollLeft, y: box.top + scrollTop };
    }
    else if (document.getBoxObjectFor) {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
    }
    else // safari & opera
    {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1
         || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
            pos[0] -= document.body.offsetLeft;
            pos[1] -= document.body.offsetTop;
        }
    }
    if (el.parentNode) { parent = el.parentNode; }
    else { parent = null; }
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;

        if (parent.parentNode) { parent = parent.parentNode; }
        else { parent = null; }
    }
    return { x: pos[0], y: pos[1] };
}


function getElementsByClassName(className, root, tagName) {    //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
    if (root) {
        root = typeof root == "string" ? document.getElementById(root) : root;
    } else {
        root = document.body;
    }
    tagName = tagName || "*";
    if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
        return root.getElementsByClassName(className);
    } else {
        var tag = root.getElementsByTagName(tagName);    //获取指定元素
        var tagAll = [];                                    //用于存储符合条件的元素
        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
            for (var j = 0, n = tag[i].className.split(' ') ; j < n.length; j++) {    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
                if (n[j] == className) {
                    tagAll.push(tag[i]);
                    break;
                }
            }
        }
        return tagAll;
    }
}

function getParam(paramName) {
    paramValue = "";
    isFound = false;
    paramName = paramName.toLowerCase();
    var arrSource = this.location.search.substring(1, this.location.search.length).split("&");
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        if (paramName == "returnurl") {
            var retIndex = this.location.search.toLowerCase().indexOf('returnurl=');
            if (retIndex > -1) {
                var returnUrl = unescape(this.location.search.substring(retIndex + 10, this.location.search.length));
                if ((returnUrl.indexOf("http") != 0) && returnUrl != "" && returnUrl.indexOf(location.host.toLowerCase()) == 0) returnUrl = "http://" + returnUrl;
                return returnUrl;
            }
        }
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].toLowerCase().split(paramName + "=")[1];
                    paramValue = arrSource[i].substr(paramName.length + 1, paramValue.length);
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
//window.onerror=function(){return true;}

///获取指定重复次数的字符串
String.prototype.RepLetter = function (repTimes) {
    if (repTimes == undefined) {
        repTimes = 1;
    }
    var repStr = this;
    for (var i = 1; i <= repTimes; i++) {
        repStr += repStr;
    }
    return repStr;
}
///截取小数指定位数的小数位数
Number.prototype.SubDecimalDigits = function (digits) {
    if (digits == undefined) {
        digits = 2;
    }

    var numberStr = this.toString();//小数部分
    var intStr = "";//整数部分
    dotIndex = numberStr.lastIndexOf(".");
    //获取整数部分
    if (dotIndex > -1) {
        intStr = numberStr.substr(0, dotIndex);
    }
    else {
        intStr = numberStr;
    }
    //如果 位数 等于0则返回整数部分
    if (digits <= 0) {
        if (dotIndex > -1 && dotIndex > 0) {
            return parseFloat(numberStr.substring(dotIndex - 1));
        }
        else if (dotIndex == 0) {
            return 0;
        }
        else {
            return this;
        }
    }
    var decimalStr = "";
    //获取小数部分
    if (dotIndex > -1) {
        decimalStr = numberStr.substring(dotIndex + 1)
        if (decimalStr.length < digits) {
            decimalStr += "0".RepLetter(digits - decimalStr.length);
        }
        else {
            decimalStr = decimalStr.substr(0, digits);
        }
    }
    else {
        if (digits > 0) {
            decimalStr += "0".RepLetter(digits);
        }
    }
    return parseFloat(intStr + "." + decimalStr);
}