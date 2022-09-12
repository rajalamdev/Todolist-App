import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons"

export const Footer = () => {
  return (
    <footer className="flex smartphone:justify-between justify-center fixed backdrop-blur-sm bottom-0 left-0 right-0 bg-bg-nav py-4 px-8 lg:px-12 border-t border-border-primary text-sm flex-wrap gap-4">
      <div>
        <a href="https://github.com/rajalamofficial" target="_blank" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGithub} size="lg" className="" />
          <span className="relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-text-primary after:block text-white hover:after:h-[3px] cursor-pointer">rajalamofficial</span>
        </a>
      </div>  
      <div className="flex gap-2 text-white">
        <span>Made with</span>
        <FontAwesomeIcon icon={faHeart} size="lg" className="text-red-500" />
        <span>by <a href="https://instagram.com/rajalam.dev" target="_blank" className="relative after:content-[''] after:absolute after:w-full after:left-0 after:right-0 after:h-[2px] after:bg-text-primary after:block hover:after:h-[3px] cursor-pointer">Raj Alam</a></span>
      </div>
    </footer>
  )
}
