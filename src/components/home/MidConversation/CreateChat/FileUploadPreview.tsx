import {Image} from "antd";
import IconDelete from "../../../../assets/svg/IconDelete";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";
import {ItemFile} from "../../../../dto";

export default function FileUploadPreview({fileListSelected} : {
  fileListSelected: ItemFile[]
}) {
  return (
    <div className={'flex gap-3 mb-3 flex-wrap'}>
      {fileListSelected.map((x, i) =>
        <div key={i} className={`relative`}>
          <div className={`w-[55px] rounded-md h-[55px] border border-gray-200 flex items-center justify-center relative bg-white`}>
            <Image className={`max-w-full max-h-full object-contain`} fallback={IMAGE_ERROR} alt={'avatar'} src={x.url}/>
          </div>
          <div className={`absolute -top-1 -right-1 cursor-pointer`}>
            <IconDelete/>
          </div>
        </div>
      )}
    </div>
  )
}