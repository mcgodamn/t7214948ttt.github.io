import {
    DATA_TYPE as DataType,
    AREA_TYPE as AreaType,
    LOG_TYPE as LogType,
    ASSET_TYPE as AssetType,
    WARNING_TYPE as WarningType,
    INFO_SHOW_NAME as InfoShowName,
    LOGIN_ERROR as LoginError,
} from './data.js'

Vue.prototype.$DataType = DataType;
Vue.prototype.$AreaType = AreaType;
Vue.prototype.$LogType = LogType;

// var debug = true
var debug = false

var vm = new Vue({
    el: '#app',
    data: {
        // string
        input: "輸入",
        password: "密碼",
        title: "甜點王子2",
        phone_placeholder: "請輸入手機",
        account_placeholder: "請輸入帳號",
        email_placeholder: "請輸入信箱",
        password_placeholder: "請輸入密碼",
        info_hearder: "帳號資料",
        asset_hearder: "帳號資產",
        input_warning: "",
        password_warning: "",
        login_error:"",

        // variable
        logState: LogType.NOT_LOGIN,
        nowSelectInput: {
            _type: DataType.ACCOUNT,
            get type(){
                return this._type
            },
            set type(value){
                vm.clearWarning()
                this._type = value
            }
        },
        // nowSelectInput: DataType.ACCOUNT,
        nowSelectArea: AreaType.TW,
        login: {
            _isLoading: false,
            get isLoading() {
                return this._isLoading
            },
            set isLoading(loading) {
                if (loading) {
                    vm.logState = LogType.LOGGING
                }
                else {
                    vm.logState = LogType.NOT_LOGIN
                }
                this._isLoading = loading
            }
        },

        php_result :{
            info:{},
            asset:{},
        },
    },
    methods: {
        clearWarning() {
            this.input_warning = ""
            this.password_warning = ""
            this.login_error = ""
        },
        commitInfo() {
            if (this.login.isLoading) return
            
            vm.clearWarning()

            if (this.logState == LogType.NOT_LOGIN) {
                var requestTable = getRequestTable()
                if (!debug && (requestTable == null || this.login.isLoading)) return
                this.login.isLoading = true

                this.$http.post('./Scripts/PHP/main.php',
                    requestTable,
                    { emulateJSON: true }).then(function (res) {
                        onLoginned(res.body)
                    }, function (res) {
                        this.login.isLoading = false
                        console.log(res.status)
                    })
            }
            else if (this.logState == LogType.LOGINNED) {
                $('input').val('');
                this.logState = LogType.NOT_LOGIN
            }
        },
        DataClickDropDown(_select) {
            this.nowSelectInput.type = _select
        },
        AreaClickDropDown(_select) {
            this.nowSelectArea = _select
        },
        getName(key) {
            return InfoShowName[key]
        },
        getAssetHtml(key, value) {
            if (key == null
                || value == null
                || AssetType[key] == null)
                {
                    return ""
                }

            var type = AssetType[key].text
            var image = AssetType[key].image_url

            return `
                <div class="col-6 text-center">
                    <img src="${image}" style="border-radius: 50%; width: 30px; height: 30px;">
                    <label class="text-center">${type}</label>
                </div>
                <label class="col-6 text-center text-md-left">
                    ${value}
                </label>
            `
        }
    },
});


function getAccount() {
    //check and alert here
    var account = $('#account').val()

    if (account == "") {
        vm.input_warning = vm.nowSelectInput.type.text + WarningType.INPUT_EMPTY.text
        return null
    }
    else if (isNaN(account) || account.length != 8) {
        vm.input_warning = WarningType.ACCOUNT_NEED_8_DIGIT.text
        return null
    }
    else return account
}
function getEmail() {
    //check and alert here
    var email = $('#email').val()

    if (email == "") {
        vm.input_warning = vm.nowSelectInput.type.text + WarningType.INPUT_EMPTY.text
        return null
    }
    else return email
}
function getPhone() {
    //check and alert here

    var phone = $('#phone').val()

    if (phone == "") {
        vm.input_warning = vm.nowSelectInput.type.text + WarningType.INPUT_EMPTY.text
        return null
    }
    else return {
        country: vm.nowSelectArea.code,
        mobile: phone
    }
}
function getPassword() {
    //check and alert here
    var pwd = $('#pwd').val()

    if (pwd == "") {
        vm.password_warning = vm.password + WarningType.INPUT_EMPTY.text
        return null
    }
    else return pwd
}

function getRequestTable() {
    if (debug) {
        return {
            email: 'ttt@gmail.com',
            password: "123123123",
        }
    }

    try {
        var returnTable = {}
        switch (vm.nowSelectInput.type) {
            case DataType.ACCOUNT:
                returnTable['uid'] = getAccount().toString()
                break;
            case DataType.EMAIL:
                returnTable['email'] = getEmail().toString()
                break;
            case DataType.PHONE:
                var phone = getPhone()
                returnTable['country'] = phone['country'].toString()
                returnTable['mobile'] = phone['mobile'].toString()
                break;
        }
        returnTable['password'] = getPassword().toString()
        return returnTable
    }
    catch (e) {
        // console.log(e)
        return null
    }
}

function onLoginned(_res) {
    console.log(_res)
    function onLoginSuccess() {
        var undefine = "未綁定"

        var info = {
            'uid': (typeof _res['uid'] == 'undefined' || _res['uid'] == "")
                ? undefine : _res['uid'],
            'country': (typeof _res['country'] == 'undefined' || _res['country'] == "")
                ? undefine : _res['country'],
            'mobile': (typeof _res['mobile'] == 'undefined' || _res['mobile'] == "")
                ? undefine : _res['mobile'],
            'email': (typeof _res['email'] == 'undefined' || _res['email'] == "")
                ? undefine : _res['email'],
            'playername': (typeof _res['playername'] == 'undefined' || _res['playername'] == "")
                ? undefine : _res['playername'],
        }
        var asset = {
            'GemPay': (typeof _res['GemPay'] == 'undefined') ? undefine : _res['GemPay'],
        }
        // for (var key in _res) {
        //     switch (key) {
        //         case 'uid':
        //         case 'nickname':
        //         case 'email':
        //         case 'mobile':
        //         case 'country':
        //             info[key] = _res[key]
        //             break
        //         case 'GemPay':
        //             asset[key] = _res[key]
        //             break;
        //         default:
        //             break
        //     }
        // }
        
        vm.php_result = {
            info:info,
            asset:asset,
        }
        vm.logState = LogType.LOGINNED
    }
    vm.login.isLoading = false

    var hint_html = `<label>
            如果登入過程有任何問題，請前往<a href="https://www.facebook.com/EnjoyPlay.Digital/" target="_blank">facebook粉絲團《甜點王子研發團隊》</a>，私訊小編協助。
        </label>`
    switch (_res.code)
    {
        case 1:
            onLoginSuccess()
            break
        default:
            if (LoginError[_res.code] != null)
            {
                vm.login_error = `<label style="color: red;">${LoginError[_res.code]}</label>` + hint_html
            }
            break
    }
}