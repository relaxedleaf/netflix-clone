import Banner from '@/components/Banner';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar username='relaxedleaf' />
			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>

			<Card imgUrl='/static/123.webp' size='large' />
			<Card imgUrl='/static/clifford.webp' size='medium' />
			<Card imgUrl='/static/clifford.webp' size='small' />
		</main>
	);
}
