import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
	private url = 'input socket url ';
	public socket;

	//이후 다른 것들도 이곳에서 chattab을 관리한다.
	//chatTabs : 하단 채팅 탭과 관련한 모든 소켓

	sockConnection:any = {publicChat:[]}

	constructor() {//public navCtrl: NavController,
		this.socket = io(this.url);
	}

	/**
	* 모든 emit은 이곳에서 처리한다.
	*/
	Emit(key, obj){
		this.socket.emit(key, obj);
	}

	removeAllListener(eventName, callback) {
		this.socket.removeAllListeners(eventName, function() {
			var args = arguments;
		});
	}

	//subscribe를 삭제한다.
	removeListener(connection, callback?){
		let sConn;
		eval('sConn = this.sockConnection.'+connection) ;
		if(typeof sConn == 'undefined')
			return;
		if(typeof sConn.length != 'undefined' && sConn.length > 0){
			for(var i=0; i < sConn.length; i++){
				sConn[i].unsubscribe();
			}
			eval('this.sockConnection.'+connection+'=[]') ;
		}
		if(typeof callback == 'function')
			callback();
	}

	On(key) {//하나의 인자값을 받는다.
		let observable = new Observable(observer => {
			this.socket.on(key, (data) => {
				observer.next(data);
			});
			return () => {//disconnect 가 존재하면 unsubscribe시  socket 자체가 disconnect 된다.
			//	this.socket.disconnect();
			};
		})
		return observable;
	}

	On2(key) {//두개의 인자값을 받아서 하나의 object로 결합하워 callback
		let observable = new Observable(observer => {
			this.socket.on(key, (arg1, arg2) => {
				observer.next({arg1:arg1, arg2:arg2});
			});
			return () => {
			//	this.socket.disconnect();
			};
		})
		return observable;
	}
}
