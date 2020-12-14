import { useEffect } from 'react';
import { PromptsState } from 'atoms/ui';
import { useRecoilValue } from 'recoil';
import color from 'color';
import './Card.css';

export interface CardProps {
    /**
     * Text to show on the left half
     */
    leftText: string;
    /**
     * Text to show on the right half
     */
    rightText: string;
    /**
     * Background color of the left half
     */
    leftColor?: string;
    /**
     * Background color of the right half
     */
    rightColor?: string;
}

export const Card: React.FC<CardProps> = ({
    leftText,
    rightText,
    leftColor = '#F6F1D6',
    rightColor = '#79BEB9',
}) => {
    return (
        <div className='card'>
            <div
                className='card-half card-half-left'
                style={{
                    backgroundColor: leftColor,
                    color: color(leftColor).isDark() ? 'white' : 'black',
                }}
            >
                <div className='card-text'>
                    <p className='card-arrow'>{'\u27F5'}</p>
                    <p className='card-name'>{leftText}</p>
                </div>
            </div>
            <div
                className='card-half card-half-right'
                style={{
                    backgroundColor: rightColor,
                    color: color(rightColor).isDark() ? 'white' : 'black',
                }}
            >
                <div className='card-text'>
                    <p className='card-arrow'>{'\u27F6'}</p>
                    <p className='card-name'>{rightText}</p>
                </div>
            </div>
        </div>
    );
};

export const CardContainer = () => {
    const card = useRecoilValue(PromptsState);
    useEffect(() => {
        console.log(card);
    }, [card]);
    return (
        <Card
            leftText={card.text[0]}
            rightText={card.text[1]}
            leftColor={card.color[0]}
            rightColor={card.color[1]}
        />
    );
};

export default CardContainer;
