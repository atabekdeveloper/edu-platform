import { Form } from 'antd';

export const FileInput: React.FC<{
  label: string;
  name: string;
  accept: string;
  hidden?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, accept, hidden, onChange }) => (
  <Form.Item label={label} name={name} hidden={hidden}>
    <input type="file" accept={accept} onChange={onChange} />
  </Form.Item>
);
