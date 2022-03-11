import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <hr />
            <div>
                Copyright <span>&copy;</span> 2022 MentorMate, Inc. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;