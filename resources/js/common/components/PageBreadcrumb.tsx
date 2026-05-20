import React from 'react';
import { Link } from 'react-router-dom';

const PageBreadcrumb = ({ pageTitle, children }) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 className="text-title-md2 font-bold text-gray-800 dark:text-white">
                    {pageTitle}
                </h2>
                <nav>
                    <ol className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                        <li>
                            <Link className="hover:text-brand-500" to="/admin">
                                Dashboard
                            </Link>
                        </li>
                        <li className="text-brand-500">/</li>
                        <li className="text-brand-500">{pageTitle}</li>
                    </ol>
                </nav>
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageBreadcrumb;
