import React from "react";
const CommentComponent = (props) => {
    const { dataHref, width } = props
    return (
        <div style={{ marginTop: '8px' }}>
            <div class="fb-comments" data-href={dataHref} data-width={width} data-layout="" data-action="" data-size="" data-share="true"></div>
        </div>
    )
}
export default CommentComponent