// Libraries
import React from 'react';
// Material
import MuiAvatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Assets
import avatars from 'assets/avatars';
import { Point } from 'types';
import useDrag from 'hooks/useDrag';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: 'black',
        },
        root: {
            border: '1px solid #00000030',
            transition: 'background-color 0.2s linear',
        },
        tooltipPlacementBottom: {
            marginTop: '4px',
        },
        small: {
            border: '1px solid #00000030',
            transition: 'background-color 0.2s linear',
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        large: {
            border: '1px solid #00000030',
            transition: 'background-color 0.2s linear',
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    })
);

export interface AvatarProps {
    /**
     * Name of user
     */
    name: string;
    /**
     * Background color
     */
    color?: string;
    /**
     * Index of avatar icons
     */
    avatar?: number;
    /**
     * Show tooltip with user's name on hover
     */
    tooltip?: boolean;
    /**
     * Increase size
     */
    large?: boolean;
    /**
     * Object contain all the stuff needed to make it draggable
     */
    position?: Point;
    draggable?: {
        setPosition: (newState: Point) => void;
        onDragRelease?: (releasePoint: Point, initialPoint: Point) => any;
    };
}

const Avatar: React.FC<AvatarProps> = ({
    name,
    avatar,
    color = '#808080',
    tooltip = false,
    large = false,
    position = {
        x: 0,
        y: 0,
    },
    draggable,
}) => {
    const classes = useStyles();
    const handleDrag = useDrag(
        draggable?.setPosition || ((_newState) => {}),
        draggable?.onDragRelease
    );
    return (
        <div
            onMouseDown={draggable ? handleDrag : undefined}
            style={
                draggable || position
                    ? {
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          position: 'absolute',
                          transform: 'translate(-50%,-50%)',
                          touchAction: 'none',
                      }
                    : {
                          //   left: `${position.x}%`,
                          //   top: `${position.y}%`,
                          //   position: 'absolute',
                          //   transform: 'translate(-50%,-50%)',
                      }
            }
        >
            <Tooltip
                classes={{
                    tooltipPlacementBottom: classes.tooltipPlacementBottom,
                }}
                title={name || ' '}
                disableFocusListener={!tooltip}
                disableHoverListener={!tooltip}
                disableTouchListener={!tooltip}
                arrow
            >
                <MuiAvatar
                    className={large ? classes.large : classes.small}
                    alt={name}
                    src={avatars[avatar!]}
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <PersonIcon className={classes.icon} />
                </MuiAvatar>
            </Tooltip>
        </div>
    );
};

export default Avatar;
