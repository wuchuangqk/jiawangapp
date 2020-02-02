import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  constructor() {
  }
  protected opendb(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('network', 1.0);
      request.onsuccess =  (event) => {
        const db = request.result;
        console.log('数据库打开成功');
        resolve(db);
      };
    });
  }
  public init(): Promise<any> {
      return new Promise(((resolve, reject) => {
        const request = window.indexedDB.open('network', 1.0);
        request.onupgradeneeded = (event: any) => {
          const db = event.target.result;
          let objectStore;
          if (!db.objectStoreNames.contains('ips')) {
            objectStore = db.createObjectStore('ips', { keyPath: 'id' , autoIncrement: true});
            resolve(db);
          } else {
            resolve(db);
          }
        };
      }));
  }
    public add(obj) {
    return new Promise((resolve, reject) => {
      this.opendb().then((db) => {
        const request = db.transaction(['ips'], 'readwrite')
            .objectStore('ips')
            .add(obj);

        request.onsuccess = (event) => {
          console.log('数据写入成功');
          resolve(true);
        };

        request.onerror = (event) => {
          console.log('数据写入失败');
          reject();
        };
      });
    });
  }
  read(id) {
    return new Promise((resolve, reject) => {
      this.opendb().then((db) => {
        const transaction = db.transaction(['ips']);
        const objectStore = transaction.objectStore('ips');
        console.log(objectStore);
        const request = objectStore.get(id);

        request.onerror = (event) => {
          console.log('事务失败');
        };

        request.onsuccess = ( event) => {
          if (request.result) {
            // console.log('Name: ' + request.result.name);
              resolve(request.result);
          } else {
            // console.log('未获得数据记录');
              reject();
          }
        };
      });
    });
  }
  public readAll(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.opendb().then((db) => {
        const objectStore = db.transaction('ips').objectStore('ips');
        const list = [];
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            list.push(cursor.value);
            cursor.continue();
          } else {
            resolve(list);
          }
        };
      });
    });
  }
  remove(id) {
        return new Promise((resolve, reject) => {
      this.opendb().then((db) => {
        const request = db.transaction('ips', 'readwrite').objectStore('ips').delete(id);
        request.onsuccess = function(event) {
          resolve();
        };
      });
    });
  }
  update(item) {
    return new Promise((resolve, reject) => {
      this.opendb().then((db) => {
        const request = db.transaction('ips', 'readwrite').objectStore('ips')
            .put(item);
        request.onsuccess = (event) => {
          resolve();
        };
        request.onerror = () => {
          reject();
        };
      });
    });
  }
}
