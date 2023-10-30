import {Space, Spin} from "antd";

export default function PageLoading() {
  return (
    <Space className={`w-full flex justify-center items-center flex-col`} style={{height: 'calc(100vh - 120px)'}}>
      <Spin size={'large'}></Spin>
      <div className={`text-blue-500`}>Đang tải trang</div>
    </Space>
  )
}