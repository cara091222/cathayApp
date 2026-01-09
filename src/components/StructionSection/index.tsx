import styles from './index.module.scss';
import INSTRUCTIONS from './INSTRUCTIONS';
import DEFAULT_STEP_IMAGE from '../../assets/instructions/default-step.webp';
import { useState } from 'react';
import { ArrowButton, DetailArrow } from './Icons';

function StructionSection() {
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [currentStepDetailIndex, setCurrentStepDetailIndex] = useState<number | null>(null);
    
    const handleBackToStepList = () => {
        setCurrentStep(null);
        setCurrentStepDetailIndex(null);
    }

    return (
        <div className={styles.instructionSection} id="instructions">
            <h2>操作流程說明</h2>
            <div className={styles.stepContainer}>
                {currentStep === null ? (
                    <div className={styles.stepList}>
                        <div className={styles.steps}>
                            {INSTRUCTIONS.map((step, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.stepItemContent}
                                        onClick={() => setCurrentStep(index)}
                                    >
                                        <h3>
                                            {step.title}
                                            <button>
                                                <ArrowButton />
                                            </button>
                                        </h3>
                                        <p>{step.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className={styles.stepDetail}>
                        <div className={styles.stepDetailHeader}>
                            <h3>{INSTRUCTIONS[currentStep].title}</h3>
                            <p>{INSTRUCTIONS[currentStep].text}</p>
                        </div>
                        <div className={styles.stepDetailList}>
                            {INSTRUCTIONS[currentStep].details.map(
                                (detail, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                styles.stepDetailListItem +
                                                (currentStepDetailIndex ===
                                                index
                                                    ? ` ${styles.activeDetailListItem}`
                                                    : "")
                                            }
                                            onClick={() =>
                                                setCurrentStepDetailIndex(index)
                                            }
                                        >
                                            {detail.title}
                                            <DetailArrow />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <button
                            onClick={handleBackToStepList}
                            className={styles.backToStepListButton}
                        >
                            <ArrowButton />
                            <span>返回</span>
                        </button>
                    </div>
                )}
                <div className={styles.stepDetailImages}>
                    {typeof currentStep === "number" &&
                    typeof currentStepDetailIndex === "number" ? (
                        <>
                            {INSTRUCTIONS[currentStep].details[
                                currentStepDetailIndex
                            ].images.map((image, index) => {
                                return (
                                    <img
                                        key={`${currentStep}-${currentStepDetailIndex}-${index}`}
                                        src={image}
                                        alt={`Step ${currentStep + 1} - ${
                                            index + 1
                                        }`}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <img
                            src={DEFAULT_STEP_IMAGE}
                            alt="Default Step Image"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default StructionSection;