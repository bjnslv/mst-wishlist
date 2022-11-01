import { reaction } from 'mobx';
import { getSnapshot, onPatch, onSnapshot } from 'mobx-state-tree';
import { WishListItem, WishList } from './WishList';

it('can create an instance of a model', () => {
    const item = WishListItem.create({
        name: 'test name',
        price: 42.42,
        image: 'test image',
    });
    expect(item.price).toBe(42.42);
    item.changeName('new name');
    expect(item.name).toBe('new name');
    item.changePrice(69.69);
    expect(item.price).toBe(69.69);
});

it('can create items array', () => {
    const list = WishList.create({
        items: [
            {
                name: 'test name',
                price: 42.42,
                image: 'test image',
            },
        ],
    });
    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(42.42);
});

it('can add new items - 2', () => {
    const list = WishList.create();
    const patches = [];
    onPatch(list, (patch) => {
        patches.push(patch);
    });

    list.add({
        name: 'super test name',
        price: 14.88,
        image: 'super test image',
    });

    list.items[0].changeName('another test name');

    expect(patches).toMatchSnapshot();
});

it('can calculate the total price of a wishlist', () => {
    const list = WishList.create({
        items: [
            {
                name: 'test name',
                price: 42.42,
                image: 'test image',
            },
            {
                name: 'test name2',
                price: 69.69,
                image: 'test image2',
            },
        ],
    });
    expect(list.totalPrice).toBe(112.11);

    let changed = 0;
    reaction(
        () => list.totalPrice,
        () => changed++
    );

    expect(changed).toBe(0);
    console.log('changed>>>', changed);
    list.items[0].changeName(' super test name');
    expect(changed).toBe(0);
    console.log('changed>>>', changed);
    list.items[0].changePrice(43.43);
    console.log('changed>>>', changed);
    expect(changed).toBe(1);
});
