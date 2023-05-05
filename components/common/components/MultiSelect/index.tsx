import React from 'react';
import { Form, Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { omit } from 'lodash';
import icons from '@/icons';

interface IProps extends SelectProps<SelectValue> {
    validateStatus?: ValidateStatus;
    help?: React.ReactNode;
    custom?: boolean;
}

const MultiSelect: React.FC<IProps> = (props) => {
    const { validateStatus, help, className = '', placeholder } = props;

    return (
        <Form.Item help={help} validateStatus={validateStatus}>
            <Select
                mode="multiple"
                allowClear
                {...omit(props, ['validateStatus', 'className', 'help'])}
                style={{ width: '100%' }}
                className={`${className} novel-multiselect`}
                placeholder={placeholder}
                suffixIcon={icons.selectIcon()}
            />
        </Form.Item>
    );
};

export default MultiSelect;
