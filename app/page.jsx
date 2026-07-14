import LikeButton from './likebutton';
import InputBar from './ppdle/frontend/ppdle-input-handler';
import PPdleRequestHandler from './ppdle/frontend/ppdle-request-handler';

function Header({title}) {
    return (<h1>{title ? title : 'No title specified!'}</h1>);
}

export default async function HomePage() {

    return (
        <div>
            <PPdleRequestHandler/>
        </div>
    );
}