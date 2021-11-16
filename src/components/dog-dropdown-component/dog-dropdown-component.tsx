//Dropdown component modified from https://github.com/bmedy/dropdown
import { h, Component, Prop, State, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dog-dropdown',
  styleUrl: 'dog-dropdown-component.scss'
})
export class Dropdown {
  @Element() el: HTMLElement;
  @Event() enter: EventEmitter;
  @Event() exit: EventEmitter;
  @Prop() alignemnent: string = 'bottom';
  @Prop() dogList: Array<any>;
  @State() opened: boolean = false;

  @Method() async open(){
    this.opened = true;
  }

  @Method() async close(){
    this.opened = false;
  }

  // toggle dropdown menu open or close and emit event
  _toggle() {
    if(this.opened){
      this.close();
      this.enter.emit();
    } else {
      this.open();
      this.exit.emit();
    }
  }

  render() {
    return [
        <div aria-haspopup="true" aria-expanded="false" onClick={() => this._toggle()}>
          <slot name="trigger"></slot>
        </div>,
        <div class={`${this.opened? 'show': ''} dropdown-content`}>
          <slot></slot>
        </div>
     ];
  }
}
