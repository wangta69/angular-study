import { NgModule, Component, OnDestroy } from '@angular/core'
import { CommonModule }		from "@angular/common";
import {MessageService} from './message.service'
import {Subscription} from 'rxjs/Subscription'

@Component({
  selector: 'receiver',
  template: `
	<h3>Receiver
		<button (click)="toggleSubscribed()">
			{{unsubscribed && 'Subscribe' || 'Unsubscribe'}}
		</button>
	</h3>
	<h4 *ngIf="messages.length">
		Incoming Messages
		<button (click)="clear()">x</button>
	</h4>
	<ul>
		<li *ngFor="let message of messages">
			{{message.text}}
			<button (click)="send(message)">Respond</button>
		</li>
	</ul>
  `,
  styles: [`
	button {
	  outline: none;
	}
	h3 button {
	  background-color: inherit;
	  border: none;
	  text-decoration: underline;
	}
	h3 button:active {
	  text-decoration: none;
	}
	ul {
	  list-style: none;
	  padding-left: 8px;
	}
  `]
})
export class ReceiverComponent implements OnDestroy {
	private subscription: Subscription;
	private messages = [];

  constructor(private messageService: MessageService) {
	this.subscribe();
  }

  get unsubscribed() {
	return this.subscription && this.subscription.closed;
  }

  send(message: {text: string, respondEvent: string}) {
	this.messageService.broadcast(message.respondEvent, message.text);
  }

  clear() {
	this.messages = [];
  }

	subscribe() {
		this.subscription = this.messageService.subscribe('receiver', (payload) => {
			this.messages.push(payload);
		});
	}

  unsubscribe() {
	this.subscription.unsubscribe();
  }

  toggleSubscribed() {
	if (this.unsubscribed) {
	  this.subscribe();
	} else {
	  this.unsubscribe();
	}
  }

  ngOnDestroy() {
	this.unsubscribe();
  }
}



@NgModule({
	declarations: [ ReceiverComponent ],
	imports:[ CommonModule ],
	exports:[ ReceiverComponent ]
})
export class ReceiverModule {}
