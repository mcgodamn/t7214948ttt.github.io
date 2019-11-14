export const DATA_TYPE = {
    ACCOUNT: { text: "帳號" },
    EMAIL: { text: "信箱" },
    PHONE: { text: "手機" },
}

export const AREA_TYPE = {
    TW: { text: "台灣", code: "886" },
    HK: { text: "香港", code: "852"},
    MO: { text: "澳門", code: "853" },
}

export const LOG_TYPE = {
    NOT_LOGIN: { text: "登入" },
    LOGGING: { text: "登入中" },
    LOGINNED: { text: "登出" },
}

export const ASSET_TYPE = {
    GemFree: {
        text: "免費寶石",
        image_url: "./Image/Icon_Gem.png"
    },
    GemPay: {
        text: "付費寶石",
        image_url: "./Image/Icon_Gem.png"
    }
}

export const WARNING_TYPE = {
    ACCOUNT_NEED_8_DIGIT: {text: "帳號為8碼數字"},
    INPUT_EMPTY: { text: "不可為空" },
    CONTAIN_SYMBOL: { text: "不可包含特殊字元" },
}

export const INFO_SHOW_NAME = {
    uid: "遊戲帳號",
    country: "國際區號",
    mobile: "手機",
    playername: "店長名稱",
    email: "電子信箱",
}

export const LOGIN_ERROR = {
    "1013": "填寫資訊錯誤，請重新輸入！",
    "-1102": "填寫資訊錯誤，請重新輸入！",
    "-2005": "此為凍結帳號！",
}