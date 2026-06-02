import { useState, useEffect } from "react";

// Custom hook for sidebar toggle functionality
export const useSidebar = () => {
    const [isToggled, setIsToggled] = useState(false)
    const [isSidebarHovered, setIsSidebarHovered] = useState(false)

    const toggleSidebar = () => {
        if(isSidebarHovered){
            setIsSidebarHovered(false)
        }
        setIsToggled(!isToggled)
    }

    const handleMobileToggle = () => {
        setIsToggled(true)
    }

    const handleSidebarHover = (hovering) => {
        if (isToggled) {
            setIsSidebarHovered(hovering)
        }
    }

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper')
        if (wrapper) {
            if (isToggled) {
                wrapper.classList.add('toggled')
            } else {
                wrapper.classList.remove('toggled')
            }
            
            if (isSidebarHovered) {
                wrapper.classList.add('sidebar-hovered')
            } else {
                wrapper.classList.remove('sidebar-hovered')
            }
        }
    }, [isToggled, isSidebarHovered])

    return {
        isToggled,
        isSidebarHovered,
        toggleSidebar,
        handleMobileToggle,
        handleSidebarHover
    }
}

// Custom hook for dropdown functionality
export const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)
    const open = () => setIsOpen(true)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.dropdown')) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return {
        isOpen,
        toggle,
        close,
        open
    }
}