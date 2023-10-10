import IconDelete from "../../../../assets/svg/IconDelete";
import { PlusOutlined } from '@ant-design/icons';
import {Image, Modal, Upload} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile as UploadImg } from 'antd/es/upload/interface';
import {useState} from "react";
import styles from "./custom-upload-file.module.scss"

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UploadFile() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadImg[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadImg) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <div className={'flex gap-3 mb-3 flex-wrap'}>
      {fileList.map((x, i) =>
        <div key={i} className={`relative`}>
          <div className={`w-[55px] rounded-md h-[55px] border border-gray-200 flex items-center justify-center relative bg-white`}>
            <Image className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={x.url}/>
          </div>
          <div className={`absolute -top-1 -right-1 cursor-pointer`}>
            <IconDelete/>
          </div>
        </div>
      )}

      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange} className={`${styles.customUpload}`}>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export function ItemRender() {
  return (
    <div className={`relative`}>
      <div className={`w-[55px] rounded-md h-[55px] border border-gray-200 flex items-center justify-center relative bg-white`}>
        <img className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={'https://picsum.photos/300/300'}/>
      </div>
      <div className={`absolute -top-1 -right-1 cursor-pointer`}>
        <IconDelete/>
      </div>
    </div>
  )
}