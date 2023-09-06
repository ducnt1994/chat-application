import IconLike from "../../../../assets/svg/MidConversation/ItemChat/IconLike";
import IconHideComment from "../../../../assets/svg/MidConversation/ItemChat/IconHideComment";
import IconComment from "../../../../assets/svg/MidConversation/ItemChat/IconComment";
import IconDetele from "../../../../assets/svg/MidConversation/ItemChat/IconDetele";
import Avatar from "../../../shared/Avatar";


export default function ItemConversationContentComment({position = 'left'} : {
  position: 'left' | 'right'
}) {
  const message = `ĐỀ NGHỊ ĐƯA VOI Ở CÔNG VIÊN THỦ LỆ - HÀ NỘI VỀ VỚI TỰ NHIÊN 
Thời gian gần đây, hình ảnh về 2 con voi ở công viên Thủ Lệ bị xích một chỗ, hầu như không được di chuyển đang được nhiều người quan tâm.
Do được nuôi và chăm sóc trong vườn thú khoảng 10 năm nhưng với điều kiện chuồng nuôi chật hẹp, bị xích và không đảm bảo về nhu cầu đi lại tự nhiên, tình trạng sức khỏe của hai con voi này ngày càng suy giảm. Đối với voi, việc di chuyển tự nhiên sẽ cải thiện thể chất và tinh thần tốt hơn.
Tổ chức Động vật Châu Á đã có văn bản gửi thành phố Hà Nội, đề xuất phương án đưa 2 con voi này về Vườn Quốc gia Yok Don, tỉnh Đắk Lắk. Đây là nơi đang bảo tồn Voi và cũng là địa bàn gốc của 1 trong 2 con Voi này. 
Tổ chức này sẵn sàng tài trợ chi phí vận chuyển, nếu đề xuất được chấp thuận.
Theo: VTV 
Ảnh: VOV`

  return (
    <div className={`flex gap-3 ${position === 'left' ? "" : 'flex-row-reverse'} mt-4`}>
      <Avatar size={50} url={'https://picsum.photos/200/200'}/>
      <div className={`flex-1 ${position === 'left' ? '' : 'flex justify-end'}`}>
        <div className={`max-w-[430px] py-2 px-3 bg-white rounded-md relative text-left`}>
          {/*triangle*/}
          {
            position === 'left' ? (
              <div className="w-3  overflow-hidden inline-block absolute -left-3">
                <div className=" h-4 bg-white -rotate-45 transform origin-top-right"></div>
              </div>
            ) : (
              <div className="w-3  overflow-hidden inline-block absolute -right-3">
                <div className=" h-4  bg-white rotate-45 transform origin-top-left"></div>
              </div>
            )
          }

          <div className={`text-[13px] whitespace-pre-line`} dangerouslySetInnerHTML={{__html: message}}></div>
          <div className={`w-[128px] rounded-md h-[128px] border border-gray-200 flex items-center justify-center relative bg-white`}>
            <img className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={'https://picsum.photos/500/500'}/>
          </div>

          <div className={`mt-3 flex gap-3 justify-end`}>
            <div className={'cursor-pointer'}><IconLike/></div>
            <div className={'cursor-pointer'}><IconHideComment/></div>
            <div className={'cursor-pointer'}><IconComment/></div>
            <div className={'cursor-pointer'}><img alt={''} src={'/icon-fb-chat.png'}/></div>
            <div className={'cursor-pointer'}><IconDetele/></div>
          </div>
        </div>


      </div>

    </div>
  )
}