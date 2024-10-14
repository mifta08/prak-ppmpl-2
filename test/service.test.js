import sinon from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js';
import Repository from '../src/repository.js';

describe('Service Integration Tests', () => {
    let service;
    let repositoryStub;

    before(() => {
        repositoryStub = sinon.createStubInstance(Repository);
        service = new Service();
        service.repository = repositoryStub;
    });

    it('should return all items!', () => {
        const items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ];
        repositoryStub.getAllItems.returns(items);

        const result = service.getAllItems();

        expect(result).to.equal(items);
        expect(repositoryStub.getAllItems.calledOnce).to.be.true;
    });

    it('should return an item by id', () => {
        const item = { id: 1, name: 'Item 1' };

        repositoryStub.getItemById.withArgs(1).returns(item);
        const result = service.getItemById(1);

        expect(result).to.equal(item);
        expect(repositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    });

    it('should throw an error when item is not found', () => {
        repositoryStub.getItemById.withArgs(3).returns(null); // Pastikan stub mengembalikan null untuk ID 3

        expect(() => service.getItemById(3)).to.throw('Item not Found'); // Periksa pesan error
        expect(repositoryStub.getItemById.calledOnceWith(3)).to.be.true; // Pastikan stub dipanggil dengan ID 3
    });

    it('should add a new item', () => {
        repositoryStub.data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
        const newItem = { id: 3, name: 'Item 3' };

        repositoryStub.addItem.returns(newItem);

        const result = service.addItem('Item 3');

        expect(result).to.equal(newItem);
        expect(repositoryStub.addItem.calledOnceWith(newItem)).to.be.true;
    });
});
