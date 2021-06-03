import { Component, h, Host, Prop } from '@stencil/core';
import { IItem } from '../../types/item.interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() item: IItem;
  @Prop() showLinks: boolean = false;

  render() {
    return <Host>
      <div>
        <slot name={this.item.id}></slot>
      </div>

      {this.item.children.map((item) => 
        <div>
          {this.showLinks &&
            <my-component-link item={item}>
              <div class="link-slot" slot={item.id}>
                {`----> ${item.id}`}
              </div>
            </my-component-link>
          }

          <my-component item={item}>
            <div class="nested-child-slot" slot={item.id}>
              <slot name={item.id}></slot>
            </div>

            {item.children?.map(
              (child) =>
                <div class="child-slot" slot={child.id}>
                  <slot name={child.id}></slot>
                </div>
            )}
          </my-component>
        </div>
      )}
    </Host>;
  }
}
