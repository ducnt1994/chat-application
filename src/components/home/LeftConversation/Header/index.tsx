import IconSearch from "../../../../assets/svg/IconSearch";
import IconArrowDown from "../../../../assets/svg/IconArrowDown";
import IconTag from "../../../../assets/svg/IconTag";

export default function Header() {

  const handleKeyDown = (event : any) => {
    if (event.key === 'Enter') {
      console.log('ducbeo')
    }
  };

  return (
    <div className={`p-1 flex gap-1 items-center bg-gray-200 w-full`}>
      <div className={`relative flex-1`}>
        <input type="search" id="search"
               onKeyDown={handleKeyDown}
               className="block w-full h-9 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-white"
               placeholder="Search"/>
        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          <IconSearch/>
        </div>
      </div>
      <div className={`border w-[120px] border-gray-300 bg-white rounded-md px-1 py-2 flex items-center h-9 cursor-pointer`}>
        <div className={`flex-1 flex items-center gap-1`}>
          <div><IconTag/></div>
          <div className={`text-sm text-gray-400`}>Nhãn</div>
        </div>
        <div>
          <IconArrowDown/>
        </div>
      </div>
    </div>
  )
}