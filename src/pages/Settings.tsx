
import React, { ReactElement } from "react";
import { SidebarDrawer } from "../components/Page/Sidebar/SidebarDrawer";
import { Button, SidebarContentPanel } from "../components";
import { ColorDefinitions } from "../lib/utils/definitions";

const UserPreferences = (): ReactElement => {
  
    return (
        <SidebarDrawer footerBorderColor={ColorDefinitions.SurfaceDark}
            footerContent={
                <>
                    <div></div>
                    <div>
                        <Button>
                            Standaardwaarden herstellen
                        </Button>
                        <Button color={ColorDefinitions.Primary} shadow={true} >
                            Opslaan
                        </Button>
                    </div>
                </>
            }
        >
            <SidebarContentPanel>

                <p>Settings can be placed here...</p>

               
            
            </SidebarContentPanel>
        </SidebarDrawer>
    )
}

export default UserPreferences;