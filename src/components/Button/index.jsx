import './styles.css'

export const Button = ({text, loadMorePosts, disabled}) => {
    return (
        <button disabled={disabled} className={'button'} onClick={loadMorePosts}>
        {text}
        </button>
    )
}