import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

// Custom hook for MetisMenu functionality in React
export const useMetisMenu = (menuItems = []) => {
    const [activeMenus, setActiveMenus] = useState(new Set())
    const [expandedMenus, setExpandedMenus] = useState(new Set())
    const location = useLocation()

    // Check if a menu item should be active based on current path
    const isMenuActive = useCallback((item) => {
        const checkActiveRecursively = (menuItem) => {
            if (menuItem.path === location.pathname) {
                return true
            }
            
            // Check if any child is active
            if (menuItem.children) {
                return menuItem.children.some(child => checkActiveRecursively(child))
            }
            
            return false
        }
        
        return checkActiveRecursively(item)
    }, [location.pathname])

    // Check if a menu item should be expanded
    const shouldMenuBeExpanded = useCallback((item) => {
        if (item.children) {
            return item.children.some(child => isMenuActive(child))
        }
        return false
    }, [isMenuActive])

    // Process menu items recursively
    const processMenuItems = useCallback((items, activeSet, expandedSet) => {
        const processRecursively = (menuItems, activeSet, expandedSet) => {
            menuItems.forEach(item => {
                if (isMenuActive(item)) {
                    activeSet.add(item.id)
                }
                
                if (shouldMenuBeExpanded(item)) {
                    expandedSet.add(item.id)
                }

                if (item.children) {
                    processRecursively(item.children, activeSet, expandedSet)
                }
            })
        }
        
        processRecursively(items, activeSet, expandedSet)
    }, [isMenuActive, shouldMenuBeExpanded])

    // Update active and expanded menus based on current location
    useEffect(() => {
        const newActiveMenus = new Set()
        const newExpandedMenus = new Set()

        if (menuItems.length > 0) {
            processMenuItems(menuItems, newActiveMenus, newExpandedMenus)
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveMenus(newActiveMenus)
        setExpandedMenus(newExpandedMenus)
    }, [location.pathname, menuItems])  // eslint-disable-line react-hooks/exhaustive-deps

    // Helper function to find parent menu ID
    const findParentMenuId = useCallback((menuId, items = menuItems) => {
        for (const item of items) {
            if (item.children) {
                // Check if menuId is a direct child
                if (item.children.some(child => child.id === menuId)) {
                    return item.id
                }
                // Recursively check in nested children
                const parentInChild = findParentMenuId(menuId, item.children)
                if (parentInChild) {
                    return parentInChild
                }
            }
        }
        return null
    }, [menuItems])

    // Helper function to get all ancestor menu IDs
    const getAncestorMenuIds = useCallback((menuId) => {
        const ancestors = []
        let currentParent = findParentMenuId(menuId)
        while (currentParent) {
            ancestors.push(currentParent)
            currentParent = findParentMenuId(currentParent)
        }
        return ancestors
    }, [findParentMenuId])

    // Toggle menu expansion
    const toggleMenu = useCallback((menuId) => {
        setExpandedMenus(prev => {
            const newSet = new Set(prev)
            
            if (newSet.has(menuId)) {
                // If clicking on currently expanded menu, just close it
                newSet.delete(menuId)
            } else {
                // If opening a new menu, close sibling menus but keep parent hierarchy
                const menusToKeep = new Set()
                const ancestors = getAncestorMenuIds(menuId)
                
                // Keep ancestor menus open (parent hierarchy)
                ancestors.forEach(ancestorId => menusToKeep.add(ancestorId))
                
                // Keep menus that have active children
                prev.forEach(expandedId => {
                    if (activeMenus.has(expandedId)) {
                        menusToKeep.add(expandedId)
                        // Also keep ancestors of active menus
                        const activeAncestors = getAncestorMenuIds(expandedId)
                        activeAncestors.forEach(ancestorId => menusToKeep.add(ancestorId))
                    }
                })
                
                // Clear all and add back only the ones to keep + the new one
                newSet.clear()
                menusToKeep.forEach(id => newSet.add(id))
                newSet.add(menuId)
            }
            
            return newSet
        })
    }, [activeMenus, getAncestorMenuIds])

    // Close expanded menus that don't have active children (for single menu navigation)
    const closeNonActiveMenus = useCallback(() => {
        setExpandedMenus(prev => {
            const newSet = new Set()
            // Keep only expanded menus that have active children
            prev.forEach(expandedId => {
                if (activeMenus.has(expandedId)) {
                    newSet.add(expandedId)
                }
            })
            return newSet
        })
    }, [activeMenus])

    // Check if menu is active
    const isActive = useCallback((menuId) => {
        return activeMenus.has(menuId)
    }, [activeMenus])

    // Check if menu is expanded
    const isExpanded = useCallback((menuId) => {
        return expandedMenus.has(menuId)
    }, [expandedMenus])

    return {
        isActive,
        isExpanded,
        toggleMenu,
        closeNonActiveMenus,
        activeMenus,
        expandedMenus
    }
}