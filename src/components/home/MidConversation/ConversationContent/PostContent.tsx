export default function PostContent() {
  const post = {
    created_time: "2023-08-13T15:38:38+0000",
    message: `[GÓC CHÀO SÂN]
      🍀- Là một du học sinh và có 12 năm làm trong lĩnh vực Ngoại giao Nhà nước, mình có cơ hội được đi nhiều nơi trên thế giới và tiếp xúc với nhiều nền giáo dục khác nhau. Mình nhận ra, Anh ngữ tuy cần thiết và mặc dù cả Nhà nước và phụ huynh tập trung tiếng Anh cho con từ bé nhưng Hiệu quả thực sự chưa cao. 
      🍀- Bản thân đã từng học tiếng Anh bao nhiêu năm và là Phụ huynh cũng chú trọng tiếng Anh cho con, nhưng để tìm được phương pháp tư duy Tiếng Anh hiện đại, đúng đắn, 1 trung tâm uy tín và 1 môi trường tiếng Anh chuyên nghiệp mà chi phí hợp lý giữa 1 rừng các trung tâm tiếng Anh đang ngày mọc lên như nấm sau mưa thì quá khó khăn cho phụ huynh.
      🍀- Là một Tư vấn viên với 5 năm kinh nghiệm trong lĩnh vực Sale và Chăm sóc Khách hàng, được đào tạo bài bản và chuyên nghiệp bởi Manulife Việt Nam, mình có cơ hội đi nhiều nơi và tiếp xúc với nhiều Khách hàng ở nhiều vùng khác nhau trên mọi miền Tổ quốc, qua câu chuyện với Khách, mình nhận ra Tiếng Anh ở các miền xa xôi thực sự khó tiếp cận, hầu hết tập trung ở các thành phố lớn trong khi nhu cầu cho con của Khách hàng không phải không có. 
      🍀- Trong khi đó, ngoài Tiếng Anh, các con cần các kỹ năng để có thể tiếp xúc và giao tiếp với xã hội, cái mà hiện tại, các con đang phải chấp nhận bỏ qua để làm bạn với thế giới ảo. Thiếu định hướng, thiếu kiến thức, thiếu kinh nghiệm khiến nhiều bạn dần lớn lên mà không biết mình sống vì mục đích gì? Ước mơ của mình ra sao? Vì sao mình phải học?
      🥺- Trăn trở và suy nghĩ, bài luận tốt nghiệp của mình tại NZ về Giáo dục giờ mới trở thành Hiện thực khi có sự ra đời của ACADEMIA.👏🏻👏🏻👏🏻
      ✌️🍀- Công ty Giáo dục ACADEMIA được thành lập từ những người dày dạn kinh nghiệm trong lĩnh vực Giáo dục - Đào tạo - Du học - Định hướng và Phát triển con người. Ở ACADEMIA, các bạn trẻ Việt Nam trên toàn quốc không chỉ được tiếp cận phương pháp IELTS tiên tiến, hiện đại mà còn được tư vấn, định hướng phát triển lâu dài từ du học đến kỹ năng mềm với chi phí hoàn toàn hợp lý.
      ✌️🍀- ACADEMIA được thành lập với sứ mệnh xây dựng 1 môi trường hệ sinh thái Giáo dục phát triển, lấy Học viên làm trung tâm với các giá trị lâu bền, phát triển tam giác kết nối mối quan hệ ACADEMIA - HỌC VIÊN - PHỤ HUYNH, để các bạn trẻ trở thành 1 công dân Toàn cầu ưu tú, mạnh về kiến thức và giàu về tình yêu thương.
      🍀✌️- ACADEMIA chính thức khai trương Văn phòng Giao dịch tại ngõ 9 phố Nguyên Hồng. Hân hạnh được đón tiếp các quý vị Phụ huynh, các bạn trẻ đến thăm quan và đăng ký học thử miễn phí✌️🍀
      - Nhanh tay ib để được nhận ưu đãi khi đăng ký khoá học nhé!!!`,
        id: "101272369066547_301004639252440",
      medias: [
        'https://picsum.photos/500/600',
        'https://picsum.photos/800/700',
        'https://picsum.photos/1000/1200'
      ]
    }
  return (
    <div className={`pb-6 border-b border-b-gray-300`}>
      <div className={`whitespace-pre-line text-left text-sm text-gray-900`} dangerouslySetInnerHTML={{__html: post.message}}>
      </div>

      <div className={`mt-2 flex gap-2`}>
        {
          post.medias.map((item, key) => {
            return <div key={key}>
              <div className={`w-[120px] rounded-md h-[120px] border border-gray-200 flex items-center justify-center relative bg-white`}>
                <img className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={item}/>
              </div>
            </div>
          })
        }
      </div>
    </div>

  )
}