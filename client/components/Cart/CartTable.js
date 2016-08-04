import React, { Component } from 'react'
import CartStore from '../../stores/CartStore.js'
import CartActions from '../../actions/CartActions'
import toastr from 'toastr'
const uuid = require('uuid');

export default class CartTable extends Component {

  constructor(props) {
    super(props);

    this.generateItems = this.generateItems.bind(this);
    this.subTotal = this.subTotal.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
  }

  decreaseQty(item) {
    CartActions.removeLSCartItem(item);
  }

  increaseQty(item) {
    CartActions.addLSCartItem(item);
  }

  generateItems() {
    if (!this.props.items) return (<tr className="lead">Your Cart is Empty</tr>);
    const items = this.props.items.map((stateItem, i) => {
      console.log('stateItem: ', stateItem);
      const item = stateItem;
      return (
        <tr key={i}>
          <td className="text-center"><div id="cart-index">{i + 1}</div></td>
          <td className="text-center">
            <div id="cart-product" className="row">
              <img id="cart-product-img" className="thumbnail col-xs-4" src={item.images[0]} />
              <span id="cart-product-desc" className="col-xs-8">{item.title} {item.model}</span>
            </div>
          </td>
          <td className="text-center">
            <div id="quantity">
              <span id="cart-quantity">{this.props.items.length}</span>
              <div className="btn-group">
                <button onClick={this.decreaseQty.bind(null, item)} href="" className="btn btn-info">-</button>

                <button onClick={this.increaseQty.bind(null, item)} href="" className="btn btn-info">+</button>
              </div>
            </div>
          </td>
          <td className="text-center">
            <div id="cart-price">{`\u00a5 ${item.newPrice}`}</div>
          </td>
          <td className="text-center">
            <div id="cart-subtotal">{this.subTotal(item.quantity, item.newPrice)}</div>
          </td>
        </tr>
      )
    })
    console.log('items: ', items);
    return items;
  }

  subTotal(qty, price) {
    console.log('qty: ', qty, '\nprice: ', price);
    if (!qty || !price) return ('Quantity or Price is Empty.');
    return `\u00a5 ${qty * price}`;
  }

  render() {
    let { items } = this.props;
    let itemCards = this.generateItems();
    console.log(items, itemCards);
    return (
      <table className="table table-hover ">
        <thead>
          <tr>
            <th className="text-center text-success">#</th>
            <th className="text-center text-success">Product</th>
            <th className="text-center text-success">Quantity</th>
            <th className="text-center text-success">Price</th>
            <th className="text-center text-success">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {itemCards}
        </tbody>
      </table>
    )
  }
}
