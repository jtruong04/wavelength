import React from 'react';
import { RecoilRoot } from 'recoil';
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
};
export const decorators = [
    (Story) => (
        <div style={{ margin: '1em', backgroundColor: '#F0F0F0' }}>
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        </div>
    ),
];
