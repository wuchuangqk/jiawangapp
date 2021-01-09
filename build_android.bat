rmdir /s/q www 
md platforms\android
copy release-signing.properties platforms\android
copy android.keystore platforms\android
ionic cordova build android --release --prod --aot
