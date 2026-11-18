import React from 'react'

const Title = ({title , subTitle , align , font, light}) => {
  return (
    <div className= {`flex flex-col justify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`} >
        <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"} ${light ? "text-white" : ""}`}>
            {title}
        </h1>
        <p className={`text-sm md:text-base mt-2 max-w-174 ${light ? "text-white/70" : "text-gray-500/90"}`} >
            {subTitle}
        </p>
    </div>
  )
}

export default Title;