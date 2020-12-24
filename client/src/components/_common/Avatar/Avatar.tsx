// Libraries
import React from 'react';
// Material
import MuiAvatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Assets
import avatars from 'assets/avatars';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: 'black',
        },
        root: {
            border: '1px solid #00000030',
            transition: 'background-color 0.2s linear',
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
    avatarid?: number;
    /**
     * Increase size
     */
    large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    name,
    avatarid,
    color = '#808080',
    large = false,
}) => {
    const classes = useStyles();
    return (
        <MuiAvatar
            className={large ? classes.large : classes.small}
            alt={name}
            src={avatars[avatarid!]}
            style={{
                backgroundColor: color,
            }}
        >
            <PersonIcon className={classes.icon} />
        </MuiAvatar>
    );
};

export default Avatar;
