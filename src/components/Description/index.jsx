import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function index() {

    const phrase = "Engineering intelligent systems at the intersection of AI, security, and software architecture — where robust design meets applied machine learning.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} id='description' className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                    Systems Engineering student at Universidad ICESI. Focused on AI-driven engineering, secure system design, and building software that scales — from LLM integrations to distributed backends.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <a href="/CV_Luis_Felipe_Cadena_Cortes_ES.pdf" target="_blank" rel="noopener noreferrer" className='link' download>
                            <p>Download <br />Resume CV</p>
                        </a>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}
