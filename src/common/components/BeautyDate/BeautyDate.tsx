import s from './BeautyDate.module.css'

type BeautyDateType = {
	date: string
}
export const BeautyDate: React.FC<BeautyDateType> = ({date}) => {
	return (
		<div className={s.main}>
			<div>{new Date(date).toLocaleDateString()}</div>
		</div>
	);
};
