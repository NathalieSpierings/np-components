import { FC, useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';

import Button from '../../UI/Button/Button';
import React from 'react';
import Icon from '../../UI/Icons/Icon/Icon';

export interface SessionIdleTimerProps {
    title?: string;
    buttonLabel?: string;
    color?: ColorDefinitions;
    timeout?: number;
    promptBeforeIdle?: number;
    logout: () => void;
}

const SessionIdleTimer: FC<SessionIdleTimerProps> = ({
    title = 'Uw sessie verloopt binnenkort!',
    buttonLabel = 'Sessie verlengen',
    color = ColorDefinitions.Primary,
    timeout = 10800000,
    promptBeforeIdle = 25000,
    logout,
}) => {
    const [remaining, setRemaining] = useState(timeout);
    const [open, setOpen] = useState(false);

    const seconds = remaining > 1 ? 'seconden' : 'seconde';

    const onIdle = () => {
        setOpen(false);
        logout();
    };

    const onActive = () => {
        setOpen(false);
    };

    const onPrompt = () => {
        setOpen(true);
    };

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    });

    const handleStillHere = () => {
        activate();
    };

    return (
        <div className={`modal__backdrop ${open ? 'shown' : ''}`}>
            <div className={`modal", ${color ? "modal-" + color : ''}`}>
                <div className="modal__header">
                    <Icon icon={IconDefinitions.warning} duotone={true} size={SizeDefinitions.ExtraLarge} />
                    <div className="modal__title">{title}</div>
                </div>
                <div className="modal__content">
                    U wordt automatisch uitgelogd over {remaining} {seconds}.
                </div>
                <div className="modal__footer">
                    <Button rounded={true} color={color} ripple={true} onClick={handleStillHere}>
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SessionIdleTimer;
