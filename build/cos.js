const COS = require('cos-nodejs-sdk-v5');
const path = require('path');
const fs = require('fs');
const cosConfig = require('../app.config.js').cos;
// 使用永久密钥创建实例

const {SecretId, SecretKey, Bucket, Region, Key} = cosConfig


const cos = new COS({
    SecretId: SecretId,
    SecretKey: SecretKey
});



const doUpload = (key, file) => {

    return new Promise((resolve, reject) => {
        // 分片上传
        cos.sliceUploadFile({
            Bucket: Bucket,
            Region: Region,
            Key: key,
            FilePath: file
        }, function (err, data) {
            if (err) {
                reject(err);
                return;
            };
            if (data.statusCode === 200) {
                resolve(data);
            } else {
                reject(data);
            };
        });
    });
};

const publicPath = path.join(__dirname, '../public');
const uploadAll = (dir, prefix) => {
    const files = fs.readdirSync(dir);
    console.log(files);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const key = prefix ? `${prefix}/${file}`: file;
        if (fs.lstatSync(filePath).isDirectory()) {
            return uploadAll(filePath, key);
        };
        doUpload(key, filePath).then(resp => {
            console.log(`${resp.Key} ===== > ${resp.statusCode}`);
        }).catch(err => {
            console.error(err);
        });
    })
};


uploadAll(publicPath);
