import React from 'react';
import classes from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <div className={classes.footer}>
            <span>React</span>
            <div className={classes.links}>
                <span>&copy;Sionic</span>
                <span>Правовая информация</span>
                <span>Политика конфиденциальности</span>
            </div>
        </div>
    );
};

export default Footer;
