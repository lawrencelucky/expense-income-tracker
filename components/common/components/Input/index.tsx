import React from 'react';
import { Input as AntdInput, Form, InputProps } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { omit } from 'lodash';

interface IProps extends InputProps {
    validateStatus?: ValidateStatus;
    help?: React.ReactNode;
    label?: string;
}

const Input: React.FC<IProps> = (props) => {
    const { label, help, validateStatus, placeholder, value, className = '' } = props;
    return (
        <Form.Item validateStatus={validateStatus} help={help} label={label} className="novel-label">
            <AntdInput
                bordered={false}
                {...omit(props, ['validateStatus', 'className', 'help'])}
                placeholder={placeholder}
                value={value}
                className={`novel-input ${className}`}
            />
        </Form.Item>
    );
};

export default Input;
