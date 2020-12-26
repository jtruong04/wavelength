import {
    ActivePlayer,
    ActiveTeam,
    SpectrumCardAtom,
    UserRoleSelector,
} from 'atoms/game';
import { OptionsAtom } from 'atoms/options';
import Avatar from 'components/_common/Avatar';
import Typography from 'components/_common/Typography';
import { SpectrumCard } from 'components/_game/SpectrumCard/SpectrumCard';
import { Role } from 'enums';
import useStateMachine, { useForkHandler } from 'hooks/useStateMachine';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ICard } from 'types';
import { drawMultipleCards } from 'utils/game';

const Fork = () => {
    const [onForkEnter, onForkExit] = useForkHandler();
    const goToNextState = useStateMachine();
    const userRole = useRecoilValue(UserRoleSelector);
    const options = useRecoilValue(OptionsAtom);
    const activeTeam = useRecoilValue(ActiveTeam);
    const activePlayer = useRecoilValue(ActivePlayer);
    const [cards] = useState<ICard[]>(
        drawMultipleCards(options.numCards, {
            level: options.cardType,
        })
    );
    const setSelectedCard = useSetRecoilState(SpectrumCardAtom);
    useEffect(() => {
        onForkEnter();
        return () => {
            onForkExit();
        };
    }, [onForkEnter, onForkExit]);

    const handleClick = (index: number) => {
        setSelectedCard(cards[index]);
        goToNextState();
    };

    const renderCards = () =>
        cards.map((card, index) => (
            <div
                key={index}
                onClick={() => {
                    handleClick(index);
                }}
                style={{
                    marginBottom: '20px',
                    width: '100%',
                }}
            >
                <SpectrumCard
                    leftText={card.text[0]}
                    rightText={card.text[1]}
                    leftColor={card.color[0]}
                    rightColor={card.color[1]}
                />
            </div>
        ));

    if (userRole === Role.CLUE_GIVER) {
        return (
            <>
                <Typography size='x-large'> Please select a card. </Typography>
                {renderCards()}
            </>
        );
        // return <Button onClick={handleClick}>Ready</Button>;
    }
    return (
        <>
            <Typography size='large'>Current turn</Typography>
            <Avatar {...activePlayer} color={activeTeam.color} large />
            <Typography size='xx-large'>{activePlayer.name}</Typography>
        </>
    );
};

export default Fork;
