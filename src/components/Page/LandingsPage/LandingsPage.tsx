import React, { ReactNode, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Avatar from "../../UI/Avatar/Avatar";
import Button from "../../UI/Button/Button";
import ContentItem from "../../UI/ContentItem/ContentItem";
import Icon from "../../UI/Icons/Icon/Icon";
import Widget, { WidgetProps } from "../../UI/Widget/Widget";
import BottomSheet from "../BottomSheet/BottomSheet";
import { Logo } from "../Logo";
import  Dropdown  from "../../Forms/Dropdown/Dropdown";

export interface LandingsPageProps {
    phoneNumber?: string;
    contactButtonLabel?: string;
    contactUrl?: string;
    title?: string;
    subtitle?: string;
    alertMessage?: string;
    widgets?: WidgetProps[];
    bottomSheetTitle?: string;
    authName?: string;
    logout?: () => void;
    bottomSheetOpen?: boolean;
    setBottomSheetOpen?: (open: boolean) => void;
    bottomSheetContent?: ReactNode;
}
const LandingsPage: React.FC<LandingsPageProps> = ({
    phoneNumber = '040-2300392',
    contactButtonLabel = 'Contact',
    contactUrl = 'https://promeetec.nl/contact/',
    title = 'Welkom bij het Promeetec portaal',
    subtitle = 'Wat wilt u doen?',
    alertMessage,
    widgets,
    bottomSheetTitle = 'Aandacht vereist!',
    authName,
    logout,
    bottomSheetOpen,
    setBottomSheetOpen = () => {},
    bottomSheetContent
}) => {

    const [content, setContent] = useState<ReactNode>(bottomSheetContent);

    return (
        <div className="onboarding-layout">
            {
                alertMessage && alertMessage.length > 0 &&
                <div className="onboarding-layout__alert shadow-orange">
                    <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraLarge} />
                    <p>{alertMessage}</p>
                </div>
            }

            <div className="onboarding-layout__header">
                <div className="onboarding-layout__header__container">
                    <ContentItem item={
                        {
                            prefix: <Logo />,
                            content:<h3>{title}</h3>,
                            contentItemPosition: "item-center",
                            postfix: <>
                                <Dropdown
                                    dropdownToggle={{
                                        prefix: (<Avatar size={SizeDefinitions.Small} icon={IconDefinitions.user} />)
                                    }}
                                    dropdownHeader={{
                                        border: true,
                                        content: (
                                            <>
                                                <span>Welkom &nbsp;</span><strong>{authName}</strong>
                                            </>
                                        )
                                    }}
                                    menuItems={[
                                        {
                                            label: 'Afmelden',
                                            icon: <Icon icon={IconDefinitions.power}/> ,
                                            onClick: logout
                                        }]}
                                />


                                <div className="flex flex-center">
                                    <div className="icon icon--md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M511.996 232.521c0 8.492-6.864 15.356-15.356 15.356-8.477 0-15.356-6.864-15.356-15.356 0-53.9-20.992-104.59-59.105-142.703s-88.804-59.105-142.703-59.105c-8.492 0-15.356-6.879-15.356-15.356C264.119 6.864 270.983 0 279.475 0c62.1 0 120.499 24.186 164.417 68.104s68.104 102.317 68.104 164.417zM492.555 400.561c11.978 11.978 11.978 31.449 0 43.427l-26.09 26.09c-5.789 5.805-13.513 8.999-21.713 8.999-2.933 0-5.789-.43-8.523-1.213l-5.482 5.467C411.736 502.341 385.217 512 353.399 512c-19.41 0-40.77-3.593-63.605-10.826-56.863-18.028-117.09-56.863-169.607-109.365-52.502-52.518-91.353-112.744-109.365-169.592C-7.575 164.14-2.369 115.569 25.379 84.719c.415-.522 8.768-8.953 8.768-8.953-2.994-10.396-.399-22.067 7.77-30.236l26.09-26.09c5.805-5.805 13.513-8.999 21.713-8.999s15.909 3.194 21.713 8.999l100.321 100.321c11.978 11.978 11.978 31.464 0 43.427l-26.074 26.09c-5.989 5.989-13.851 8.983-21.729 8.983-2.872 0-5.743-.415-8.523-1.198l-9.843 9.843c-7.002 7.002 3.747 50.537 56.357 103.146 52.625 52.625 96.159 63.359 103.146 56.357h.015l9.843-9.843c-2.994-10.396-.415-22.067 7.77-30.251l26.09-26.074c11.962-11.978 31.449-11.978 43.427 0l100.322 100.32zm-21.713 21.714L370.521 321.954l-26.09 26.09 100.321 100.321c.031 0 26.09-26.09 26.09-26.09zm-59.044 36.578l-77.855-77.87-7.125 7.141h-.015c-7.448 7.463-17.245 10.78-28.531 10.78-33.553 0-80.312-29.407-118.042-67.136-50.414-50.414-85.963-116.936-56.387-146.558l.015-.015 7.141-7.141-77.855-77.855-2.764 2.764c-22.097 22.097-25.752 61.148-10.273 109.964 16.554 52.256 52.702 108.076 101.795 157.169s104.912 85.241 157.169 101.795c48.817 15.479 87.867 11.824 109.949-10.273h.015l2.763-2.765zM163.967 167.58l26.075-26.105L89.721 41.154l-26.09 26.09 50.168 50.153 49.784 49.8.369.369.015.014z" fill="#505355"></path>
                                            <path d="M370.521 321.954l100.321 100.321s-26.059 26.09-26.09 26.09L344.431 348.044l26.09-26.09z" fill="#c1c2c3"></path>
                                            <path d="M434.11 232.521c0 8.477-6.88 15.356-15.356 15.356s-15.356-6.879-15.356-15.356c0-33.092-12.884-64.219-36.302-87.621-23.403-23.418-54.529-36.302-87.621-36.302-8.477 0-15.356-6.879-15.356-15.356s6.879-15.356 15.356-15.356c41.308 0 80.128 16.078 109.35 45.3 29.207 29.207 45.285 68.027 45.285 109.335z" fill="#505355"></path>
                                            <path d="M333.943 380.983l77.855 77.87-2.764 2.764h-.015c-22.082 22.097-61.132 25.752-109.949 10.273-52.256-16.554-108.076-52.702-157.169-101.795S56.66 265.183 40.106 212.926c-15.479-48.817-11.824-87.867 10.273-109.964l2.764-2.764 77.855 77.855-7.141 7.141-.015.015c-29.576 29.622 5.973 96.144 56.387 146.558 37.73 37.73 84.489 67.136 118.042 67.136 11.287 0 21.084-3.317 28.531-10.78h.015l7.126-7.14z" fill="#f9906b"></path>
                                            <path d="M356.225 232.521c-.015 8.477-6.879 15.356-15.356 15.356h-.015c-8.477 0-15.356-6.879-15.341-15.356 0-12.469-4.668-23.725-13.483-32.555-8.953-8.937-19.901-13.483-32.539-13.483h-.015c-8.477.015-15.356-6.864-15.356-15.341 0-8.492 6.879-15.356 15.356-15.371h.015c20.792 0 39.542 7.785 54.253 22.481 14.71 14.712 22.481 33.477 22.481 54.269z" fill="#505355"></path>
                                            <path d="M190.042 141.475l-26.074 26.105-.015-.015-.369-.369-49.784-49.8-50.169-50.152 26.09-26.09 100.321 100.321z" fill="#c1c2c3"></path>
                                        </svg>
                                    </div>
                                    <div className="strong">{phoneNumber}</div>
                                </div>
                                <Button css="ml-2" shadow={true} color={ColorDefinitions.Primary} onClick={() => window.open(contactUrl, '_blank')}>{contactButtonLabel}</Button>
                            </>
                        }
                    } />
                </div>
            </div>
            <div className="onboarding-layout__content">
                <div className="centered centered--wide">
                    <div className="onboarding">

                        <h3>{subtitle}</h3>

                        <div className="onboarding__container mt-5">

                            <div className="onboarding-layout__tiles">
                                {widgets?.map((props, index) => (
                                    <Widget key={index} {...props} />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <BottomSheet open={bottomSheetOpen} openBottomSheet={setBottomSheetOpen}>
                <h3>{bottomSheetTitle}</h3>
                {bottomSheetContent}
            </BottomSheet>

        </div>
    )
}

export default LandingsPage;