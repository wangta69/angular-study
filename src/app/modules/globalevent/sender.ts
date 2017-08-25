import { NgModule, Component, OnDestroy } from '@angular/core'
import { CommonModule }		from "@angular/common";
import { MessageService } from './message.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'sender',
  template: `
    <h3>Sender
      <button (click)="toggleSubscribed()">
        {{unsubscribed && 'Subscribe' || 'Unsubscribe'}}
      </button>
    </h3>
    <button (click)="send()">Send Message</button>
    <h4 *ngIf="messages.length">
      Incoming Messages
      <button (click)="clear()">x</button>
    </h4>
    <ul>
      <li *ngFor="let message of messages">Response: {{message}}</li>
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
      cursor: pointer;
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
export class SenderComponent implements OnDestroy {
  private subscription: Subscription;
  private messages = [];
  private messageNum = 0;
  private name = 'sender'

  constructor(private messageService: MessageService) {
    this.subscribe();
  }

  get unsubscribed() {
    return this.subscription && this.subscription.closed;
  }

  send() {
    let payload = {
      text: `Message ${++this.messageNum}`,
      respondEvent: this.name
    }
    this.messageService.broadcast('receiver', payload);
  }

  clear() {
    this.messages = [];
  }

  subscribe() {
    this.subscription = this.messageService.subscribe('sender', (payload) => {
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
	declarations: [ SenderComponent ],
	imports:[ CommonModule ],
	exports:[ SenderComponent ]
})
export class  SenderModule {}
