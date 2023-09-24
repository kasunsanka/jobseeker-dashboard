import React from 'react';
import { Breadcrumb } from 'antd';

export default function Breadcrumbs({ breadcrumbs }) {
    let breadcrumbsUI = null;

    if (breadcrumbs) {
        // generate dynamic breadcrumbs
        const breadcrumbsItems = breadcrumbs.map(breadcrumb =>
            <Breadcrumb.Item key={breadcrumb.text}>
                {breadcrumb.link ? <a href={breadcrumb.link}>{breadcrumb.text}</a> : breadcrumb.text}
            </Breadcrumb.Item>
        );

        if (breadcrumbsItems) {
            breadcrumbsUI = <Breadcrumb className="ml-4">{breadcrumbsItems}</Breadcrumb>;
        }
    }

    return (breadcrumbsUI);
}
