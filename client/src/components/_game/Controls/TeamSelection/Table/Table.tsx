import Color from 'color';
import React from 'react';
import '../TeamSelection.css';
export interface TableProps {
    leftColor?: string;
    leftLabel?: string;
    rightColor?: string;
    rightLabel?: string;
    middleColor?: string;
    middleLabel?: string;
}

const Table: React.FC<TableProps> = ({
    leftColor = '#ED623B',
    leftLabel = '',
    rightColor = '#E9A802',
    rightLabel = '',
    middleColor = '#808080',
    middleLabel = '',
    children,
}) => {
    return (
        <div id='team-selection-panel'>
            <div
                className='selection selection-team'
                style={{
                    backgroundColor: leftColor,
                    color: Color(leftColor).isDark() ? 'white' : 'black',
                }}
            >
                {leftLabel}
            </div>
            <div
                className='selection selection-no-team'
                style={{
                    backgroundColor: middleColor,
                    color: Color(middleColor).isDark() ? 'white' : 'black',
                }}
            >
                {middleLabel}
            </div>{' '}
            <div
                className='selection selection-team'
                style={{
                    backgroundColor: rightColor,
                    color: Color(rightColor).isDark() ? 'white' : 'black',
                }}
            >
                {rightLabel}
            </div>
            {children}
        </div>
    );
};

export default Table;
