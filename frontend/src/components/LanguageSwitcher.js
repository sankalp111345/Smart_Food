import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="language-switcher">
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('hi')}>हिंदी</button>
        </div>
    );
};

export default LanguageSwitcher;
