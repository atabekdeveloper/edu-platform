import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import React from 'react';

export const FileInput: React.FC<{
  label: string;
  name: string;
  hidden?: boolean;
  required?: boolean;
  accept?: string;
}> = ({ label, name, hidden, required, accept }) =>
  hidden ? null : (
    <Form.Item label={label} name={name} rules={[{ required, message: '' }]}>
      <Upload
        beforeUpload={() => false} // Prevent automatic upload
        accept={accept}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
