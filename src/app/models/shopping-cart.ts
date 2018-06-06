import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [key: string]: any }) {
        this.itemsMap = itemsMap || {};

        for (const productId in itemsMap) this.items.push(new ShoppingCartItem({ key: productId, ...itemsMap[productId] }) );
    }

    getQuantity(product: Product) {
        const cartItem = this.itemsMap[product.key];
        if (!cartItem) return 0;
        return cartItem.quantity;
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
