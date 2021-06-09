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

  // define the items and the relationships between them
  private child111 = { id: '1.1.1', title: 'section 1.1.1', children: [], ancestor: '1' };
  private child112 = { id: '1.1.2', title: 'section 1.1.2', children: [], ancestor: '1' };
  private child11 = { id: '1.1', title: 'section 1.1', children: [this.child111, this.child112], ancestor: '1' };
  private child12 = { id: '1.2', title: 'section 1.2', children: [], ancestor: '1' };
  private item1 = { id: '1', title: 'Title 1', children: [this.child11, this.child12] };

  private child211 = { id: '2.1.1', title: 'section 2.1.1', children: [], ancestor: '2' };
  private child21 = { id: '2.1', title: 'section 2.1', children: [this.child211], ancestor: '2' };
  private item2 = { id: '2', title: 'Title 2', children: [this.child21] };

  connectedCallback() {
    if (!this.items?.length) {
      this.items = [
        // first hierarchy
        this.item1,
        this.child11,
        this.child111,
        this.child112,
        this.child12,
        // second hierarchy
        this.item2,
        this.child21,
        this.child211
      ];
    }
  }

  getDeepChildren = (parent: IItem) => {
    return this.items.filter((item) => item.ancestor === parent.id);
  };

  render() {
    return [this.item1, this.item2].map((item) => {
      const deepChildren = this.getDeepChildren(item);

      return <my-component item={{...item}} level={this.level+1}>
        <div class="parent-slot" slot={item.id}>
          <slot name={item.id}></slot>
        </div>

        {deepChildren?.map((child) =>
          <div class="child-slot" slot={child.id} style={{ 'margin-left': `${this.level*1}rem` }}>
            <slot name={child.id}></slot>
          </div>
        )}
      </my-component>
    });
  }
}
