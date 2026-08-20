import React from 'react';
import { Outlet } from 'react-router';
import { SvgSprite } from '../../../assets/SvgSprite';
import Header from '../Header/Header';
import { useLayoutContext } from '../../Providers/LayoutContext/LayoutContext';
import { BreadcrumbItem } from '../Navigation/Breadcrumb';
import { PageLoader } from '../PageLoader';

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

            <div className={`page ${fullscreen ? 'page--fullscreen' : ''} `}>
                {showHeader && <Header title={pageTitle} breadcrumbItems={breadcrumbItems} hasSidebars={false} />}

                <div className="page__container">
                    <div className="page__content">
                        <Outlet />
                    </div>
                </div>
            </div>

            <SvgSprite />
        </>
    );
};

export default BasicLayout;
