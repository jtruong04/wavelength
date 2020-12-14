// Libraries
import React from 'react';
// Material
import { Popover, MenuItem, Avatar } from '@material-ui/core';
// Assets
import avatars from 'assets/avatars';
// Styling
import './Menus.css';

export interface AvatarMenuProps {
    anchorEl: null | HTMLElement;
    handleClose(iconClicked: number): void;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ anchorEl, handleClose }) => {
    const renderIcons = () =>
        avatars.map((img, idx) => (
            <MenuItem
                key={idx}
                onClick={() => handleClose(idx)}
                style={{
                    padding: 0,
                    margin: 0,
                    borderRadius: '50%',
                }}
            >
                <Avatar src={img} />
            </MenuItem>
        ));

    return (
        <Popover
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
        >
            <div className='avatar-container'>{renderIcons()}</div>
        </Popover>
    );
};

export default AvatarMenu;
