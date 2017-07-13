import { test, todo } from 'ava';

import SecurityPolicy from 'securityPolicy';

test('core:securityPolicy:create', t => {
    const p = new SecurityPolicy();
    t.truthy(p);
});

todo('SecurityPolicyTests');
