import React from 'react';
import { RecoilRoot } from 'recoil';
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};
export const decorators = [
    (Story) => (
        <div style={{ margin: '1em' }}>
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        </div>
    ),
];
