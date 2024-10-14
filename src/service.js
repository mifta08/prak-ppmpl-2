import Repository from './repository.js'; // Gunakan import untuk ES Modules

class Service {
    constructor() {
        this.repository = new Repository();
    }

    getAllItems() {
        return this.repository.getAllItems();
    }

    getItemById(id) {
        const item = this.repository.getItemById(id);
        if (!item) {
            throw new Error('Item not Found');
        }
        return item;
    }

    addItem(name) {
        const newItem = { id: this.repository.data.length + 1, name };
        return this.repository.addItem(newItem);
    }
}

export default Service;
