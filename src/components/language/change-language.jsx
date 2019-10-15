import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import 'antd/dist/antd.css';

function SelectLangeage() {
    if (localStorage.getItem('i18nextLng') === null) {
        localStorage.setItem('i18nextLng', 'rus');
    }

    const { Option } = Select;
    const { i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <Select defaultValue="rus" onChange={changeLanguage} style={{ width: 120 }}>
            <Option value="rus">Рус</Option>
            <Option value="ukr">Укр</Option>
            <Option value="en-GB">Eng</Option>
        </Select>
    );
}

export default SelectLangeage;
