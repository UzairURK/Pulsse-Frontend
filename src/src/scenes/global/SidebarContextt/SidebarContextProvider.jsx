import React, { useState, useContext } from 'react'
import SidebarContext from './SidebarContext'
import { INITIAL_STATE_SIDEBAR } from './SidebarInitialState'

const SidebarContextProvider = ({ children }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(INITIAL_STATE_SIDEBAR) // initially

    return (  

        <SidebarContext.Provider value = {{sidebarExpanded, setSidebarExpanded}}>
            {children}
        </SidebarContext.Provider>
     )
}
export default SidebarContextProvider