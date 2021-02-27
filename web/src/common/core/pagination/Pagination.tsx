import React, { useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

const BUTTONS_AROUND_CURRENT_BUTTON = 8;

interface PaginationProps {
    total: number | undefined;
    pageSize: number;
    initialPage?: number;
    onPageClicked?: (pageNumber: number, pageSize: number) => void;
}

function Pagination(props: PaginationProps & WithTranslation) {
    const { total = 0, initialPage, onPageClicked, pageSize } = props;

    const [page, setPage] = useState(initialPage || 0);
    const totalPages = Math.ceil(total / pageSize);

    const firstButton = (
        <button
            disabled={page === 0}
            onClick={() => {
                setPage(0);
                onPageClicked && onPageClicked(0, pageSize);
            }}
        >
            {1}
        </button>
    );

    const lastButton = (
        <button
            disabled={page === totalPages}
            onClick={() => {
                setPage(totalPages - 1);
                onPageClicked && onPageClicked(totalPages - 1, pageSize);
            }}
        >
            {totalPages}
        </button>
    );

    const prevButton = (
        <button
            disabled={page === 0}
            onClick={() => {
                setPage(page - 1);
                onPageClicked && onPageClicked(page - 1, pageSize);
            }}
        >
            PREV
        </button>
    );

    const nextButton = (
        <button
            disabled={page === totalPages - 1}
            onClick={() => {
                setPage(page + 1);
                onPageClicked && onPageClicked(page + 1, pageSize);
            }}
        >
            NEXT
        </button>
    );

    const currentButton = (
        <button className="__active" disabled>
            {page + 1}
        </button>
    );

    const renderNumericalButton = (page: number) => (
        <span key={page}>
            <button
                onClick={() => {
                    onPageClicked && onPageClicked(page, pageSize);
                    setPage(page);
                }}
            >
                {page + 1}
            </button>
        </span>
    );

    let calculatedButtonsLeft = [];
    let calculatedButtonsRight = [];
    let buttonsBuildLeft = 0;
    let buttonsBuildRight = 0;
    let currentPage = page - 1;

    while (
        currentPage > 0 &&
        buttonsBuildLeft < BUTTONS_AROUND_CURRENT_BUTTON / 2
    ) {
        calculatedButtonsLeft.unshift(renderNumericalButton(currentPage));
        currentPage--;
        buttonsBuildLeft++;
    }

    currentPage = page + 1;

    while (
        currentPage < totalPages - 1 &&
        buttonsBuildRight < BUTTONS_AROUND_CURRENT_BUTTON - buttonsBuildLeft
    ) {
        calculatedButtonsRight.push(renderNumericalButton(currentPage));
        currentPage++;
        buttonsBuildRight++;
    }

    let buttons = [
        page > 0 ? firstButton : null,
        page > BUTTONS_AROUND_CURRENT_BUTTON / 2 + 1 ? <span>...</span> : null,
        ...calculatedButtonsLeft,
        currentButton,
        ...calculatedButtonsRight,
        totalPages - page > BUTTONS_AROUND_CURRENT_BUTTON / 2 + 2 ? (
            <span>...</span>
        ) : null,
        page < totalPages - 1 ? lastButton : null,
    ];

    return (
        <section>
            <div>
                <span>{prevButton}</span>
                {buttons}
                <span>{nextButton}</span>
            </div>
            {page + 1} / {totalPages} (Total: {total})<div>{pageSize}</div>
        </section>
    );
}

export default withTranslation()(Pagination);
