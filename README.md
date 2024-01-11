# 运行项目
安装依赖
```
npm i
```
package.json

--host的地址改为本机ip，例如192.168.0.103
```json
{
"scripts": {
  "start": "ionic serve --host=192.168.0.103 --port=8300",
  }
}
```
启动项目
```
npm start
```
浏览器输入项目地址，例如192.168.0.103:8300（不能用localhost）
# 打包
更新版本号

config.xml，修改version字段
```xml
<widget
  android-packageName="com.bnp.yuansong"
  build="10"
  id="com.bnp.yuansong"
  ios-CFBundleIdentifier="VTVX3T7R4F"
  ios-CFBundleVersion="2"
  version="1.82"
  xmlns="http://www.w3.org/ns/widgets"
  xmlns:cdv="http://cordova.apache.org/ns/1.0">
</widget>
```
执行打包命令，在项目根目录下打开控制台，执行build_android.bat
```
.\build_android.bat
```
apk签名

打包完成的apk默认没有签名，无法安装到手机。将未签名的apk（app-release-unsigned.apk）复制到项目根目录，执行以下命令。密钥库密码短语: mlh1421
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore app-release-unsigned.apk android.keystore
```
签名完毕后，将app-release-unsigned.apk重命名，例如城旅控股v1.0.0.apk
# 环境变量
生产环境：src/environments/environment.prod

开发环境：src/environments/environment

host字段为接口请求地址
```js
export const environment = {
  production: false,
  host: 'http://xz.jwcljt.com:10081'
};
```
