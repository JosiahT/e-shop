import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [key: string]: any }) {
        for(let productId in itemsMap) 
            if (itemsMap[productId].quantity > 0)
                this.items.push(new ShoppingCartItem(
                    { key: productId, data: itemsMap[productId].product }, 
                    itemsMap[productId].quantity) );
    }

    get totalQuantity() {
        let count = 0;
        for (const productId in this.items) count += this.items[productId].quantity;
        return count;
    }

    get totalPrice() {
        let price = 0;
        for (const productId in this.items) price += this.items[productId].totalPrice;
        return price;
    }
}
