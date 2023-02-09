import Banner from '@/components/Banner';
import styles from './page.module.css';

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Netflix</h1>

			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>
		</main>
	);
}
