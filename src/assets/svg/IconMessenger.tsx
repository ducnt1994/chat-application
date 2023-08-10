export default function IconMessenger({isActive} : {isActive: boolean}) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.78525 12.2836L1.50507 14.9344L3.50757 13.7827" fill="#0081F3"/>
      <path d="M1.46918 15L1.75653 12.2784L1.81311 12.29L1.54101 14.8701L3.49683 13.7441L3.51838 13.82L1.46918 15Z" fill="#0081F3"/>
      <path d="M7.50007 0.0421143C3.37387 0.0421143 0.0288086 3.37622 0.0288086 7.48875C0.0288086 11.6013 3.37387 14.9354 7.50007 14.9354C11.6263 14.9354 14.9713 11.6026 14.9713 7.48875C14.9713 3.37622 11.6254 0.0421143 7.50007 0.0421143ZM8.93775 10.1759L6.11798 6.69253L3.35936 10.1851L6.11706 4.80229L8.71936 8.41179L11.6405 4.7934L8.93775 10.1759Z" fill="#0081F3"/>
      <path d="M7.5 14.9756C3.36483 14.9756 0 11.6171 0 7.48781C0 3.3598 3.36483 0 7.5 0C11.6352 0 15 3.35848 15 7.48781C15 11.6171 11.6352 14.9756 7.5 14.9756ZM7.5 0.0833444C3.39609 0.0833444 0.0574713 3.40592 0.0574713 7.4888C0.0574713 11.5717 3.39609 14.8943 7.5 14.8943C11.6039 14.8943 14.9425 11.5717 14.9425 7.4888C14.9425 3.40592 11.6039 0.0833444 7.5 0.0833444ZM3.17793 10.4704L6.11356 4.74008L8.72138 8.35485L11.8078 4.53189L8.9423 10.2362L8.91805 10.2066L6.11805 6.74765L3.17793 10.4704ZM6.11793 6.63823L6.13679 6.66139L8.93219 10.1151L11.4745 5.05281L8.71863 8.46663L8.69977 8.4409L6.12069 4.865L3.54069 9.90024L6.11793 6.63823Z" fill={isActive ? "#0081F3" : "#4B5563"}/>
    </svg>
  )
}
