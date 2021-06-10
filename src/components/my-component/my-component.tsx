import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { IItem } from '../../types/item.interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() item: IItem;
  @Prop() level: number = 0;

  @Event() addClicked: EventEmitter<{ parentId: string, id: string, title: string, children: Array<IItem>, ancestor: string }>;

  addChild(ev) {
    ev.stopPropagation();

    const id = this.item.id + `.${this.item.children.length + 1}`;
    const title = this.item.title.replace(this.item.id, '') + id;

    this.addClicked.emit({ parentId: this.item.id, id, title, children: [], ancestor: this.item.ancestor });
  }

  render() {
    return <Host>
      <div class="content">
        <slot name={this.item.id}></slot>
        {!!this.level && <button onClick={(ev) => this.addChild(ev)}>+</button>}
      </div>

      {this.item.children?.map((item) => 
        <my-component item={{...item}} level={this.level+1}>
          <div class="nested-child-slot" slot={item.id}>
            <slot name={item.id}></slot>
          </div>

          {item.children?.map(
            (child) =>
              <div class="child-slot" slot={child.id} style={{ 'margin-left': `${this.level+1}rem` }}>
                <slot name={child.id}></slot>
              </div>
          )}
        </my-component>
      )}
    </Host>;
  }
}
