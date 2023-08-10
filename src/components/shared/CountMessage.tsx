export default function CountMessage({total} : {
  total: number
}) {
  return (
    <div className={`relative`}>
      <div className={`absolute text-[10px] text-white top-1/2 left-1/2 transform: -translate-x-1/2 transform: -translate-y-1/2`}>{total}</div>
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="8.5" r="8" fill="#EB5757" stroke="white"/>
      </svg>
    </div>
  )
}