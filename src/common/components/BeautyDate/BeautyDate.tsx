import css from './BeautyDate.module.css'

type BeautyDateType = {
	date: string
}
export const BeautyDate: React.FC<BeautyDateType> = ({date}) => {
	return (
		<div className={css.main}>
			<div>{new Date(date).toLocaleString()}</div>
		</div>
	);
};
