import cn from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { calcDiscountPrice, isLiked } from '../../utils/product';
import ContentLoader from "react-content-loader";

import "./index.css";
import {ReactComponent as Save} from "./save.svg";


const Card = ({ name, price, _id, likes, discount, wight, description, pictures, tags }) => {

	const {user: currentUser, isLoading} = useContext(UserContext);
	const { handleLike: onProductLike} = useContext(CardContext);
	const discount_price = calcDiscountPrice(price, discount);
	const liked = isLiked(likes, currentUser?._id)


	function handleLikeClick(){
		onProductLike({_id, likes})
	}

	return (
		<>
			{ isLoading 
				?	<ContentLoader 
						speed={2}
						width={186}
						height={385}
						viewBox="0 0 186 385"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" /> 
						<rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
					</ContentLoader>
				:	<div className="card">
						<div className="card__sticky card__sticky_type_top-left">
							{discount !== 0 && <span className="card__discount">{`-${discount}%`}</span>}
							{tags && tags.map(tag => <span key={tag} className={cn('tag', {[`tag_type_${tag}`]: true}, )}>{tag}</span>)}
						</div>
						<div className="card__sticky card__sticky_type_top-right">
							<button className={cn('card__favorite', {'card__favorite_is-active': liked})} onClick={handleLikeClick}>
								<Save className="card__favorite-icon"/>
							</button>
						</div>

						<Link to={`/product/${_id}`} className="card__link">
							<img src={pictures} alt={description} className="card__image" />
							<div className="card__desc">
								<span className={discount !== 0 ? "card__old-price" : "card__price"}>
									{price}&nbsp;₽
								</span>
								{discount !== 0 && <span className="card__price card__price_type_discount">
									{discount_price}&nbsp;₽
								</span>}
								<span className="card__wight">{wight}</span>
								<p className="card__name">{name}</p>
							</div>
						</Link>
						<a href="#" className="card__cart btn btn_type_primary">
							В корзину
						</a>
					</div>
			}
		</>
	);
};

export default Card;
