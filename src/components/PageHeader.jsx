import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PageHeader = (props) => {
    return (
        <div className='flex flex-wrap justify-between'>
            <div>
                <h1 className='font-inter font-semibold text-xl tracking-tighter text-slate-700'>{props.title}</h1>
                {
                    props.enablePath ? (
                        <p className='text-slate-400 font-inter text-sm mt-3'>
                        {props.rootPath} <FontAwesomeIcon icon={faAngleRight} className='text-xs' /> {props.subPath}</p>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    );
}