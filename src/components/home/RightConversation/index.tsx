import { Tabs } from 'antd';
export default function RightConversation() {
  const items = [
    {
      key: '1',
      label: `Thông tin`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `Tạo lead`,
      children: `Content of Tab Pane 2`,
    },
  ];

  const onChange = () => {
    console.log('ducbeo')
  }
  return (
    <div className={'w-[22%]'}>
      <Tabs className={'w-full'} defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}