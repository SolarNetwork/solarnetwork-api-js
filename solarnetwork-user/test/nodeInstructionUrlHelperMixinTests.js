'use strict';

import test from 'ava';

import { NodeInstructionUrlHelper, InstructionState } from 'nodeInstructionUrlHelperMixin'

test('user:nodeInstructionUrlHelperMixin:create', t => {
	const helper = new NodeInstructionUrlHelper();
	t.truthy(helper);
});

test('user:nodeInstructionUrlHelperMixin:viewInstructionUrl', t => {
	const helper = new NodeInstructionUrlHelper();
	t.is(helper.viewInstructionUrl(123),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/view?id=123');
});

test('user:nodeInstructionUrlHelperMixin:updateInstructionStateUrl', t => {
	const helper = new NodeInstructionUrlHelper();
	t.is(helper.updateInstructionStateUrl(123, InstructionState.QUEUED),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/updateState?id=123&state=Queued');
});

test('user:nodeInstructionUrlHelperMixin:viewActiveInstructionsUrl', t => {
	const helper = new NodeInstructionUrlHelper();
	helper.nodeId = 123;
	t.is(helper.viewActiveInstructionsUrl(),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/viewActive?nodeId=123');
	t.is(helper.viewActiveInstructionsUrl(234),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/viewActive?nodeId=234');
});

test('user:nodeInstructionUrlHelperMixin:viewPendingInstructionsUrl', t => {
	const helper = new NodeInstructionUrlHelper();
	helper.nodeId = 123;
	t.is(helper.viewPendingInstructionsUrl(),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/viewPending?nodeId=123');
	t.is(helper.viewPendingInstructionsUrl(234),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/viewPending?nodeId=234');
});

test('user:nodeInstructionUrlHelperMixin:queueInstructionUrl', t => {
	const helper = new NodeInstructionUrlHelper();
	helper.nodeId = 123;
	t.is(helper.queueInstructionUrl('foo'),
		'https://data.solarnetwork.net/solaruser/api/v1/sec/instr/add?nodeId=123&topic=foo');
});

test.todo('queueInstructionUrl with parameters');
test.todo('queueInstructionUrl with nodeId argument');
