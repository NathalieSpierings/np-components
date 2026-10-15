import React from 'react';
import { Outlet } from 'react-router';
import { SvgSprite } from '../../../assets/SvgSprite';
import { useLayoutContext } from '../../Providers/LayoutContext/LayoutContext';
import { Breadcrumb, BreadcrumbItem } from '../Navigation/Breadcrumb';
import { PageLoader } from '../PageLoader';
import Title from '../../Typography/Title/Title';

export interface BasicLayoutProps {
    loading?: boolean;
    // Header props
    pageTitle?: string;
    breadcrumbItems?: BreadcrumbItem[];
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ loading, pageTitle, breadcrumbItems = [] }) => {
    const { fullscreen, showHeader } = useLayoutContext();

    return (
        <>
            <PageLoader loading={loading} />

            <div className={`pc-layout pc-layout--full-height main-layout ${fullscreen ? 'main-layout--fullscreen' : ''} `}>
                <div className="pc-layout__content">

                    <div className="pc-layout__main">
                        <div className="pc-layout pc-layout--full-height">
                            {showHeader && (
                                <div className="pc-layout__header main-layout__header">
                                    <div className="content-item">
                                        <div className="content-item__meta">
                                            {pageTitle ? <Title>{pageTitle}</Title> : null}
                                            {breadcrumbItems.length > 0 ? <Breadcrumb items={breadcrumbItems} /> : null}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pc-layout__content">
                                <div className="pc-layout__main main-layout__content">
                                    <Outlet />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <SvgSprite />
        </>
    );
};

export default BasicLayout;
