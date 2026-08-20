import React from 'react';
import { FC } from 'react';

export interface WizardProgressbarProps {
    currentStep: number;
    totalSteps: number;
}

const WizardProgressbar: FC<WizardProgressbarProps> = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;

    return (
        <div className="wizard__progress">
            <div className="progress">
                <div className="progress-bar" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
};

export default WizardProgressbar;
