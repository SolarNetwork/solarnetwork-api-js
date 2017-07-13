import test from 'ava';

import ComparableEnum from 'comparableEnum';

test('core:comparableEnum:create', t => {
	const obj = new ComparableEnum('foo', 1);
    t.truthy(obj);
    t.is(obj.name, 'foo');
    t.is(obj.value, 1);
});

test('core:comparableEnum:frozen', t => {
    const obj = new ComparableEnum('foo', 1);
    t.throws(() => {
        obj.foo = 'bar';
    }, TypeError, 'object is frozen');
});

test('core:comparableEnum:compare:lt', t => {
	const left = new ComparableEnum('foo', 1);
	const right = new ComparableEnum('bar', 2);
    t.is(left.compareTo(right), -1);
});

test('core:comparableEnum:compare:lt', t => {
	const left = new ComparableEnum('foo', 2);
	const right = new ComparableEnum('bar', 1);
    t.is(left.compareTo(right), 1);
});

test('core:comparableEnum:compare:eq', t => {
	const left = new ComparableEnum('foo', 1);
	const right = new ComparableEnum('bar', 1);
    t.is(left.compareTo(right), 0);
});
