
import React from "react";
import { ColorDefinitions } from "../lib/utils/definitions";
import { MainLayoutDrawerContent, MainLayoutDrawerFooter } from "../components/Page/Main/MainLayoutDrawer";
import Button from "../components/UI/Button/Button";

const UserPreferences= () => {
 
    return (
         <>
            <MainLayoutDrawerContent>
              <p>Settings can be placed here...</p>
            </MainLayoutDrawerContent>
            <MainLayoutDrawerFooter>
                <Button>Standaardwaarden herstellen</Button>
                <Button color={ColorDefinitions.Primary} shadow={true}>Opslaan</Button>
            </MainLayoutDrawerFooter>
        </>       
    )
}

export default UserPreferences;
