import React from 'react';
import { Input as AntdInput, Form, InputProps } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { omit } from 'lodash';

interface IProps extends InputProps {
    validateStatus?: ValidateStatus;
    help?: React.ReactNode;
    label?: string;
    type?: string;
    maxLength?: number;
}

const TextAreaInput: React.FC<IProps> = (props) => {
    const { label, help, validateStatus, placeholder, value, className, maxLength } = props;

    return (
        <Form.Item validateStatus={validateStatus} help={help} label={label} className="novel-label">
            <AntdInput.TextArea
                bordered={false}
                {...omit(props, ['validateStatus', 'className', 'help', 'maxLength'])}
                placeholder={placeholder}
                value={value}
                className={`novel-input ${className}`}
                maxLength={maxLength}
            />
        </Form.Item>
    );
};

export default TextAreaInput;
