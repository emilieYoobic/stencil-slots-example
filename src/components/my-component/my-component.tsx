import { Component, h, Host, Prop } from '@stencil/core';
import { IItem } from '../../types/item.interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() item: IItem;
  // @Prop() showLinks: boolean = false;
  @Prop() level: number = 0;

  render() {
    return <Host>
      <div>
        <slot name={this.item.id}></slot>
      </div>

      {this.item.children?.map((item) => 
        <my-component level={this.level+1} item={{...item}}>
          <div class="nested-child-slot" slot={item.id}>
            <slot name={item.id}></slot>
          </div>

          {item.children?.map(
            (child) =>
              <div class="child-slot" slot={child.id} style={{ 'margin-left': `${this.level*1}rem` }}>
                <slot name={child.id}></slot>
              </div>
          )}
        </my-component>
      )}
    </Host>;
  }
}
