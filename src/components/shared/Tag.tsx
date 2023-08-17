export default function Tag({title, color} : {
  title: string,
  color: string
}) {
  return (
    <div className={`px-1 text-[9px] text-white rounded`} style={{
      background: color
    }}>{title.length >= 16 ? title.toUpperCase().substring(0, 12) + '...' : title.toUpperCase()}</div>
  )
}