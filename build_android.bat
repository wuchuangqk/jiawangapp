@REM rmdir /s/q www 
@REM md platforms\android
@REM copy release-signing.properties platforms\android
@REM copy android.keystore platforms\android
@REM ionic cordova build android --release --prod --aot

rmdir /s/q www
ionic cordova build android --release --prod --aot --keystore=android.keystore --alias=android.keystore --password=mlh1421
