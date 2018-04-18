export default class storage {
  constructor() {
    this.StorageKeys = {};
    this.regStorageKey = /^localstorage\_\_\_(.*)+\_\_\_\d*$/;
    this.prefixText = "localstorage";
    this.space = "___";
    this.initCheck();
  }
  getRealKey(key) {
    let tempArr = key.split(this.space);
    let realKey = {};
    realKey['realkey'] = tempArr[1];
    realKey['expires'] = tempArr[2] || "";
    return realKey;
  }

  isExpires(key, expires) {
    var now = +new Date();
    if (!expires) {
      return false;
    }
    if (now > parseInt(expires, 10)) {
      return true;
    }
    return false;
  }

  clear() {
    for (var key in window.localStorage) {
      if (this.regStorageKey.test(key)) {
        window.localStorage.removeItem(key);
      }
    }
    return this;
  }

  removeItem(key) {
    var item = this.StorageKeys[key];
    if (item) {
      window.localStorage.removeItem(item['key']);
    }
    return this;
  }
  getItem(key) {
    var item = this.StorageKeys[key];
    if (item) {
      // 如果过期了，那么就返回空字符串
      if (this.isExpires(key, item['expires'])) {
        return "";
      }
      return window.localStorage[item['key']];
    }
    return "";
  }

  setItem(key, value, expires) {
    if (!key) {
      return this;
    }
    expires = expires || 0;
    this._key = key;
    let  now = (+ new Date());
    let localKey = this.prefixText + this.space + key + this.space + (expires? expires * 1000 + now: "");
    window.localStorage.setItem(localKey, value);
    this.StorageKeys[key] = {
      "key": localKey,
      "expires": expires
        ? expires * 1000 + now
        : ""
    };
    return this;
  }

  expires(seconds) {
    if (!seconds) {
      return this;
    }
    let key = this._key;
    let item = this.StorageKeys[key] || {};
    let value = window.localStorage[item['key']];
    let now = (+ new Date());
    if (!key) {
      return this;
    }
    this.removeItem(key);
    this.setItem(key, value, seconds);
    return this;
  }

  initCheck() {
    let realKey;
    for (var key in window.localStorage) {
      if (this.regStorageKey.test(key)) {
        realKey = this.getRealKey(key);
        // 如果已经过期的local data，则删掉
        if (this.isExpires(realKey['realkey'], realKey['expires'])) {
          window.localStorage.removeItem(key);
          continue;
        }
        this.StorageKeys[realKey['realkey']] = {
          "key": key,
          "expires": realKey['expires']
        };
      }
    }
  }

}
