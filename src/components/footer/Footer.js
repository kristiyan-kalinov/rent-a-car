import { findByLabelText } from "@testing-library/react";
import { flushSync } from "react-dom";

const styles = {
    backgroundColor: 'red',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    display: 'inline-block',
    textAlign: 'center'
};

export function Footer() {
    return (
        <div className="footer" style={styles}>
            <span>Contact Us at rentacar@test123.com or +3598888888888</span>
        </div>
    )
}