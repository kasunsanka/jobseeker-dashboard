

import { PageHeaderAlt } from 'components/layout-components/PageHeaderAlt';
import React from 'react';
import Flex from '../Flex';
import Breadcrumbs from 'views/app-views/shared/components/Breadcrumbs';


export default function PageHeader({ title, breadcrumbs, action }) {
    return (
        <PageHeaderAlt className="bg-white border-bottom" overlap>
            <div className="container mb-3">
                <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                    {/* title and breadcrumbs */}
                    <div className="d-flex align-items-center">
                        <h2 className="mb-0">{title}</h2>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    {/* title and breadcrumbs */}

                    {/* action button  */}
                    <div>
                        {action}
                    </div>
                    {/* action button  */}
                </Flex>
            </div>
        </PageHeaderAlt>
    )
}
