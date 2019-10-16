import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import 'antd/dist/antd.css';

function SelectLangeage() {
    if (localStorage.getItem('i18nextLng') === null) {
        localStorage.setItem('i18nextLng', 'GB');
    }

    const { Option } = Select;
    const { i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <Select defaultValue="GB" onChange={changeLanguage} style={{ width: 120 }}>
            <Option value="RU">Рус</Option>
            <Option value="UKR">Укр</Option>
            <Option value="GB">Eng</Option>
        </Select>
    );
}

export default SelectLangeage;
