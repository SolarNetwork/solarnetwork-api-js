'use strict';

import test from 'ava';

import Pagination from 'pagination';

test('query:pagination:create', t => {
    const p = new Pagination();
    t.is(p.max, 0);
    t.is(p.offset, 0);
});

test('query:pagination:create:max', t => {
    const p = new Pagination(1);
    t.is(p.max, 1);
    t.is(p.offset, 0);
});

test('query:pagination:create:maxAndOffset', t => {
    const p = new Pagination(1, 2);
    t.is(p.max, 1);
    t.is(p.offset, 2);
});

test('query:pagination:copy', t => {
    const p = new Pagination(50);
    const p2 = p.withOffset(100);
    t.is(p2.max, 50);
    t.is(p2.offset, 100);
});
