import { useState, useRef } from 'react';
import Slider from 'react-slick';
import styles from './index.module.scss';
import EVENTS, { type Event } from './EVENTS';
import CommaMark from '../../assets/events/comma-mark.svg';

function EventSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        variableWidth: true,
        arrows: false,
        beforeChange: (_current: number, next: number) => {
            setCurrentSlide(next);
        },
    };

    const handleSlideChange = (index: number) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    return (
        <div className={styles.eventSection} id="events">
            {/* <img src={DecoSpot} className={styles.decoSpot} /> */}
            <h2>活動專區</h2>
            <Slider
                ref={sliderRef}
                {...settings}
                className={styles.eventSlider}
            >
                {EVENTS.map((event: Event, index: number) => (
                    <div key={index} className={styles.eventSlideItem}>
                        <a href={event.link} className={styles.eventLink} target="_blank">
                            <div className={styles.eventImageWrapper}>
                                <div className={styles.eventImage}>
                                    <img src={event.image} alt={event.title} />
                                </div>
                            </div>
                            <div className={styles.eventContentWrapper}>
                                <img
                                    src={CommaMark}
                                    alt="Comma Mark"
                                    className={styles.commaMark}
                                />
                                <div className={styles.eventContent}>
                                    <h3>{event.title}</h3>
                                    {event.infoItems?.length > 0 ? (
                                        <div className={styles.infoItems}>
                                            {event.infoItems?.map(
                                                (
                                                    item: Event["infoItems"][number],
                                                    index: number
                                                ) => (
                                                    <div key={index}>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                        <span> {item.value}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                    {event.details?.length > 0 ? (
                                        <div className={styles.detailBlocks}>
                                            {event.details?.map(
                                                (
                                                    detail: Event["details"][number],
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.detailBlock
                                                        }
                                                    >
                                                        <h4>{detail.title}</h4>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: detail.content,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </a>    
                    </div>
                ))}
            </Slider>
            <div className={styles.eventPagination}>
                {EVENTS.map((_, index) => {
                    const isActive = currentSlide === index;

                    return (
                        <button
                            key={index}
                            className={`${styles.controlButton} ${
                                isActive ? styles.active : ""
                            }`}
                            onClick={() => handleSlideChange(index)}
                            aria-label={`切換到第 ${index + 1} 頁`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="6.5"
                                    className="dot"
                                />
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="19"
                                    stroke="#29A86F"
                                    className="ring"
                                />
                            </svg>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default EventSection;