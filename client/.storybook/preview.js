import React from 'react';
import { RecoilRoot } from 'recoil';
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
};
export const decorators = [
    (Story) => (
        <div
            style={{
                margin: '3em',
                backgroundColor: '#F0F0F0',
                height: '600px',
                width: '600px',
                position: 'relative',
            }}
        >
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        </div>
    ),
];
