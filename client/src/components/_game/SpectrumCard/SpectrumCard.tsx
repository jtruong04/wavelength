import { useEffect } from 'react';
import { SpectrumCardAtom } from 'atoms/game';
import { useRecoilValue } from 'recoil';
import color from 'color';
import styled, { css } from 'styled-components';
import Typography from 'components/_common/Typography';
const CardContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

interface CardHalfProps {
    half: string;
    color: string;
}

const CardHalf = styled.div`
    position: relative;
    width: 50%;
    height:100%;
    ${(props: CardHalfProps) =>
        props.half === 'left' &&
        css`
            border-top-left-radius: 20px 20px;
            border-bottom-left-radius: 20px 20px;
        `}
    ${(props: CardHalfProps) =>
        props.half === 'right' &&
        css`
            border-top-right-radius: 20px 20px;
            border-bottom-right-radius: 20px 20px;
        `}
    background-color: ${(props: CardHalfProps) => props.color};
`;

const Arrow = styled(Typography)`
    font-size: xx-large;
`;

const TextContainer = styled.div`
    font-size: large;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export interface SpectrumCardProps {
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

export const SpectrumCard: React.FC<SpectrumCardProps> = ({
    leftText,
    rightText,
    leftColor = '#F6F1D6',
    rightColor = '#79BEB9',
}) => {
    return (
        <CardContainer>
            <CardHalf half='left' color={leftColor}>
                <TextContainer>
                    <Arrow
                        color={color(leftColor).isDark() ? 'white' : 'black'}
                    >
                        {'\u27F5'}
                    </Arrow>
                    <Typography
                        color={color(leftColor).isDark() ? 'white' : 'black'}
                    >
                        {leftText}
                    </Typography>
                </TextContainer>
            </CardHalf>
            <CardHalf half='right' color={rightColor}>
                <TextContainer>
                    <Arrow
                        color={color(rightColor).isDark() ? 'white' : 'black'}
                    >
                        {'\u27F6'}
                    </Arrow>
                    <Typography
                        color={color(rightColor).isDark() ? 'white' : 'black'}
                    >
                        {rightText}
                    </Typography>
                </TextContainer>
            </CardHalf>
        </CardContainer>
    );
};

export const SpectrumCardContainer = () => {
    const card = useRecoilValue(SpectrumCardAtom);

    return (
        <SpectrumCard
            leftText={card.text[0]}
            rightText={card.text[1]}
            leftColor={card.color[0]}
            rightColor={card.color[1]}
        />
    );
};

export default SpectrumCardContainer;
