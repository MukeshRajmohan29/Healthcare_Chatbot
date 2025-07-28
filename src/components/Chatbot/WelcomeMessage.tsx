import React from 'react';

const WelcomeMessage: React.FC = () => {
    return (
        <div>
            <p>
                Welcome to our healthcare chatbot. Your privacy is protected under HIPAA regulations.<br/>
                What brings you here today? Are you looking for information, booking an appointment, or have a health-related question?
            </p>
        </div>
    );
};

export default WelcomeMessage;