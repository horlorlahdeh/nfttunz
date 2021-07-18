import React, { Fragment } from 'react'
import Tag from './Tag'

const Tags = ({tags}) => {
    return (
        <Fragment>
            <div className="tags__wrapper">
                {tags.map((tag, index) => {
                    return (
                        <Tag key={index} title={tag.title} icon={tag.icon} />
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Tags
