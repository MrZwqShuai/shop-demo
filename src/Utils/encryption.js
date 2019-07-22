import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
const encryptor = new JSEncrypt();

// 后端的公钥
export const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4oXHIMT3GrW7dZzW3GX+JjzcnaQg6eb5wsu9meRQ39eEhswY9ADjoM8DchSJNnfdoryl4FlWDfMocEU8LHOBUiVreZtKStadTOCduhR2f+38Ez4xBtIsOcNlj3zL6VEufU2wy9jLALWXMl0FDducledUcozk8pHr4gH/FXUkgIwIDAQAB";

export function createAesKey() {
  const expect = 16;
  let aesKey = Math.random()
    .toString(36)
    .substr(2);
  while (aesKey.length < expect) {
    aesKey += Math.random.toString(36).substr(2);
  }
  aesKey = aesKey.substr(0, 16);
  return aesKey;
}

const aesKey = createAesKey();
/**
 *
 * @param {*} word 待加密字段
 * @param {string} keyStr 加密key
 * @returns {string} 加密字段
 */
// export function aesEncrypt(word, keyStr) {
//   keyStr = keyStr || createAesKey();
//   word = word || publicKey;
//   console.log(keyStr, "00000", word, "---");
//   const key = CryptoJS.enc.Utf8.parse(keyStr);
//   let srcs = "";
//   switch (typeof word) {
//     case "string":
//       srcs = CryptoJS.enc.Utf8.parse(word);
//       break;
//     case "object":
//       srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word));
//       break;
//     default:
//       srcs = CryptoJS.enc.Utf8.parse(word.toString());
//   }
//   const encrypted = CryptoJS.AES.encrypt(srcs, key, {
//     iv: key,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString();
// }
export function aesEncrypt(word, keyStr) {
  keyStr = keyStr || aesKey;
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let srcs = "";
  switch (typeof word) {
    case "string":
      srcs = CryptoJS.enc.Utf8.parse(word);
      break;
    case "object":
      srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word));
      break;
    default:
      srcs = CryptoJS.enc.Utf8.parse(word.toString());
  }
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 *
 * @param {*} word 待解密数据
 * @param {string} keyStr 解密 key
 * @returns {string} 返回解密字符串
 */
export function aesDecrypt(word, keyStr) {
  console.log(222, word, keyStr);
  keyStr = keyStr || aesKey;
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 *
 * @param {string} key 公钥
 */
export function setPublicKey(key) {
  key = key || publicKey;
  encryptor.setPublicKey(key);
}

/**
 *
 * @param {string} key 公钥
 */
export function setPrivateKey(key) {
  key = key || publicKey;
  encryptor.setPrivateKey(key);
}

/**
 *
 * @param {*} data 待解密数据
 * @returns {PromiseLike<ArrayBuffet>} 返回加密字符串
 */

export function rsaDecrypt(data) {
  return encryptor.decrypt(data);
}

/**
 *
 * @param {*} data 待加密数据
 * @returns {PromiseLike<ArrayBuffet>} 返回加密字符串
 */

export function rsaEncrypt(data) {
  setPublicKey();
  data = data || aesKey;
  console.log(aesKey, "222");
  return encryptor.encrypt(data);
}

/**
 * 加密表单数据
 * @param {object} formdata 待加密的表单数据
 * @param {Array} toBeVerified 待加密的字段
 */

const toBeVerifiedArray = [
  "applicantName",
  "applicantIdno",
  "applyReasons",
  "serviceAddress",
  "rentalName",
  "rentalIdno",
  "rentalAddress",
  "rentalTelphone",
  "houseOwnership",
  "companyName",
  "address",
  "useWay",
  "gasNumber",
];
export function encryptFormdata(formdata, toBeVerified = toBeVerifiedArray) {
  Array.isArray(toBeVerified) &&
    toBeVerified.forEach(field => {
      if (formdata[field]) {
        formdata[field] = aesEncrypt(formdata[field]);
      }
    });
}
