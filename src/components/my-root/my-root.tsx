import { Component, h, Prop } from '@stencil/core';
import { IItem } from '../../types/item.interface';

@Component({
  tag: 'my-root',
  styleUrl: 'my-root.css',
  shadow: true,
})
export class MyRoot {

  @Prop({ mutable: true }) items: Array<IItem> = [];
  @Prop() level: number = 0;

  get parents(): Array<IItem> {
    return this.items.filter((item) => !item.ancestor);
  }

  getAllChildren = (parent: IItem) => {
    return this.items.filter((item) => item.ancestor === parent.id);
  };

  render() {
    return this.parents.map((item) => {
      const children = this.getAllChildren(item);

      return <my-component item={{...item}} level={this.level+1}>
        <div class="parent-slot" slot={item.id}>
          <slot name={item.id}></slot>
        </div>

        {children?.map((child) =>
          <div class="child-slot" slot={child.id}>
            <slot name={child.id}></slot>
          </div>
        )}
      </my-component>
    });
  }
}
