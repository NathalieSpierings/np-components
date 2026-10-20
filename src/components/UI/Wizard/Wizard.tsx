import { FC, ReactNode, useState } from 'react';
import { ColorDefinitions, IconDefinitions } from '../../../lib/utils/definitions';
import { DropdownMenuItem } from '../../Forms/Dropdown/DropdownMenu';
import Button from '../Button/Button';
import Icon from '../Icons/Icon/Icon';
import WizardProgressbar from '../WizardProgressbar/WizardProgressbar';
import Dropdown from '../../Forms/Dropdown/Dropdown';

export type WizardDataChangeHandler<TData> = (data: TData) => void;

export type WizardStep = {
    title: string;
    content: ReactNode;
    isValid?: () => boolean;
};

export interface WizardProps {
    steps: WizardStep[];
    onCompleteLabel: string;
    onComplete: () => void;
    enabled?: boolean;
}

const Wizard: FC<WizardProps> = ({ steps, onCompleteLabel, onComplete, enabled }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const currentWizardStep = steps[currentStep];

    const nextStep = () => {
        const stepValid = currentWizardStep.isValid?.() ?? false;
        if (stepValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const finishWizard = () => {
        onComplete();
    };

    const items: DropdownMenuItem[] = steps.map((step, index) => ({
        id: index,
        label: step.title,
        selected: index == currentStep,
        onClick: () => {
            // Only allow jumping to completed steps or the current one
            if (index <= currentStep) {
                setCurrentStep(index);
            }
        },
    }));

    return (
        <div className="wizard">
            <div className="wizard__nav">
                <div className="wizard__nav__container">
                    <div key={currentStep} className="wizard__nav__item">
                        <div className="wizard__nav__item__title">
                            <p> Stap {currentStep + 1} : </p>
                            <h4>{currentWizardStep.title}</h4>
                        </div>
                        <Dropdown
                            dropdownToggle={{
                                prefix: <Icon icon={IconDefinitions.angle_down} />,
                            }}
                            menuItems={items}
                        />
                    </div>
                </div>
                <WizardProgressbar currentStep={currentStep} totalSteps={steps.length - 1} />
            </div>

            <div className="wizard__content">{steps[currentStep].content}</div>

            <div className="wizard__footer">
                <Button onClick={prevStep} disabled={currentStep === 0 || !enabled}>
                    Vorige
                </Button>
                {currentStep === steps.length - 1 ? (
                    <Button onClick={finishWizard} color={ColorDefinitions.Primary} shadow={true}>
                        {onCompleteLabel}
                    </Button>
                ) : (
                    <Button
                        onClick={nextStep}
                        disabled={currentStep >= steps.length || currentWizardStep.isValid?.() === false || !enabled}
                        color={ColorDefinitions.Primary}
                        shadow={true}
                    >
                        Volgende
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Wizard;
