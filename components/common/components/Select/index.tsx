import React from 'react';
import { Form, Select as AntSelect, SelectProps } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { SelectValue } from 'antd/lib/select';
import { omit } from 'lodash';
import icons from '@icons';

interface IProps extends SelectProps<SelectValue> {
    validateStatus?: ValidateStatus;
    help?: React.ReactNode;
    label?: string | undefined;
    custom?: boolean;
}

const Select: React.FC<IProps> = (props) => {
    const { label, validateStatus, help, className = '', placeholder } = props;

    return (
        <Form.Item help={help} validateStatus={validateStatus} label={label} className="novel-label">
            <div>
                <AntSelect
                    getPopupContainer={(trigger) => trigger.parentNode}
                    bordered={false}
                    {...omit(props, ['validateStatus', 'className', 'help'])}
                    placeholder={placeholder}
                    className={`${className} novel-select`}
                    suffixIcon={icons.selectIcon()}
                />
            </div>
        </Form.Item>
    );
};
Select.defaultProps = {
    custom: false,
};

export default Select;
