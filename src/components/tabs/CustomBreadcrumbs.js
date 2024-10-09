import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomBreadcrumbs = ({ breadcrumbs }) => {
    return (
        <Breadcrumb style={{ fontSize: '18px', color: 'var(--primary-color-light)!important' }}>
            {breadcrumbs.map((breadcrumb, index) => {
                const isActive = (index === breadcrumbs.length - 1);
                return (
                    <Breadcrumb.Item 
                        key={index} 
                        className="d-flex align-items-center" 
                        style={{ fontSize: '18px', color: 'white', position: 'relative' }} 
                        active={isActive}
                    >
                        {!isActive ? (
                            <Link to={breadcrumb.link} style={{ color: 'var(--primary-color)', }}>
                                {breadcrumb.label}
                            </Link>
                        ) : (
                            <div style={{ opacity: '0.8' }}>{breadcrumb.label}</div>
                        )}

                        {!isActive && index < breadcrumbs.length - 1 && (
                            <span className="custom-slash"> 
                                {' / '}
                            </span>
                        )}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb >
    );
};

export default CustomBreadcrumbs;
