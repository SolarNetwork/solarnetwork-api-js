import test from 'ava';

import SortDescriptor from 'sortDescriptor';

test('query:sortDescriptor:create', t => {
    const s = new SortDescriptor('foo');
    t.truthy(s);
    t.is(s.key, 'foo');
    t.false(s.descending);
});

test('query:sortDescriptor:create:descending', t => {
    const s = new SortDescriptor('foo', true);
    t.is(s.key, 'foo');
    t.true(s.descending);
});

test('query:sortDescriptor:create:ascending', t => {
    const s = new SortDescriptor('foo', false);
    t.is(s.key, 'foo');
    t.false(s.descending);
});
