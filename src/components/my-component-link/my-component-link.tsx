import { Component, h, Prop } from '@stencil/core';
import { IItem } from '../../types/item.interface';

@Component({
  tag: 'my-component-link',
  styleUrl: 'my-component-link.css',
  shadow: true,
})
export class MyComponentLink {

  @Prop() item: IItem;

  render() {
    return <div>
      <slot name={this.item.id}></slot>
    </div>;
  }
}
