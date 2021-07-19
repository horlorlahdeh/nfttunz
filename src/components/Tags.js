import React, { Fragment } from 'react'
import Tag from './Tag'
import uuid from "uuid";

const Tags = ({tags}) => {
    return (
        <Fragment>
            <div className="tags__wrapper">
                {tags.map((tag) => {
                    const id = uuid();
                    return <Tag key={id} title={tag.title} icon={tag.icon} />;
                })}
            </div>
        </Fragment>
    )
}

export default Tags
