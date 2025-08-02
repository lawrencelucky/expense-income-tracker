import React from 'react';
import { DatePicker, DatePickerProps, Form } from 'antd';
import { omit } from 'lodash';

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
    const { value, placeholder, className = '' } = props;

    return (
        <Form.Item>
            <DatePicker
                {...omit(props, ['validateStatus', 'className', 'help'])}
                placeholder={placeholder}
                value={value}
                className={`novel-input ${className}`}
            />
        </Form.Item>
    );
};

export default CustomDatePicker;
