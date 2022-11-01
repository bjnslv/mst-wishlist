import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';

import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component {
    constructor() {
        super();
        this.state = { isEditing: false };
    }
    render() {
        const { item, readonly } = this.props;
        return this.state.isEditing ? (
            this.renderEditable()
        ) : (
            <li className="item">
                <img src={item.image} />
                <h3>{item.name}</h3>
                <span>{item.price} €</span>
                {!readonly && (
                    <span>
                        <button onClick={this.onToggleEdit}>✏</button>
                        <button onClick={item.remove}>❎</button>
                    </span>
                )}
            </li>
        );
    }

    renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveEdit}>🖫</button>
                <button onClick={this.onCancelEdit}>🗙</button>
            </li>
        );
    }

    onSaveEdit = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone));
        this.setState({
            isEditing: false,
            clone: null,
        });
    };
    onCancelEdit = () => {
        this.setState({ isEditing: false });
    };
    onToggleEdit = () => {
        this.setState({
            isEditing: true,
            clone: clone(this.props.item),
        });
    };
}

export default observer(WishListItemView);
